import React, { useEffect, useState } from 'react';
import { Odometer, Reveal } from '../motion';
import { FINALS, milestones } from '../../data/milestones';

const FINALS_END = new Date('2026-11-21T00:00:00+05:30');

const split = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 };
};

/* Status is computed from dates, so the page stays truthful without a redeploy. */
const gateStatus = (m, now) => {
  if (m.status === 'done') return { label: 'Cleared', tone: 'ok' };
  if (m.id === 'finals') {
    if (now >= FINALS_END) return { label: 'Flown', tone: 'ok' };
    if (now >= m.date) return { label: 'Underway', tone: 'live' };
    return { label: 'Next', tone: 'live' };
  }
  if (m.date <= now) return { label: 'Held · result pending', tone: 'dim' };
  return { label: 'Upcoming', tone: 'dim' };
};

const Unit = ({ value, label, pad }) => (
  <div className="count-unit">
    <span className="count-num"><Odometer value={value} pad={pad} /></span>
    <span className="count-label">{label}</span>
  </div>
);

/* Launch clock + review gates. */
const StatusStrip = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const before = now < FINALS.start;
  const during = !before && now < FINALS_END;
  const t = split(FINALS.start - now);

  return (
    <section className="section count theme-dark" aria-labelledby="count-title">
      <div className="container">
        <div className="count-top">
          <Reveal>
            <span className="eyebrow">{FINALS.name}</span>
            <h2 id="count-title" className="t-display">
              {before && <>Kushinagar, <em>in</em></>}
              {during && <>On the range <em>now.</em></>}
              {!before && !during && <>Flown at <em>Kushinagar.</em></>}
            </h2>
          </Reveal>
          <p className="count-where">
            {FINALS.place}<br />{FINALS.label}
          </p>
        </div>

        {before && (
          <div className="count-clock" role="timer" aria-label={`${t.d} days ${t.h} hours until the national finals`}>
            <Unit value={t.d} label="Days" pad={2} />
            <Unit value={t.h} label="Hours" pad={2} />
            <Unit value={t.m} label="Minutes" pad={2} />
            <Unit value={t.s} label="Seconds" pad={2} />
          </div>
        )}

        <ol className="gates">
          {milestones.map((m) => {
            const st = gateStatus(m, now);
            return (
              <li key={m.id} className="gate">
                <span className="gate-code">{m.code}</span>
                <span className="gate-title">
                  <strong>{m.title}</strong>
                  <span>{m.detail}</span>
                </span>
                <span className="gate-date">{m.dateLabel}</span>
                <span className={`gate-status gate-status--${st.tone}`}>
                  <i className={`dot${st.tone === 'ok' ? ' dot--ok' : st.tone === 'live' ? ' dot--live' : ''}`} aria-hidden="true" />
                  {st.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default StatusStrip;
