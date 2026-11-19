// Fixed-window request counters for the form endpoint.
// The leading underscore keeps Vercel from exposing this file as a route.
//
// Counters live in the function instance's memory: they stop bursts and scripted
// floods against a warm instance, but each new instance starts empty. For a hard
// guarantee across instances, back `buckets` with a shared store (e.g. Upstash Redis).

const buckets = new Map();
const MAX_KEYS = 5000;

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

const PER_FORM = {
  newsletter: { limit: 3, windowMs: 10 * MINUTE },
  contact: { limit: 5, windowMs: HOUR },
  application: { limit: 3, windowMs: HOUR },
};
const PER_IP_TOTAL = { limit: 10, windowMs: HOUR };
// Each submission emails a confirmation to the address given, so cap per address
// to keep the form from being used to flood someone else's inbox.
const PER_EMAIL = { limit: 2, windowMs: HOUR };

const prune = (now) => {
  for (const [key, b] of buckets) if (now >= b.reset) buckets.delete(key);
  // Still full of live windows: drop the oldest entries rather than grow without bound.
  while (buckets.size > MAX_KEYS) buckets.delete(buckets.keys().next().value);
};

const hit = (key, { limit, windowMs }, now) => {
  let b = buckets.get(key);
  if (!b || now >= b.reset) {
    b = { count: 0, reset: now + windowMs };
    buckets.set(key, b);
  }
  b.count += 1;
  if (buckets.size > MAX_KEYS) prune(now);
  return b.count > limit ? Math.max(1, Math.ceil((b.reset - now) / 1000)) : 0;
};

export const clientIp = (req) => {
  const real = req.headers['x-real-ip'];
  if (real) return String(real).trim();
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
};

/* Returns seconds to wait if the request is over a limit, otherwise 0. */
export const rateLimit = (req, type, email, now = Date.now()) => {
  const ip = clientIp(req);
  const checks = [[`ip:${ip}`, PER_IP_TOTAL]];
  if (PER_FORM[type]) checks.push([`ip:${ip}:${type}`, PER_FORM[type]]);
  if (PER_FORM[type] && typeof email === 'string' && email.trim()) {
    checks.push([`email:${type}:${email.trim().toLowerCase()}`, PER_EMAIL]);
  }
  let wait = 0;
  for (const [key, rule] of checks) wait = Math.max(wait, hit(key, rule, now));
  return wait;
};

export const waitMessage = (seconds) => {
  const minutes = Math.ceil(seconds / 60);
  const when = seconds < 60 ? 'a minute' : minutes === 1 ? '1 minute' : minutes >= 59 ? 'an hour' : `${minutes} minutes`;
  return `Too many submissions. Please try again in ${when}.`;
};
