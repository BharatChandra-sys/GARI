import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './MissionPage.css';

const MissionPage = () => {
  const pillars = [
    {
      title: 'Innovation',
      description:
        "We don't buy off-the-shelf and call it done. Every system — avionics, recovery, ground station — is designed, built, and tested by our students. The goal is engineering judgment, not assembly.",
    },
    {
      title: 'Collaboration',
      description:
        'Real missions are multidisciplinary. GARI deliberately mixes aerospace, ECE, CSE, and mechanical engineers on the same project so students learn to communicate across discipline boundaries.',
    },
    {
      title: 'Research',
      description:
        'We treat every prototype as a learning instrument. Failures are documented, root-caused, and fixed. That iterative loop is how we grow — and how real aerospace engineering works.',
    },
    {
      title: 'Competition',
      description:
        'External evaluation keeps us honest. IN-SPACe CAN-7USAT 2026 gives us hard deadlines and technical requirements that push the team to build things that actually work under pressure.',
    },
    {
      title: 'Impact',
      description:
        'India needs aerospace engineers. GARI is one answer — building a pipeline of students who have shipped real hardware before graduation and can contribute on day one in industry or research.',
    },
    {
      title: 'Technology',
      description:
        'We deliberately choose hard problems: NavIC GNSS integration, real-time telemetry, thrust-vector control. The harder the problem, the more we learn.',
    },
  ];

  const goals = [
    {
      term: 'Short-term — 2026',
      items: [
        'Compete and perform in IN-SPACe CAN-7USAT 2026',
        'Complete CanSat satellite with NavIC GNSS and dual parachute recovery',
        'Deploy real-time ground station software for mission monitoring',
        'Document all subsystems and build a public technical portfolio',
      ],
    },
    {
      term: 'Medium-term — 2027',
      items: [
        'Design and launch a low-power sounding rocket',
        'Target Spaceport America Cup qualification',
        'Grow team to 50+ members across GITAM campuses',
        'Establish formal industry partnerships and mentorship pipelines',
      ],
    },
    {
      term: 'Long-term',
      items: [
        "Become one of India's most competitive student aerospace teams",
        'Contribute open-source aerospace tooling used by other institutions',
        'Enable GITAM graduates to enter ISRO, IN-SPACe, and aerospace startups with a hands-on edge',
        'Build a sustained culture of engineering excellence at GITAM',
      ],
    },
  ];

  return (
    <div className="mission-page">
      <SEO
        title="Mission — GARI GITAM Aerospace Rocketry Initiative | Student Aerospace Goals"
        description="GARI's mission: advancing aerospace engineering through hands-on rocketry, CanSat competitions, and student-led research at GITAM University Hyderabad. Building India's next generation of aerospace engineers through real hardware, national competitions, and multidisciplinary teamwork."
        path="/mission"
        keywords="GARI mission, GARI GITAM, GITAM Aerospace Rocketry Initiative mission, GARI aerospace goals, aerospace innovation GITAM India, student rocketry mission India, GARI rocketry research, GARI vision, GARI roadmap, GARI aerospace India, GITAM aerospace mission 2026, why GARI, GARI innovation pillars, aerospace education India"
        datePublished="2024-01-01"
        dateModified="2026-07-01"
        breadcrumbs={[{ name: 'Mission', url: 'https://gari.live/mission' }]}
        faq={[
          { q: 'What is GARI\'s mission?', a: 'GARI\'s mission is to create a platform where GITAM students design, build, and fly aerospace systems — competing at the national level and building real skills for India\'s next generation of aerospace engineers.' },
          { q: 'What are GARI\'s goals for 2026?', a: 'GARI\'s 2026 goals include competing in IN-SPACe CAN-7USAT 2026, completing CanSat with NavIC GNSS and dual parachute recovery, deploying real-time ground station software, and building a public technical portfolio.' },
          { q: 'What is GARI\'s long-term vision?', a: 'GARI aims to become one of India\'s most competitive student aerospace teams, contribute open-source aerospace tooling, and enable GITAM graduates to enter ISRO, IN-SPACe, and aerospace startups with hands-on engineering experience.' },
          { q: 'Why does GARI participate in competitions?', a: 'External competitions like IN-SPACe CAN-7USAT give GARI hard deadlines and technical requirements, pushing the team to build systems that actually work under pressure — the best way to develop real engineering judgment.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://gari.live/mission#webpage',
          url: 'https://gari.live/mission',
          name: 'Mission — GARI Aerospace Rocketry Initiative',
          description:
            'GARI mission: inspire innovation, collaborative research, and impactful aerospace technologies through practical engineering at GITAM University.',
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
            <span className="page-tag">OUR MISSION</span>
            <h1>Our Mission</h1>
            <p className="hero-subtitle">
              Build engineers who can ship aerospace systems — not just study them
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="content-section mission-alt-bg">
        <div className="container">
          <motion.div
            className="mission-statement"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <blockquote className="statement-quote">
              "To create a platform where GITAM students design, build, and fly aerospace
              systems — competing at the national level, building real skills, and laying
              the foundation for India's next generation of aerospace engineers."
            </blockquote>
            <p className="statement-context">
              That sentence is the filter for every decision we make at GARI. If a
              project does not teach a student to ship something real, we do not build
              it. If a competition does not push the team technically, we do not enter
              it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="content-section">
        <div className="container">
          <div className="mission-section-header">
            <span className="mission-label">SIX PILLARS</span>
            <h2>What we stand for</h2>
            <p>Every GARI decision is grounded in these six principles.</p>
          </div>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                className="pillar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="content-section mission-alt-bg">
        <div className="container">
          <div className="mission-section-header">
            <span className="mission-label">ROADMAP</span>
            <h2>Where we are headed</h2>
            <p>Concrete goals, organized by time horizon.</p>
          </div>
          <div className="goals-grid">
            {goals.map((g, i) => (
              <motion.div
                key={i}
                className="goal-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="goal-term">{g.term}</div>
                <ul className="goal-list">
                  {g.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section">
        <div className="container">
          <motion.div
            className="mission-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Aligned with what we are building?</h2>
            <p>
              Whether you are a company looking to sponsor, an institution looking to
              collaborate, or a student wanting to join — we would love to hear from you.
            </p>
            <div className="mission-cta-buttons">
              <a href="/contact" className="mcta-btn-primary">Get in touch</a>
              <a href="/cansat" className="mcta-btn-secondary">See our CanSat project</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MissionPage;
