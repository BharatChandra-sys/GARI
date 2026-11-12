import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { LineReveal, Reveal, ease, useScrollMap } from '../motion';
import { milestones } from '../../data/milestones';
import './ui.css';

/* Inner-page hero: eyebrow, line-revealed title, lead and actions. */
export const PageHero = ({ eyebrow, lines, lead, theme = 'dark', size = 'display', children }) => (
  <section className={`page-hero theme-${theme}`}>
    <div className="container">
      {eyebrow && (
        <Reveal y={12}>
          <span className="eyebrow eyebrow--accent">{eyebrow}</span>
        </Reveal>
      )}
      <LineReveal as="h1" className={size === 'hero' ? 't-hero' : 't-display'} lines={lines} />
      {lead && (
        <Reveal delay={0.25}>
          <p className="t-lead">{lead}</p>
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.35} className="actions">
          {children}
        </Reveal>
      )}
    </div>
  </section>
);

/* Section heading block. */
export const Head = ({ eyebrow, title, lead, center, as = 'h2', className = 't-h1' }) => {
  const Tag = as;
  return (
    <Reveal className={`head${center ? ' center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className={className}>{title}</Tag>
      {lead && <p className="t-lead">{lead}</p>}
    </Reveal>
  );
};

/* Smart link: internal routes use the router, everything else is an <a>. */
export const SmartLink = ({ to, className, children, ...rest }) =>
  to.startsWith('/') && !to.startsWith('//') ? (
    <Link to={to} className={className} {...rest}>{children}</Link>
  ) : (
    <a href={to} className={className} {...rest}>{children}</a>
  );

/* Closing call-to-action band used at the bottom of most pages. */
export const ClosingCTA = ({ eyebrow, title, lead, primary, secondary, theme = 'dark' }) => (
  <section className={`section theme-${theme}`}>
    <div className="container cta">
      <Reveal>
        {eyebrow && <span className="eyebrow eyebrow--accent">{eyebrow}</span>}
        <h2 className="t-display">{title}</h2>
        {lead && <p className="t-lead">{lead}</p>}
        <div className="actions">
          {primary && <SmartLink to={primary.to} className="btn btn--primary">{primary.label}</SmartLink>}
          {secondary && <SmartLink to={secondary.to} className="link">{secondary.label}</SmartLink>}
        </div>
      </Reveal>
    </div>
  </section>
);

const statusText = { done: 'Cleared', active: 'In progress', next: 'Next', upcoming: 'Upcoming' };

/* Milestone track: hairline that draws itself as you scroll, with status dots. */
export const MilestoneTrack = ({ items = milestones }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'center 0.5'] });
  const done = items.filter((m) => m.status === 'done').length;
  const target = (done - 0.5) / (items.length - 1);
  const scaleX = useScrollMap(scrollYProgress, [0, 1], [0, Math.min(1, Math.max(0, target))]);

  return (
    <div className="track" ref={ref}>
      <div className="track-line" aria-hidden="true">
        <motion.div className="track-fill" style={{ scaleX: reduce ? target : scaleX }} />
      </div>
      <ol className="track-items">
        {items.map((m, i) => (
          <motion.li
            key={m.id}
            className={`track-item track-item--${m.status}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: ease.out, delay: i * 0.08 }}
          >
            <span className={`track-dot track-dot--${m.status}`} aria-hidden="true" />
            <span className="track-meta">
              <span className="t-mono">{m.dateLabel}</span>
              <span className={`track-status track-status--${m.status}`}>{statusText[m.status]}</span>
            </span>
            <h3 className="track-code">{m.code}</h3>
            <p className="track-title">{m.title}</p>
            <p className="track-detail">{m.detail}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};
