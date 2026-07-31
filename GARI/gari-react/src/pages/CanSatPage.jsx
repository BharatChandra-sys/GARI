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

  const subsystems = [
    {
      name: 'Telemetry & Communication',
      lead: 'Nischal Aditya M · Varshith Pappuri',
      desc: 'Real-time RF data link between the CanSat and ground station. Transmits sensor packets at defined intervals during the entire flight envelope from launch to landing.',
    },
    {
      name: 'Avionics & Flight Software',
      lead: 'Singam Sai Harshith',
      desc: 'Onboard flight computer handling sensor fusion, state estimation, and timed deployment logic. Firmware written in C with custom interrupt-driven data acquisition.',
    },
    {
      name: 'Ground Station Software',
      lead: 'Bodapati Bharat Chandra',
      desc: 'Custom GCS application for live telemetry visualization, packet parsing, mission logging, and post-flight data export. Built with a real-time dashboard.',
    },
    {
      name: 'NavIC GNSS Integration',
      lead: 'Avionics team',
      desc: "Integration of India's NavIC satellite navigation system for positional tracking during descent. One of the few student CanSats in India using NavIC over GPS.",
    },
    {
      name: 'Descent & Recovery',
      lead: 'Hanzel Vergis Thomas',
      desc: 'Dual parachute deployment system: drogue chute for stabilization at apogee, main chute for controlled final descent. Recovery altitude triggered by barometric pressure.',
    },
    {
      name: 'Power & Electrical Systems',
      lead: 'Satya Rishi Chodesetty',
      desc: 'Battery selection, power budgeting, voltage regulation, and harness routing for the full avionics stack. Designed for the full mission power envelope.',
    },
    {
      name: 'Structures & Mechanical',
      lead: 'Tanmaay Sharma',
      desc: '330ml form-factor chassis designed to survive 1000m launch loads and parachute deployment shock. CAD-modeled and stress-tested before fabrication.',
    },
    {
      name: 'Sensor & Payload Systems',
      lead: 'Rohan Jason Bellapu',
      desc: 'Payload sensor suite including pressure, temperature, humidity, IMU, and altitude sensors. Calibrated for in-flight accuracy across the mission profile.',
    },
  ];

  const timeline = [
    { phase: 'Phase 1', title: 'PDR — Preliminary Design Review', status: 'Cleared', desc: 'System architecture, subsystem definitions, and design approach reviewed and approved.' },
    { phase: 'Phase 2', title: 'CDR — Critical Design Review', status: 'In Progress', desc: 'Detailed design, manufacturing drawings, and test plans under development.' },
    { phase: 'Phase 3', title: 'Build & Integration', status: 'Upcoming', desc: 'Hardware fabrication, PCB assembly, firmware integration, and system-level testing.' },
    { phase: 'Phase 4', title: 'Launch — IN-SPACe CAN-7USAT 2026', status: 'Upcoming', desc: 'Competition launch at 1000m altitude. Full mission execution with live telemetry.' },
  ];

  return (
    <div className="cansat-page">
      <SEO
        title="CanSat Project — GARI IN-SPACe CAN-7USAT 2026 | NavIC Student Satellite"
        description="GARI's CanSat: 330ml student satellite with NavIC GNSS, 1000m launch altitude, real-time RF telemetry, dual parachute recovery, and 8 subsystems. PDR cleared. Competing in IN-SPACe CAN-7USAT 2026 — India's national student CanSat competition. Built at GITAM University Hyderabad."
        path="/cansat"
        keywords="GARI CanSat, GARI GITAM CanSat, GARI IN-SPACe 2026, GITAM Aerospace Rocketry CanSat, CanSat India 2026, IN-SPACe CAN-7USAT, NavIC GNSS CanSat, student CanSat India, GARI telemetry avionics, PDR cleared CanSat GARI, CanSat NavIC India, student satellite India, IN-SPACe CAN-7USAT 2026 GARI, GITAM CanSat project, CanSat competition India 2026, NavIC student project India, student CanSat telemetry, GARI 8 subsystems CanSat, dual parachute CanSat India, GARI ground station software"
        datePublished="2025-01-01"
        dateModified="2026-07-01"
        breadcrumbs={[{ name: 'CanSat Project', url: 'https://gari.live/cansat' }]}
        faq={[
          { q: 'What is a CanSat?', a: 'A CanSat is a small satellite the size of a soda can (330ml). It carries sensors and instruments, launches to ~1000m altitude, transmits real-time data, and descends on a parachute.' },
          { q: 'What is IN-SPACe CAN-7USAT?', a: "IN-SPACe CAN-7USAT is India's national student CanSat competition organized by the Indian National Space Promotion and Authorization Center (IN-SPACe). GARI from GITAM University is competing in 2026." },
          { q: "What makes GARI's CanSat unique?", a: "GARI's CanSat integrates NavIC (India's own satellite navigation system), real-time RF telemetry, dual parachute recovery, a custom ground control station (GCS), and has 8 specialized subsystems — PDR cleared." },
          { q: 'Has GARI cleared PDR for its CanSat?', a: 'Yes. GARI has successfully cleared the Preliminary Design Review (PDR) for the CanSat program — a formal technical milestone confirming mission-ready architecture approved to proceed to detailed development.' },
          { q: 'What is NavIC and why does GARI use it?', a: "NavIC (Navigation with Indian Constellation) is India's own GPS-equivalent satellite navigation system. GARI integrates NavIC in its CanSat instead of GPS, making it one of the few student CanSats in India using NavIC for positional tracking." },
          { q: 'Who leads the GARI CanSat subsystems?', a: 'GARI CanSat has 8 subsystems: Telemetry (Nischal Aditya M), Avionics & Flight Software (Singam Sai Harshith), Ground Station (Bodapati Bharat Chandra), NavIC GNSS (Avionics team), Recovery (Hanzel Vergis Thomas), Power (Satya Rishi Chodesetty), Structures (Tanmaay Sharma), Sensors (Rohan Jason Bellapu).' },
          { q: 'What altitude does GARI\'s CanSat launch to?', a: "GARI's CanSat is designed for 1000m launch altitude as specified by the IN-SPACe CAN-7USAT 2026 competition requirements." },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ResearchProject',
          name: 'GARI CanSat — IN-SPACe CAN-7USAT 2026',
          description: '1000m altitude CanSat with NavIC GNSS, real-time telemetry, dual recovery. PDR cleared. Competing in IN-SPACe CAN-7USAT 2026.',
          url: 'https://gari.live/cansat',
          member: { '@id': 'https://gari.live/#organization' },
          keywords: ['CanSat', 'NavIC', 'telemetry', 'avionics', 'IN-SPACe', 'India', 'GITAM', 'PDR'],
        }}
      />

      {/* Hero */}
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
              A NavIC-integrated student satellite competing at the national level
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission overview */}
      <section className="content-section">
        <div className="container">
          <div className="cansat-intro">
            <motion.div
              className="cansat-intro-text"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="cansat-label">THE MISSION</span>
              <h2>A satellite in a can. A real aerospace mission.</h2>
              <p>
                A CanSat is a 330ml form-factor satellite — the same diameter as a soda
                can — that carries a full instrument suite, launches to 1000m altitude,
                and transmits data in real time before descending on a parachute. Every
                subsystem has to survive launch loads, operate reliably in flight, and
                return usable data to the ground station.
              </p>
              <p>
                GARI's CanSat for IN-SPACe CAN-7USAT 2026 integrates NavIC — India's
                own GNSS constellation — for positional tracking, making it one of the
                few student CanSats in the country using NavIC instead of GPS. A custom
                ground station application handles live telemetry, mission logging, and
                post-flight data analysis.
              </p>
            </motion.div>

            <motion.div
              className="cansat-stats-block"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Timeline */}
      <section className="content-section cansat-alt-bg">
        <div className="container">
          <div className="cansat-section-header">
            <span className="cansat-label">MISSION STATUS</span>
            <h2>Where we are in the program</h2>
          </div>
          <div className="mission-timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className={`mission-phase ${item.status === 'Cleared' ? 'phase--cleared' : item.status === 'In Progress' ? 'phase--active' : 'phase--upcoming'}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="phase-header">
                  <span className="phase-number">{item.phase}</span>
                  <span className={`phase-status status--${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsystems */}
      <section className="content-section">
        <div className="container">
          <div className="cansat-section-header">
            <span className="cansat-label">EIGHT SUBSYSTEMS</span>
            <h2>Every subsystem has an owner</h2>
            <p className="cansat-section-desc">
              Each discipline is led by a specialist from the CanSat team. No subsystem is
              an afterthought.
            </p>
          </div>
          <div className="subsystems-grid">
            {subsystems.map((system, index) => (
              <motion.div
                key={index}
                className="subsystem-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <h3>{system.name}</h3>
                <p className="subsystem-lead">Lead: {system.lead}</p>
                <p className="subsystem-desc">{system.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section cansat-alt-bg">
        <div className="container">
          <motion.div
            className="cansat-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Want to support the mission?</h2>
            <p>
              Sponsoring GARI puts your brand alongside a nationally competing student
              aerospace team. Get in touch to discuss partnership tiers.
            </p>
            <div className="cansat-cta-buttons">
              <a href="/contact" className="ccta-btn-primary">Partner with GARI</a>
              <a href="/team" className="ccta-btn-secondary">Meet the CanSat team</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CanSatPage;
