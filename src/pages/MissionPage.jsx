import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './MissionPage.css';

const MissionPage = () => {
  return (
    <div className="mission-page">
      <SEO
        title="Our Mission"
        description="GARI's mission is to advance aerospace engineering through hands-on rocketry, CanSat competitions, and student-led research at GITAM University, Hyderabad."
        path="/mission"
      />

      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Our Mission</h1>
            <p className="hero-subtitle">
              Creating A Platform For Future Aerospace Innovators
            </p>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="about-text">
            <h2>Vision & Goals</h2>
            <p>
              GARI aims to inspire innovation, encourage collaborative research, and
              build impactful aerospace technologies through practical engineering
              experiences and multidisciplinary teamwork.
            </p>
          </div>

          <div className="values-grid">
            <motion.div
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>Innovation</h3>
              <p>Encouraging students to explore advanced aerospace systems and future-focused engineering solutions.</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3>Collaboration</h3>
              <p>Bringing together multidisciplinary teams to work on practical, mission-oriented aerospace projects.</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3>Research</h3>
              <p>Building a culture of experimentation, technical exploration, and continuous innovation.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionPage;
