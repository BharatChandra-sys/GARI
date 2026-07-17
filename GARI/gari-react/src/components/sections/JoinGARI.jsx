import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './JoinGARI.css';

const divisions = [
  { name: 'Aerospace & Structures', desc: 'Aerodynamic design, CAD modelling, structural analysis' },
  { name: 'Avionics & Electronics', desc: 'Flight computers, sensor integration, PCB design' },
  { name: 'Software & Ground Station', desc: 'Real-time telemetry, data pipelines, GCS' },
  { name: 'Propulsion', desc: 'Motor selection, thrust studies, control systems' },
  { name: 'Recovery Systems', desc: 'Dual-parachute deployment and descent mechanisms' },
  { name: 'Media & Outreach', desc: 'Documentation, social presence, outreach' },
];

const JoinGARI = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="jg-section" ref={ref} aria-label="Join GARI — Student Recruitment">
      <div className="jg-container">

        {/* Left — copy */}
        <motion.div
          className="jg-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="jg-tag">JOIN THE TEAM</span>

          <h2>
            Build real aerospace<br />
            <span className="jg-accent">hardware, not slides.</span>
          </h2>

          <p className="jg-lead">
            GARI is a hands-on team at GITAM University. We build CanSats, rockets, and
            embedded systems — actual prototypes, actual telemetry, actual launches. If
            you want engineering experience that stands up in a job interview, this is it.
          </p>

          <ul className="jg-reasons" aria-label="Reasons to join GARI">
            {[
              'Work on nationally competing hardware',
              'Learn by building, not just studying',
              'Multidisciplinary team — all branches welcome',
              'Direct mentorship from senior engineers on the team',
            ].map((r, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.25 + i * 0.07 }}
              >
                <span className="jg-check" aria-hidden="true" />
                {r}
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="jg-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.38, delay: 0.62 }}
          >
            <a href="/contact" className="jg-btn-primary">
              Apply to join GARI
            </a>
            <a href="/team" className="jg-btn-secondary">
              Meet the team
            </a>
          </motion.div>

          <p className="jg-note">
            Open to all branches at GITAM University, Hyderabad.
          </p>
        </motion.div>

        {/* Right — divisions grid */}
        <motion.div
          className="jg-divisions"
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <p className="jg-divisions-label">Open divisions</p>
          <div
            className="jg-divisions-grid"
            role="list"
            aria-label="GARI open divisions"
          >
            {divisions.map((div, i) => (
              <motion.div
                key={i}
                className="jg-division-card"
                role="listitem"
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.36, delay: 0.2 + i * 0.07 }}
              >
                <h3>{div.name}</h3>
                <p>{div.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Social proof strip */}
          <div className="jg-proof-strip" aria-label="Team statistics">
            <div className="jg-proof-stat">
              <strong>30+</strong>
              <span>Active members</span>
            </div>
            <div className="jg-proof-divider" aria-hidden="true" />
            <div className="jg-proof-stat">
              <strong>6</strong>
              <span>Open divisions</span>
            </div>
            <div className="jg-proof-divider" aria-hidden="true" />
            <div className="jg-proof-stat">
              <strong>GITAM</strong>
              <span>University, HYD</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default JoinGARI;
