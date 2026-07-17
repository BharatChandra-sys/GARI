import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './AboutPage.css';

const AboutPage = () => {
  const values = [
    {
      title: 'Aerospace Research',
      description:
        'We explore advanced aerospace systems — from orbital mechanics to avionics — through rigorous student-led experimentation and design iteration at GITAM University.',
    },
    {
      title: 'Engineering Innovation',
      description:
        'Every subsystem we build — telemetry, recovery, structures — is designed from scratch. We prototype fast, test hard, and iterate until it works at altitude.',
    },
    {
      title: 'Multidisciplinary Team',
      description:
        'GARI brings together 30+ students across Aerospace, ECE, CSE, and Mechanical Engineering. Different disciplines, one mission.',
    },
  ];

  const milestones = [
    {
      year: '2024',
      event: 'GARI Founded',
      detail:
        'Team established at GITAM University, Hyderabad with a core group of aerospace engineering students.',
    },
    {
      year: '2025',
      event: 'First Prototypes',
      detail:
        'Completed six prototype builds including rovers, hexacopter, and fixed-wing aircraft models.',
    },
    {
      year: '2026',
      event: 'IN-SPACe CAN-7USAT',
      detail:
        "Nationally selected to compete in India's premier student CanSat competition with a NavIC-integrated satellite.",
    },
  ];

  const divisions = [
    {
      name: 'Aerospace & Structures',
      desc: 'Aerodynamic design, CAD modeling, and structural analysis',
    },
    {
      name: 'Avionics & Electronics',
      desc: 'Flight computers, sensor integration, and PCB design',
    },
    {
      name: 'Software & Ground Station',
      desc: 'Real-time telemetry software, data pipelines, and GCS',
    },
    {
      name: 'Propulsion',
      desc: 'Motor selection, thrust studies, and gimbal control systems',
    },
    {
      name: 'Recovery Systems',
      desc: 'Dual-parachute deployment and safe descent mechanisms',
    },
    {
      name: 'Media & Outreach',
      desc: 'Documentation, social presence, and sponsorship outreach',
    },
  ];

  return (
    <div className="about-page">
      <SEO
        title="About GARI — GITAM Aerospace Rocketry Initiative"
        description="About GARI — GITAM University's student aerospace and rocketry team. Founded in 2024, we build rockets, CanSats, and aerospace systems with 30+ multidisciplinary engineers in Hyderabad, India."
        path="/about"
        keywords="about GARI, GARI GITAM, GITAM Aerospace Rocketry Initiative, GARI aerospace team, GITAM aerospace research, GARI student team, aerospace students GITAM Hyderabad, GARI team India"
        breadcrumbs={[{ name: 'About', url: 'https://gari.live/about' }]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': 'https://gari.live/about#webpage',
          url: 'https://gari.live/about',
          name: 'About GARI — GITAM Aerospace Rocketry Initiative',
          description:
            "GARI is GITAM University's student aerospace and rocketry team built on innovation, collaboration, and research.",
          isPartOf: { '@id': 'https://gari.live/#website' },
          about: { '@id': 'https://gari.live/#organization' },
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
            <span className="page-tag">EST. 2024 · GITAM UNIVERSITY</span>
            <h1>About GARI</h1>
            <p className="hero-subtitle">
              Advancing Aerospace Innovation Through Hands-On Engineering
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="content-section">
        <div className="container">
          <div className="about-split">
            <motion.div
              className="about-text-block"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="section-label">WHO WE ARE</span>
              <h2>A student-run aerospace team that ships real hardware</h2>
              <p>
                GARI — the GITAM Aerospace Rocketry Initiative — is the aerospace and
                rocketry team at GITAM University, Hyderabad. Founded in 2024, we exist
                to give engineering students a serious venue for hands-on aerospace work:
                not simulations, not textbooks — actual prototypes, actual launches,
                actual telemetry.
              </p>
              <p>
                We compete at the national level in IN-SPACe CAN-7USAT 2026 with a
                CanSat satellite featuring NavIC GNSS integration and real-time
                telemetry. Alongside the competition mission, we have built rovers,
                multi-rotor platforms, fixed-wing aircraft, gimbal systems, and
                autonomous bots — all documented in our project archive.
              </p>
              <p>
                Our team spans aerospace, electronics, computer science, and mechanical
                engineering. That breadth is intentional — aerospace is a systems
                discipline, and we build like it is.
              </p>
              <div className="about-cta-links">
                <a href="/team">Meet the team →</a>
                <a href="/achievements">See our past work →</a>
              </div>
            </motion.div>

            <motion.div
              className="about-stat-block"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="big-stat-grid">
                <div className="big-stat">
                  <strong>30+</strong>
                  <span>Active engineers</span>
                </div>
                <div className="big-stat">
                  <strong>6+</strong>
                  <span>Technical divisions</span>
                </div>
                <div className="big-stat">
                  <strong>6</strong>
                  <span>Prototype builds</span>
                </div>
                <div className="big-stat">
                  <strong>2026</strong>
                  <span>CanSat mission</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="content-section values-bg">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">WHAT DRIVES US</span>
            <h2>Built on three principles</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="content-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">OUR STORY</span>
            <h2>From zero to national competition in under two years</h2>
          </div>
          <div className="about-timeline">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="timeline-year-badge">{m.year}</div>
                <div className="timeline-body">
                  <h3>{m.event}</h3>
                  <p>{m.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="content-section values-bg">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">TECHNICAL DIVISIONS</span>
            <h2>Six specialized teams, one mission</h2>
            <p className="section-desc">
              Every subsystem has an owner. Here is how GARI is structured internally.
            </p>
          </div>
          <div className="divisions-grid">
            {divisions.map((div, i) => (
              <motion.div
                key={i}
                className="division-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3>{div.name}</h3>
                <p>{div.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section">
        <div className="container">
          <motion.div
            className="about-cta-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Want to back us?</h2>
            <p>
              We are looking for sponsors, industry partners, and collaborators who want
              to invest in the next generation of Indian aerospace engineers.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="cta-btn-primary">Get in touch</a>
              <a href="/sponsors" className="cta-btn-secondary">Sponsorship tiers</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
