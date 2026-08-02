import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CountdownBanner.css';

const MILESTONES = [
  {
    id: 'cdr',
    label: 'CDR Deadline',
    sublabel: 'Critical Design Review — both programs',
    date: new Date('2026-08-09T00:00:00'),
    tag: 'Next deadline',
    tagClass: 'cb-tag--active',
  },
  {
    id: 'finale',
    label: 'National Finale',
    sublabel: 'Kushinagar, Uttar Pradesh — IN-SPACe 2026',
    date: new Date('2026-10-27T00:00:00'),
    tag: 'Competition',
    tagClass: 'cb-tag--competition',
  },
];

function getTimeLeft(target) {
  const diff = target - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

const CountdownUnit = ({ value, unit }) => (
  <div className="cb-unit">
    <span className="cb-value">{pad(value)}</span>
    <span className="cb-unit-label">{unit}</span>
  </div>
);

const MilestoneCard = ({ milestone, index }) => {
  const [time, setTime] = useState(() => getTimeLeft(milestone.date));

  useEffect(() => {
    if (time.done) return;
    const id = setInterval(() => setTime(getTimeLeft(milestone.date)), 1000);
    return () => clearInterval(id);
  }, [milestone.date, time.done]);

  return (
    <motion.div
      className="cb-milestone"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: index * 0.1 }}
    >
      <div className="cb-milestone-header">
        <div className="cb-milestone-info">
          <h3 className="cb-milestone-label">{milestone.label}</h3>
          <p className="cb-milestone-sub">{milestone.sublabel}</p>
        </div>
        <span className={`cb-tag ${milestone.tagClass}`}>{milestone.tag}</span>
      </div>

      {time.done ? (
        <div className="cb-done">Completed</div>
      ) : (
        <div className="cb-clock" aria-label={`Countdown to ${milestone.label}`}>
          <CountdownUnit value={time.days} unit="Days" />
          <span className="cb-sep" aria-hidden="true">:</span>
          <CountdownUnit value={time.hours} unit="Hrs" />
          <span className="cb-sep" aria-hidden="true">:</span>
          <CountdownUnit value={time.minutes} unit="Min" />
          <span className="cb-sep" aria-hidden="true">:</span>
          <CountdownUnit value={time.seconds} unit="Sec" />
        </div>
      )}
    </motion.div>
  );
};

const CountdownBanner = () => (
  <section className="cb-section" aria-label="Competition timeline and countdown">
    <div className="cb-container">

      <motion.div
        className="cb-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <span className="cb-section-tag">Program Timeline</span>
        <h2>Critical milestones ahead</h2>
        <p className="cb-heading-sub">
          CDR submission Aug 9 · National finale Oct–Nov 2026 · Kushinagar, UP
        </p>
      </motion.div>

      <div className="cb-grid">
        {MILESTONES.map((m, i) => (
          <MilestoneCard key={m.id} milestone={m} index={i} />
        ))}
      </div>

    </div>
  </section>
);

export default CountdownBanner;
