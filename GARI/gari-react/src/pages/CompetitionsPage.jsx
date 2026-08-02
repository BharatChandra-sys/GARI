import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './CompetitionsPage.css';

const CompetitionsPage = () => {
  const [activeTab, setActiveTab] = useState('cansat');

  const cansatStats = [
    { value: '1000m', label: 'Launch Altitude' },
    { value: 'NavIC', label: 'GNSS Integration' },
    { value: 'Real-Time', label: 'Telemetry System' },
    { value: 'Dual', label: 'Recovery Mechanism' },
  ];

  const rocketStats = [
    { value: '3km', label: 'Target Apogee' },
    { value: 'Hybrid', label: 'Propulsion System' },
    { value: 'Active', label: 'Stability Control' },
    { value: 'Custom', label: 'Avionics Stack' },
  ];

  const cansatSubsystems = [
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

  const rocketSubsystems = [
    {
      name: 'Propulsion Systems',
      lead: 'Propulsion Team',
      desc: 'Hybrid rocket motor design with nitrous oxide oxidizer and HTPB fuel grain. Thrust profiling, combustion chamber design, and nozzle optimization for stable ascent.',
    },
    {
      name: 'Airframe & Structures',
      lead: 'Structures Team',
      desc: 'Composite airframe construction using fiberglass and carbon fiber. Optimized for aerodynamic efficiency, structural integrity, and mass budget constraints.',
    },
    {
      name: 'Recovery Systems',
      lead: 'Recovery Team',
      desc: 'Dual-event parachute deployment system with drogue and main chutes. Pyrotechnic separation mechanisms and descent rate calculations for safe ground recovery.',
    },
    {
      name: 'Avionics & Flight Computer',
      lead: 'Avionics Team',
      desc: 'Custom flight computer for data acquisition, apogee detection, and parachute deployment logic. Real-time sensor fusion and flight state estimation.',
    },
    {
      name: 'Telemetry & Ground Systems',
      lead: 'Telemetry Team',
      desc: 'RF telemetry downlink for live flight data transmission. Ground station software for tracking, data visualization, and mission command control.',
    },
    {
      name: 'Payload Integration',
      lead: 'Payload Team',
      desc: 'Scientific payload integration including sensors for atmospheric data collection, video recording, and experimental instrumentation.',
    },
  ];

  const cansatTimeline = [
    { phase: 'Phase 1', title: 'PDR — Preliminary Design Review', status: 'Cleared', desc: 'System architecture, subsystem definitions, and design approach reviewed and approved.' },
    { phase: 'Phase 2', title: 'CDR — Critical Design Review', status: 'In Progress', desc: 'Detailed design, manufacturing drawings, and test plans under development.' },
    { phase: 'Phase 3', title: 'Build & Integration', status: 'Upcoming', desc: 'Hardware fabrication, PCB assembly, firmware integration, and system-level testing.' },
    { phase: 'Phase 4', title: 'Launch — IN-SPACe CAN-7USAT 2026', status: 'Upcoming', desc: 'Competition launch at 1000m altitude. Full mission execution with live telemetry.' },
  ];

  const rocketTimeline = [
    { phase: 'Phase 1', title: 'Conceptual Design', status: 'Cleared', desc: 'Mission requirements, preliminary design parameters, and propulsion system selection completed.' },
    { phase: 'Phase 2', title: 'Detailed Design', status: 'In Progress', desc: 'CAD modeling, structural analysis, motor sizing, and avionics architecture development underway.' },
    { phase: 'Phase 3', title: 'Manufacturing & Testing', status: 'Upcoming', desc: 'Airframe fabrication, motor testing, avionics integration, and ground systems validation.' },
    { phase: 'Phase 4', title: 'Launch — IN-SPACe Model Rocketry 2026', status: 'Upcoming', desc: 'Competition flight demonstrating 3km apogee capability with full telemetry and recovery.' },
  ];

  return (
    <div className="competitions-page">
      <SEO
        title="Competitions — GARI CanSat & Rocket Programs | IN-SPACe 2026"
        description="GARI is competing in two IN-SPACe 2026 competitions: CanSat with NavIC GNSS at 1000m altitude, and Model Rocketry targeting 3km apogee. PDR cleared. National-level student aerospace programs built at GITAM University Hyderabad."
        path="/competitions"
        keywords="GARI competitions, GARI IN-SPACe 2026, GARI CanSat rocket, IN-SPACe CAN-7USAT 2026, IN-SPACe Model Rocketry India, GITAM aerospace competitions, student CanSat India, student rocketry India, NavIC CanSat competition, hybrid rocket competition India, GARI GITAM competitions, aerospace student competitions 2026, IN-SPACe student programs, CanSat rocket India 2026"
        datePublished="2025-01-01"
        dateModified="2026-07-01"
        breadcrumbs={[{ name: 'Competitions', url: 'https://gari.live/competitions' }]}
        faq={[
          { q: 'What competitions is GARI participating in?', a: 'GARI is competing in two IN-SPACe 2026 national competitions: IN-SPACe CAN-7USAT 2026 (CanSat competition) and IN-SPACe Model Rocketry India Student Competition (3km altitude rocket).' },
          { q: 'What is IN-SPACe?', a: 'IN-SPACe is the Indian National Space Promotion and Authorization Center, the national regulatory body that organizes premier student aerospace competitions in India.' },
          { q: 'What makes GARI\'s CanSat unique?', a: 'GARI\'s CanSat integrates NavIC (India\'s satellite navigation system), real-time RF telemetry, dual parachute recovery, custom ground station software, and has 8 specialized subsystems with PDR cleared.' },
          { q: 'What is GARI\'s rocket program?', a: 'GARI is developing a hybrid propulsion model rocket targeting 3km apogee for IN-SPACe Model Rocketry India Student Competition 2026, featuring custom avionics, active stability control, and dual-event recovery.' },
          { q: 'Has GARI cleared PDR?', a: 'Yes. GARI has successfully cleared Preliminary Design Review (PDR) for the CanSat program. The rocket program is currently in detailed design phase.' },
          { q: 'What is NavIC?', a: 'NavIC (Navigation with Indian Constellation) is India\'s own GPS-equivalent satellite navigation system. GARI uses NavIC in its CanSat for positional tracking, making it one of few student teams in India using NavIC instead of GPS.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ResearchProject',
          name: 'GARI Competitions — CanSat & Rocket Programs',
          description: 'GARI competing in IN-SPACe CAN-7USAT 2026 and Model Rocketry India 2026. CanSat with NavIC GNSS at 1000m, hybrid rocket targeting 3km.',
          url: 'https://gari.live/competitions',
          member: { '@id': 'https://gari.live/#organization' },
          keywords: ['CanSat', 'Model Rocketry', 'NavIC', 'IN-SPACe', 'India', 'GITAM', 'competitions', '2026'],
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
            <span className="hero-tag">IN-SPACe 2026 NATIONAL COMPETITIONS</span>
            <h1>Competition Programs</h1>
            <p className="hero-subtitle">
              Two national-level aerospace missions competing in 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Competition Tabs */}
      <section className="content-section">
        <div className="container">
          <div className="comp-tabs">
            <button
              className={`comp-tab ${activeTab === 'cansat' ? 'comp-tab--active' : ''}`}
              onClick={() => setActiveTab('cansat')}
            >
              <span className="comp-tab-label">CanSat Program</span>
              <span className="comp-tab-subtitle">IN-SPACe CAN-7USAT 2026</span>
            </button>
            <button
              className={`comp-tab ${activeTab === 'rocket' ? 'comp-tab--active' : ''}`}
              onClick={() => setActiveTab('rocket')}
            >
              <span className="comp-tab-label">Rocket Program</span>
              <span className="comp-tab-subtitle">IN-SPACe Model Rocketry India 2026</span>
            </button>
          </div>

          {/* CanSat Content */}
          {activeTab === 'cansat' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="comp-intro">
                <motion.div
                  className="comp-intro-text"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="comp-label">CANSAT MISSION</span>
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
                  className="comp-stats-block"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="stats-grid">
                    {cansatStats.map((stat, index) => (
                      <div key={index} className="stat-card">
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Mission Timeline */}
              <div className="comp-section-divider"></div>
              <div className="comp-section-header">
                <span className="comp-label">MISSION STATUS</span>
                <h2>Where we are in the program</h2>
              </div>
              <div className="mission-timeline">
                {cansatTimeline.map((item, i) => (
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

              {/* Subsystems */}
              <div className="comp-section-divider"></div>
              <div className="comp-section-header">
                <span className="comp-label">EIGHT SUBSYSTEMS</span>
                <h2>Every subsystem has an owner</h2>
                <p className="comp-section-desc">
                  Each discipline is led by a specialist from the CanSat team. No subsystem is
                  an afterthought.
                </p>
              </div>
              <div className="subsystems-grid">
                {cansatSubsystems.map((system, index) => (
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
            </motion.div>
          )}

          {/* Rocket Content */}
          {activeTab === 'rocket' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="comp-intro">
                <motion.div
                  className="comp-intro-text"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="comp-label">MODEL ROCKETRY MISSION</span>
                  <h2>Engineering a 3km altitude rocket from the ground up.</h2>
                  <p>
                    GARI's Model Rocketry program is designing, building, and launching a hybrid
                    propulsion rocket targeting 3km apogee for the IN-SPACe Model Rocketry India
                    Student Competition 2026. The mission involves full-stack aerospace engineering:
                    propulsion systems, composite airframes, active stability control, custom avionics,
                    and dual-event recovery mechanisms.
                  </p>
                  <p>
                    The rocket features a hybrid motor with nitrous oxide oxidizer and HTPB fuel grain,
                    providing controllable thrust and enhanced safety compared to solid motors. A custom
                    flight computer manages data acquisition, apogee detection, and parachute deployment
                    sequencing. Real-time telemetry downlink enables ground station tracking throughout
                    the entire flight envelope from ignition to touchdown.
                  </p>
                </motion.div>

                <motion.div
                  className="comp-stats-block"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="stats-grid">
                    {rocketStats.map((stat, index) => (
                      <div key={index} className="stat-card">
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Mission Timeline */}
              <div className="comp-section-divider"></div>
              <div className="comp-section-header">
                <span className="comp-label">MISSION STATUS</span>
                <h2>Where we are in the program</h2>
              </div>
              <div className="mission-timeline">
                {rocketTimeline.map((item, i) => (
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

              {/* Subsystems */}
              <div className="comp-section-divider"></div>
              <div className="comp-section-header">
                <span className="comp-label">SIX SUBSYSTEMS</span>
                <h2>Full-stack rocket engineering</h2>
                <p className="comp-section-desc">
                  From propulsion to payload, every system is engineered in-house by specialized teams.
                </p>
              </div>
              <div className="subsystems-grid">
                {rocketSubsystems.map((system, index) => (
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
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="content-section comp-alt-bg">
        <div className="container">
          <motion.div
            className="comp-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Want to support our competition programs?</h2>
            <p>
              Sponsoring GARI puts your brand alongside nationally competing student
              aerospace teams building real rockets and satellites. Get in touch to discuss
              partnership opportunities.
            </p>
            <div className="comp-cta-buttons">
              <a href="/contact" className="ccta-btn-primary">Partner with GARI</a>
              <a href="/team" className="ccta-btn-secondary">Meet the teams</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CompetitionsPage;
