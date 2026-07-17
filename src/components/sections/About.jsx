import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      title: 'Aerospace Research',
      description:
        'GARI explores advanced aerospace systems, engineering concepts, and mission-focused technological innovation through practical student-led experiments.',
    },
    {
      title: 'Engineering Innovation',
      description:
        'Developing practical CanSat and rocketry solutions through hands-on experimentation, design iteration, and collaborative engineering at GITAM University.',
    },
    {
      title: 'Technical Collaboration',
      description:
        'Bringing together 30+ multidisciplinary students — from aerospace to CSE — to work on impactful aerospace projects like the IN-SPACe CAN-7USAT competition.',
    },
  ];

  return (
    /* Semantic section with itemScope for E-E-A-T (Semrush technique #8) */
    <section
      id="about"
      className="about"
      ref={ref}
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">ABOUT GARI</span>
          {/* H2 — Descriptive for AI retrieval (Semrush technique #4) */}
          <h2 id="about-heading" itemProp="description">
            Advancing <span className="gradient-text">Aerospace Innovation</span>{' '}
            Through Engineering
          </h2>
          {/* Self-sufficient paragraph — each sentence stands alone for AI citation */}
          <p className="section-description" itemProp="description">
            GARI (GITAM Aerospace Rocketry Initiative) is GITAM University&apos;s
            student-driven aerospace and rocketry team based in Hyderabad, India.
            The team competes in IN-SPACe CAN-7USAT 2026, India&apos;s national
            CanSat competition, and develops sounding rockets through hands-on
            engineering. With 30+ members spanning aerospace, electronics, computer
            science, and mechanical engineering, GARI builds telemetry systems,
            avionics, NavIC GNSS integrations, and ground station software.
          </p>
        </motion.div>

        {/* Values grid — structured content for featured snippets */}
        <div className="values-grid" role="list" aria-label="GARI core values and focus areas">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="value-card"
              role="listitem"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              itemScope
              itemType="https://schema.org/Thing"
            >
              <div className="card-glow" aria-hidden="true"></div>
              {/* H3 inside section — correct heading hierarchy */}
              <h3 itemProp="name">{value.title}</h3>
              <p itemProp="description">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Internal links — descriptive anchor text (Semrush technique #3) */}
        <motion.div
          className="about-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="/cansat" aria-label="Learn about GARI's CanSat mission for IN-SPACe CAN-7USAT 2026" style={{ color: '#1e40af', fontWeight: 600, textDecoration: 'underline' }}>
            Explore our CanSat IN-SPACe 2026 project →
          </a>
          <a href="/team" aria-label="Meet all 30+ GARI aerospace team members" style={{ color: '#1e40af', fontWeight: 600, textDecoration: 'underline' }}>
            Meet the 30+ member team →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
