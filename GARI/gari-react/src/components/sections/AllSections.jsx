import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './AllSections.css';

// Mission Section
export const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="mission" className="mission" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">OUR MISSION</span>
          <h2>
            Creating A Platform For Future{' '}
            <span className="gradient-text">Aerospace Innovators</span>
          </h2>
          <p className="section-description">
            GARI aims to inspire innovation, encourage collaborative research, and
            build impactful aerospace technologies through practical engineering
            experiences and multidisciplinary teamwork.
          </p>
        </motion.div>

        <div className="mission-grid">
          {['Innovation', 'Collaboration', 'Research'].map((item, index) => (
            <motion.div
              key={index}
              className="mission-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mission-icon">
                <div className="icon-circle"></div>
              </div>
              <h3>{item}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CanSat Section
export const CanSat = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '1000m', label: 'Launch Altitude' },
    { value: 'NavIC', label: 'GNSS Integration' },
    { value: 'Real-Time', label: 'Telemetry System' },
    { value: 'Dual', label: 'Recovery Mechanism' },
  ];

  const systems = [
    { name: 'Telemetry', desc: 'Real-time aerospace data transmission' },
    { name: 'Avionics', desc: 'Intelligent flight electronics' },
    { name: 'Ground Station', desc: 'Mission communication systems' },
    { name: 'Recovery', desc: 'Dual parachute deployment' },
  ];

  return (
    <section id="cansat" className="cansat" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">IN-SPACe CAN-7USAT 2026</span>
          <h2>
            Engineering Advanced{' '}
            <span className="gradient-text">Student Space Missions</span>
          </h2>
          <p className="section-description">
            GARI is developing an advanced CanSat system focused on telemetry,
            avionics, communication systems, NavIC integration, and mission-oriented
            aerospace innovation.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Systems */}
        <div className="systems-grid">
          {systems.map((system, index) => (
            <motion.div
              key={index}
              className="system-card"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ x: 10 }}
            >
              <h4>{system.name}</h4>
              <p>{system.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section
export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const divisions = [
    'Aerospace Research',
    'Avionics',
    'Software Systems',
    'Ground Systems',
    'Design & Innovation',
    'Media & Outreach',
  ];

  return (
    <section id="team" className="team" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">OUR TEAM</span>
          <h2>
            30+ Students Building{' '}
            <span className="gradient-text">Aerospace Innovation</span> Together
          </h2>
          <p className="section-description">
            GARI is powered by a multidisciplinary team of 30+ passionate students
            working across aerospace research, avionics, software systems, CanSat
            development, design, media, and mission-oriented engineering.
          </p>
        </motion.div>

        <div className="divisions-grid">
          {divisions.map((division, index) => (
            <motion.div
              key={index}
              className="division-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="division-icon"></div>
              <h4>{division}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">CONTACT GARI</span>
          <h2>
            Let's Build The <span className="gradient-text">Future</span> Together
          </h2>
          <p className="section-description">
            Reach out for collaborations, sponsorships, aerospace initiatives,
            rocketry opportunities, and technical partnerships.
          </p>

          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <h4>Email</h4>
              <p>contact@gari.live</p>
            </div>
            <div className="info-item">
              <div className="info-icon">📱</div>
              <h4>Instagram</h4>
              <p>@gari.live</p>
            </div>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <h4>Location</h4>
              <p>GITAM University</p>
            </div>
          </div>

          <motion.a
            href="mailto:contact@gari.live"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get In Touch</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
