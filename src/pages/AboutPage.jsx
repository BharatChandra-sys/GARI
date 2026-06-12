import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './AboutPage.css';

const AboutPage = () => {
  const values = [
    {
      title: 'Aerospace Research',
      description: 'Exploring advanced aerospace systems, engineering concepts, and mission-focused technological innovation.',
    },
    {
      title: 'Engineering Innovation',
      description: 'Developing practical aerospace solutions through experimentation, design, and collaborative engineering.',
    },
    {
      title: 'Technical Collaboration',
      description: 'Bringing together multidisciplinary students to work on impactful aerospace-oriented projects.',
    },
  ];

  return (
    <div className="about-page">
      <SEO
        title="About GARI"
        description="Learn about GARI — GITAM's student aerospace and rocketry team. Our values, research focus, and commitment to engineering innovation at GITAM University, Hyderabad."
        path="/about"
      />
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>About GARI</h1>
            <p className="hero-subtitle">
              Advancing Aerospace Innovation Through Engineering Excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content-section">
        <div className="container">
          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>Who We Are</h2>
              <p>
                GARI is a GITAM-based aerospace and rocketry initiative dedicated to
                engineering innovation, aerospace systems, and mission-oriented
                technological development.
              </p>
              <p>
                The team works across CanSat systems, avionics, telemetry,
                communication technologies, software systems, and aerospace research
                through practical engineering exploration and multidisciplinary
                collaboration.
              </p>
            </motion.div>

            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
