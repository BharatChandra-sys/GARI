import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../common/Logo';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', ariaLabel: 'GARI home page' },
    { name: 'About', path: '/about', ariaLabel: 'About GARI aerospace team' },
    { name: 'Mission', path: '/mission', ariaLabel: 'GARI aerospace mission' },
    { name: 'CanSat', path: '/cansat', ariaLabel: 'GARI CanSat IN-SPACe 2026 project' },
    { name: 'Team', path: '/team', ariaLabel: 'Meet the GARI team' },
    { name: 'Achievements', path: '/achievements', ariaLabel: 'GARI competition achievements' },
    { name: 'Sponsors', path: '/sponsors', ariaLabel: 'Sponsor GARI aerospace' },
    { name: 'Contact', path: '/contact', ariaLabel: 'Contact GARI' },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      role="navigation"
      aria-label="GARI main navigation"
      itemScope
      itemType="https://schema.org/SiteLinksSearchBox"
    >
      <div className="nav-container">
        {/* Logo — Descriptive link */}
        <Link to="/" className="logo-link" aria-label="GARI — GITAM Aerospace Rocketry Initiative home page">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Logo variant="default" size="medium" />
          </motion.div>
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="nav-links"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav Links — descriptive anchor text (Semrush technique #3) */}
        <ul
          id="nav-links"
          className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}
          role="list"
        >
          {navLinks.map((link, index) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={closeMobileMenu}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                aria-label={link.ariaLabel || link.name}
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-overlay" onClick={closeMobileMenu} aria-hidden="true"></div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
