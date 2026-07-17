import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './LatestUpdates.css';

const updates = [
  {
    id: 1,
    type: 'Milestone',
    typeClass: 'tag--milestone',
    date: 'Nov 2025',
    title: 'PDR Cleared — Both Programs',
    body:
      'GARI successfully cleared Preliminary Design Review for both the CanSat and Rocket programs — a formal technical milestone confirming mission-ready architecture and subsystem definitions.',
    link: '/cansat',
    linkLabel: 'View CanSat mission',
  },
  {
    id: 2,
    type: 'Active',
    typeClass: 'tag--active',
    date: '2026',
    title: 'CDR In Progress',
    body:
      'Critical Design Review is now underway. Detailed engineering drawings, PCB schematics, and manufacturing specifications are being developed across all eight CanSat subsystems.',
    link: '/cansat',
    linkLabel: 'Explore subsystems',
  },
  {
    id: 3,
    type: 'Competition',
    typeClass: 'tag--competition',
    date: '2026',
    title: 'IN-SPACe CAN-7USAT 2026 — Nationally Selected',
    body:
      'GARI has been nationally selected to compete in IN-SPACe CAN-7USAT 2026, India\'s premier student CanSat competition run by the Indian National Space Promotion and Authorization Center.',
    link: '/achievements',
    linkLabel: 'See competition record',
  },
  {
    id: 4,
    type: 'Team',
    typeClass: 'tag--team',
    date: '2025',
    title: 'Team Grows to 30+ Engineers',
    body:
      'GARI expanded to 30+ active engineers across Aerospace, ECE, CSE, and Mechanical disciplines — organised into two focused project teams: CanSat and Rocket.',
    link: '/team',
    linkLabel: 'Meet the team',
  },
];

const LatestUpdates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="lu-section" ref={ref} aria-label="Latest Updates and Milestones">
      <div className="lu-container">

        {/* Header */}
        <motion.div
          className="lu-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="lu-tag">LATEST UPDATES</span>
          <h2>
            What GARI has been <span className="lu-accent">shipping</span>
          </h2>
          <p className="lu-sub">
            Key milestones, competition progress, and team updates — updated as the program advances.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="lu-grid" role="list" aria-label="Update cards">
          {updates.map((item, i) => (
            <motion.article
              key={item.id}
              className="lu-card"
              role="listitem"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.42, delay: 0.12 + i * 0.09 }}
            >
              {/* Card top */}
              <div className="lu-card-top">
                <span className={`lu-type-tag ${item.typeClass}`}>{item.type}</span>
                <time className="lu-date" dateTime={item.date}>{item.date}</time>
              </div>

              <h3 className="lu-card-title">{item.title}</h3>
              <p className="lu-card-body">{item.body}</p>

              <a
                href={item.link}
                className="lu-card-link"
                aria-label={`${item.linkLabel} — ${item.title}`}
              >
                {item.linkLabel}
                <span className="lu-card-arrow" aria-hidden="true"> →</span>
              </a>
            </motion.article>
          ))}
        </div>

        {/* View all */}
        <motion.div
          className="lu-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.65 }}
        >
          <a href="/achievements" className="lu-all-link">
            View full achievements archive
            <span aria-hidden="true"> →</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default LatestUpdates;
