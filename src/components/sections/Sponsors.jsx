import React from 'react';
import { motion } from 'framer-motion';
import './Sponsors.css';

const Sponsors = () => {
  const sponsors = [
    {
      name: 'ANSYS',
      logo: '/sponsors/ansys-logo.png',
      website: 'https://www.ansys.com',
    },
    // Add more sponsors here as needed
  ];

  return (
    <section className="sponsors-section">
      <div className="container">
        <motion.div
          className="sponsors-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="sponsors-label">POWERED BY</p>
          <h2>Industry <span className="gradient-text">Leaders</span></h2>
        </motion.div>

        <motion.div
          className="sponsors-logos"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {sponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-logo-link"
              aria-label={sponsor.name}
            >
              <img 
                src={sponsor.logo} 
                alt={`${sponsor.name} logo`}
                className="sponsor-logo-img"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
