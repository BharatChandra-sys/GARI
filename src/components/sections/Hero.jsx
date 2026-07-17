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
    <section
      id="home"
      className="hero"
      aria-label="GARI — GITAM Aerospace Rocketry Initiative"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* LCP Image — fetchpriority=high for Core Web Vitals */}
      <div className="hero-background" role="presentation">
        <div className="hero-overlay" aria-hidden="true"></div>
      </div>

      <div className="hero-content">
        {/* H1 — Primary keyword in heading (Semrush technique #5) */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          itemProp="headline"
        >
          Engineering The Future Of{' '}
          <span className="gradient-text" ref={gradientTextRef}>
            Aerospace Innovation
            <span className="gradient-line" style={{ width: `${lineWidth}%` }} aria-hidden="true"></span>
          </span>
        </motion.h1>

        {/* Self-sufficient paragraph for AI retrieval (Semrush technique #4) */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          itemProp="description"
        >
          GARI (GITAM Aerospace Rocketry Initiative) is a student-driven aerospace
          and rocketry team at GITAM University, Hyderabad, India. We compete in
          IN-SPACe CAN-7USAT 2026, develop sounding rockets, and pioneer
          next-generation space technology through hands-on engineering.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Internal links with descriptive anchor text (Semrush technique #3) */}
          <a href="/cansat" className="btn btn-primary" aria-label="Explore GARI's CanSat mission for IN-SPACe CAN-7USAT 2026">
            <span>Explore Mission</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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
          <a href="/team" className="btn btn-secondary" aria-label="Meet the 30+ GARI aerospace engineering team members">
            <span>Meet the Team</span>
          </a>
        </motion.div>

        {/* Stats — structured data visible to crawlers */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          aria-label="GARI team statistics"
        >
          <div className="stat-item">
            <h3 aria-label="30 plus active members">30+</h3>
            <p>Active Members</p>
          </div>
          <div className="stat-divider" aria-hidden="true"></div>
          <div className="stat-item">
            <h3>6+</h3>
            <p>Technical Divisions</p>
          </div>
          <div className="stat-divider" aria-hidden="true"></div>
          <div className="stat-item">
            <h3>2026</h3>
            <p>CanSat Mission</p>
          </div>
        </motion.div>

        {/* Featured snippet answer box (Semrush technique #7) */}
        <motion.div
          className="answer-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{ display: 'none' }}
          aria-hidden="true"
        >
          <p>
            GARI (GITAM Aerospace Rocketry Initiative) is GITAM University&#39;s
            student aerospace and rocketry team, competing in India&#39;s
            IN-SPACe CAN-7USAT 2026 national CanSat competition with a 1000m
            altitude satellite featuring NavIC GNSS integration and real-time
            telemetry.
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden="true"
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
