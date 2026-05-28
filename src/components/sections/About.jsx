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
        'Exploring advanced aerospace systems, engineering concepts, and mission-focused technological innovation.',
    },
    {
      title: 'Engineering Innovation',
      description:
        'Developing practical aerospace solutions through experimentation, design, and collaborative engineering.',
    },
    {
      title: 'Technical Collaboration',
      description:
        'Bringing together multidisciplinary students to work on impactful aerospace-oriented projects.',
    },
  ];

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">ABOUT GARI</span>
          <h2>
            Advancing <span className="gradient-text">Aerospace Innovation</span>{' '}
            Through Engineering
          </h2>
          <p className="section-description">
            GARI is a GITAM-based aerospace and rocketry initiative dedicated to
            engineering innovation, aerospace systems, and mission-oriented
            technological development. The team works across CanSat systems,
            avionics, telemetry, communication technologies, software systems, and
            aerospace rocketry through practical engineering exploration and
            multidisciplinary collaboration.
          </p>
        </motion.div>

        <div className="values-grid">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="value-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="card-glow"></div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
