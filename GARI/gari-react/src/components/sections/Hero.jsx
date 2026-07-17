import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section
      id="home"
      className="hero"
      aria-label="GARI — GITAM Aerospace Rocketry Initiative"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Full-bleed background image */}
      <div className="hero-bg" role="presentation" aria-hidden="true">
        <div className="hero-overlay" />
      </div>

      {/* Centered content over image */}
      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          GITAM Aerospace Rocketry Initiative
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          itemProp="headline"
        >
          Build it. Launch it.{' '}
          <span className="hero-h1-accent">Push the boundary.</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          itemProp="description"
        >
          India's next-generation student aerospace team — competing in IN-SPACe
          CAN-7USAT 2026, PDR cleared for both Rocket and CanSat programs.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="/cansat"
            className="hero-btn hero-btn--outline"
            aria-label="Explore GARI's CanSat mission for IN-SPACe CAN-7USAT 2026"
          >
            Explore the Mission
          </a>
          <a
            href="/contact"
            className="hero-btn hero-btn--outline"
            aria-label="Get in touch with GARI"
          >
            Get Involved
          </a>
        </motion.div>
      </div>

      {/* PDR milestone strip — overlaid at the bottom of the hero, fades on hover */}
      <div className="hero-pdr-strip" aria-label="Latest milestone">
        <div className="hero-pdr-inner">
          <span className="hero-pdr-label">Latest milestone</span>
          <div className="hero-pdr-badges">
            <span className="hero-pdr-badge">PDR Cleared — CanSat</span>
            <span className="hero-pdr-badge">PDR Cleared — Rocket</span>
          </div>
          <a href="/cansat" className="hero-pdr-link">View mission →</a>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden="true"
      >
        <span className="hero-scroll-line" />
        <span className="hero-scroll-label">Scroll</span>
      </motion.div>

      {/* Hidden SEO answer box */}
      <div style={{ display: 'none' }} aria-hidden="true" itemProp="description">
        GARI (GITAM Aerospace Rocketry Initiative) is GITAM University's student
        aerospace and rocketry team, competing in India's IN-SPACe CAN-7USAT 2026
        national CanSat competition with a 1000m altitude satellite featuring NavIC
        GNSS integration and real-time telemetry. PDR cleared for both Rocket and
        CanSat programs.
      </div>
    </section>
  );
};

export default Hero;
