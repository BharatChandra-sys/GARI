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
        title="CanSat Project"
        description="GARI's CanSat project: a 1000m altitude launch with NavIC GNSS integration, real-time telemetry, and dual recovery mechanism. Competing in IN-SPACe CAN-7USAT."
        path="/cansat"
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
