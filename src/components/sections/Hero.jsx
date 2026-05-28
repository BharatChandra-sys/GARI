import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const gradientTextRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (gradientTextRef.current) {
        const element = gradientTextRef.current;
        const rect = element.getBoundingClientRect();
        
        // Start with 0% when element is in initial position
        // Fill to 100% as user scrolls down
        const scrollProgress = window.scrollY;
        const elementTop = rect.top + scrollProgress;
        
        // Calculate progress based on scroll position
        // Line fills as you scroll past the element
        let progress = 0;
        if (scrollProgress > 0) {
          progress = Math.min((scrollProgress / (elementTop * 0.5)), 1);
        }
        
        setLineWidth(progress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="home" className="hero">
      {/* Background Image */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Engineering The Future Of{' '}
          <span className="gradient-text" ref={gradientTextRef}>
            Aerospace Innovation
            <span className="gradient-line" style={{ width: `${lineWidth}%` }}></span>
          </span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          GARI is a student-driven aerospace and rocketry initiative based at
          GITAM University, focused on innovation, engineering excellence, and
          next-generation technological development.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="/cansat" className="btn btn-primary">
            <span>Explore Mission</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="/team" className="btn btn-secondary">
            <span>Meet Team</span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="stat-item">
            <h3>30+</h3>
            <p>Active Members</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3>6+</h3>
            <p>Technical Divisions</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3>2026</h3>
            <p>CanSat Mission</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll to explore</p>
      </motion.div>
    </section>
  );
};

export default Hero;
