import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './MissionTracker.css';

const phases = [
  {
    id: 1,
    code: 'Phase 01',
    title: 'PDR Cleared',
    label: 'Preliminary Design Review',
    detail: 'System architecture, subsystem definitions, and mission design reviewed and approved for both CanSat and Rocket programs.',
    status: 'cleared',
    date: 'Nov 2025',
    programs: ['CanSat', 'Rocket'],
  },
  {
    id: 2,
    code: 'Phase 02',
    title: 'CDR In Progress',
    label: 'Critical Design Review',
    detail: 'Detailed engineering drawings, manufacturing specifications, and test plans currently under active development.',
    status: 'active',
    date: '2026',
    programs: ['CanSat', 'Rocket'],
  },
  {
    id: 3,
    code: 'Phase 03',
    title: 'Build & Integration',
    label: 'Hardware Fabrication',
    detail: 'PCB assembly, firmware integration, chassis fabrication, and full system-level testing across all subsystems.',
    status: 'upcoming',
    date: '2026',
    programs: ['CanSat', 'Rocket'],
  },
  {
    id: 4,
    code: 'Phase 04',
    title: 'Launch',
    label: 'IN-SPACe CAN-7USAT 2026',
    detail: 'Competition launch at 1000m altitude with live NavIC telemetry, dual recovery, and full ground station monitoring.',
    status: 'upcoming',
    date: '2026',
    programs: ['CanSat'],
  },
];

const statusConfig = {
  cleared: { label: 'Cleared', dotClass: 'dot--cleared' },
  active:  { label: 'In Progress', dotClass: 'dot--active' },
  upcoming:{ label: 'Upcoming', dotClass: 'dot--upcoming' },
};

const MissionTracker = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="mt-section" ref={ref} aria-label="Mission Status Tracker">
      <div className="mt-container">

        {/* Header */}
        <motion.div
          className="mt-header"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="mt-tag">MISSION STATUS</span>
          <h2>
            Where we are in the <span className="mt-accent">program</span>
          </h2>
          <p className="mt-subheading">
            PDR cleared for both programs. CDR in active development. Launch target — IN-SPACe CAN-7USAT 2026.
          </p>
        </motion.div>

        {/* Progress bar — desktop connector */}
        <div className="mt-track-wrap" aria-hidden="true">
          <div className="mt-track-line">
            <motion.div
              className="mt-track-fill"
              initial={{ width: 0 }}
              animate={isInView ? { width: '37.5%' } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Phase cards */}
        <div className="mt-phases">
          {phases.map((phase, i) => {
            const cfg = statusConfig[phase.status];
            return (
              <motion.div
                key={phase.id}
                className={`mt-phase mt-phase--${phase.status}`}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
                tabIndex={0}
                aria-label={`${phase.title}: ${cfg.label}`}
              >
                {/* Top row: dot + status */}
                <div className="mt-phase-top">
                  <span className={`mt-dot ${cfg.dotClass}`} aria-hidden="true" />
                  <span className={`mt-status-badge mt-status-badge--${phase.status}`}>
                    {cfg.label}
                  </span>
                </div>

                {/* Code + title */}
                <p className="mt-phase-code">{phase.code}</p>
                <h3 className="mt-phase-title">{phase.title}</h3>
                <p className="mt-phase-label">{phase.label}</p>
                <p className="mt-phase-detail">{phase.detail}</p>

                {/* Footer: date + program tags */}
                <div className="mt-phase-footer">
                  <span className="mt-phase-date">{phase.date}</span>
                  <div className="mt-phase-programs">
                    {phase.programs.map(prog => (
                      <span key={prog} className="mt-prog-tag">{prog}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.65 }}
        >
          <a href="/cansat" className="mt-cta-link">
            Full mission technical breakdown
            <span className="mt-cta-arrow" aria-hidden="true"> →</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default MissionTracker;
