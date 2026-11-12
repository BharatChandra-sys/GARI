import { useEffect, useRef } from 'react';
import {
  animate,
  transform,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  apple: [0.28, 0.11, 0.32, 1],
};

export const dur = { fast: 0.25, base: 0.5, slow: 0.8 };

/*
  Map a scroll progress value through input/output ranges.
  Uses the function form of useTransform on purpose: framer's hardware-accelerated
  ScrollTimeline path mis-computes progress for pinned (sticky) sections.
*/
export const useScrollMap = (progress, input, output) =>
  useTransform(progress, (v) => transform(v, input, output));

/* Fade-up reveal. One shared primitive for every heading / block on the site. */
export const Reveal = ({ as = 'div', delay = 0, y = 24, amount = 0.3, children, ...rest }) => {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: dur.slow, ease: ease.out, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* Staggered children — wrap items in <RevealItem>. */
export const RevealGroup = ({ as = 'div', stagger = 0.06, amount = 0.15, children, ...rest }) => {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const RevealItem = ({ as = 'div', children, ...rest }) => {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* Headline revealed line by line. Pass `lines` as an array of strings / nodes. */
export const LineReveal = ({ as = 'h1', lines, className, delay = 0.1 }) => {
  const Tag = as;
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: ease.out, delay: delay + i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/* Count up to a number once in view. Reserves width so nothing shifts. */
export const Counter = ({ to, duration = 1.4, decimals = 0, format }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const fmt = (v) => (format ? format(v) : v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = fmt(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: ease.out,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = fmt(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);

  return (
    <span ref={ref} style={{ display: 'inline-block', minWidth: `${String(fmt(to)).length * 0.6}ch` }}>
      {fmt(0)}
    </span>
  );
};

/* Rolling digits for countdowns. Each digit is a 0–9 column that springs to its value. */
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const Odometer = ({ value, pad = 2 }) => (
  <span className="odo" aria-hidden="true">
    {String(value).padStart(pad, '0').split('').map((d, i, all) => (
      <span key={all.length - i} className="odo-digit">
        <motion.span
          className="odo-col"
          initial={false}
          animate={{ y: `${-Number(d) * 10}%` }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        >
          {DIGITS.map((n) => <span key={n}>{n}</span>)}
        </motion.span>
      </span>
    ))}
  </span>
);

/* Scroll-scrubbed statement: each word brightens as the reader scrolls through it. */
const Word = ({ progress, range, children }) => {
  const opacity = useScrollMap(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }}>
      {children}{' '}
    </motion.span>
  );
};

export const ScrollText = ({ text, className, as = 'p' }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const Tag = as;
  const words = text.split(' ');

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </Tag>
  );
};

/* Full-bleed image that settles from a slight zoom as it scrolls into place. */
export const ParallaxImage = ({ src, alt, className, style }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useScrollMap(scrollYProgress, [0, 0.6], [1.12, 1]);
  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', scale: reduce ? 1 : scale }}
      />
    </div>
  );
};
