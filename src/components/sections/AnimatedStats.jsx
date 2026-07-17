import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './AnimatedStats.css';

const AnimatedStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: 30, suffix: '+', label: 'Team Members', duration: 2 },
    { value: 6, suffix: '+', label: 'Divisions', duration: 1.5 },
    { value: 2026, suffix: '', label: 'Launch Year', duration: 2 },
  ];

  return (
    <section ref={ref} className="animated-stats-section">
      <div className="container">
        <motion.div
          className="stats-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>By The Numbers</h2>
          <p>Our journey in aerospace innovation</p>
        </motion.div>

        <div className="animated-stats-grid">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;
    const duration = stat.duration * 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, stat.value, stat.duration]);

  return (
    <motion.div
      className="animated-stat-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="stat-icon">
        <div className="stat-circle"></div>
      </div>
      <h3>
        {count}
        <span className="stat-suffix">{stat.suffix}</span>
      </h3>
      <p>{stat.label}</p>
      <div className="stat-progress">
        <motion.div
          className="stat-progress-bar"
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ duration: stat.duration, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

export default AnimatedStats;
