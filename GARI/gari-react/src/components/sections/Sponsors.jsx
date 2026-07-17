import React from 'react';
import { motion } from 'framer-motion';
import './Sponsors.css';

const Sponsors = () => {
  return (
    <section className="sponsors-section">
      <div className="container">
        <motion.div
          className="sponsors-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="sponsors-copy">
            <span className="sponsors-label">SPONSORSHIP</span>
            <h2>Back India's next aerospace engineers</h2>
            <p>
              GARI has cleared PDR for both Rocket and CanSat programs and is
              actively competing at the national level. We are looking for our
              founding sponsors for the 2026 competition season.
            </p>
            <div className="sponsors-actions">
              <a href="/sponsors" className="sponsors-btn-primary">View sponsorship tiers</a>
              <a href="/contact" className="sponsors-btn-secondary">Get in touch</a>
            </div>
          </div>

          <div className="sponsors-stats">
            <div className="sp-stat">
              <strong>30+</strong>
              <span>Engineering students</span>
            </div>
            <div className="sp-stat">
              <strong>2 / 2</strong>
              <span>PDR reviews cleared</span>
            </div>
            <div className="sp-stat">
              <strong>National</strong>
              <span>IN-SPACe competition</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
