import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './CanSatPage.css';

const CanSatPage = () => {
  const stats = [
    { value: '1000m', label: 'Launch Altitude' },
    { value: 'NavIC', label: 'GNSS Integration' },
    { value: 'Real-Time', label: 'Telemetry System' },
    { value: 'Dual', label: 'Recovery Mechanism' },
  ];

  const systems = [
    { name: 'Telemetry', desc: 'Real-time aerospace data transmission and communication systems' },
    { name: 'Avionics', desc: 'Intelligent flight electronics and onboard control systems' },
    { name: 'Ground Station', desc: 'Monitoring, mission communication, and aerospace tracking systems' },
    { name: 'Recovery System', desc: 'Dual parachute deployment and controlled descent mechanisms' },
  ];

  return (
    <div className="cansat-page">
      <SEO
        title="CanSat Project — IN-SPACe CAN-7USAT 2026"
        description="GARI's CanSat: 1000m altitude launch with NavIC GNSS integration, real-time telemetry, and dual recovery. Competing in India's IN-SPACe CAN-7USAT 2026 national competition."
        path="/cansat"
        keywords="CanSat India 2026, IN-SPACe CAN-7USAT, NavIC GNSS, student CanSat competition India, GARI CanSat, CanSat telemetry avionics"
        breadcrumbs={[{ name: 'CanSat Project', url: 'https://gari.live/cansat' }]}
        faq={[
          { q: 'What is a CanSat?', a: 'A CanSat is a small satellite the size of a soda can (330ml). It carries instruments and launches to ~1000m altitude, transmitting real-time data before descending on a parachute.' },
          { q: 'What is IN-SPACe CAN-7USAT?', a: 'IN-SPACe CAN-7USAT is India\'s national student CanSat competition by the Indian National Space Promotion and Authorization Center. GARI is competing in 2026.' },
          { q: 'What makes GARI\'s CanSat unique?', a: 'GARI\'s CanSat features NavIC (India\'s own GNSS) integration, real-time telemetry, dual parachute recovery, and a custom ground station software system.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ResearchProject',
          'name': 'GARI CanSat — IN-SPACe CAN-7USAT 2026',
          'description': '1000m altitude CanSat with NavIC GNSS, real-time telemetry, dual recovery. Competing in IN-SPACe CAN-7USAT 2026.',
          'url': 'https://gari.live/cansat',
          'member': { '@id': 'https://gari.live/#organization' },
          'keywords': ['CanSat', 'NavIC', 'telemetry', 'avionics', 'IN-SPACe', 'India', 'GITAM'],
        }}
      />

      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-tag">IN-SPACe CAN-7USAT 2026</span>
            <h1>CanSat Mission</h1>
            <p className="hero-subtitle">
              Engineering Advanced Student Space Missions
            </p>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="about-text">
            <p>
              GARI is developing an advanced CanSat system focused on telemetry,
              avionics, communication systems, NavIC integration, and mission-oriented
              aerospace innovation.
            </p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="systems-section">
            <h2>Subsystems</h2>
            <div className="values-grid">
              {systems.map((system, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3>{system.name}</h3>
                  <p>{system.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanSatPage;
