import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(email.trim())) {
      return 'Invalid email format';
    }
    if (email.trim().length > 254) {
      return 'Email is too long';
    }
    return '';
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'newsletter',
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        console.error('Error subscribing:', data);
        setSubmitStatus('error');
        setError(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Error submitting newsletter:', error);
      setSubmitStatus('error');
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className="footer"
      role="contentinfo"
      aria-label="GARI site footer"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo variant="default" size="medium" />
            {/* E-E-A-T signal: clear organization description */}
            <p className="footer-tagline" itemProp="name">
              GITAM Aerospace Rocketry Initiative
            </p>
            <p className="footer-description" itemProp="description">
              Student-driven aerospace and rocketry team at GITAM University,
              Hyderabad. Competing in IN-SPACe CAN-7USAT 2026 and building
              next-generation rockets.
            </p>

            {/* E-E-A-T: location signals */}
            <p
              className="footer-location-text"
              itemScope
              itemType="https://schema.org/PostalAddress"
              style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}
            >
              <span itemProp="addressLocality">Hyderabad</span>,{' '}
              <span itemProp="addressRegion">Telangana</span>,{' '}
              <span itemProp="addressCountry">India</span>
            </p>

            {/* Social Media Links */}
            <div className="footer-social">
              <a
                href="mailto:contact@gari.live"
                className="social-link"
                aria-label="Email GARI at contact@gari.live"
                rel="noopener"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/gari.gitam"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow GARI on Instagram @gari.gitam"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/gari-gitam"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow GARI on LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-section">
            {/* Internal linking with descriptive anchor text (Semrush technique #3) */}
            <nav className="footer-column" aria-label="About GARI">
              <h4>About GARI</h4>
              <ul>
                <li><Link to="/">GARI Home</Link></li>
                <li><Link to="/about">About GITAM Aerospace</Link></li>
                <li><Link to="/mission">Our Aerospace Mission</Link></li>
                <li><Link to="/achievements">Competition Achievements</Link></li>
              </ul>
            </nav>

            <nav className="footer-column" aria-label="GARI Projects">
              <h4>Projects &amp; Team</h4>
              <ul>
                <li><Link to="/cansat">CanSat IN-SPACe 2026</Link></li>
                <li><Link to="/team">Meet the 30+ Member Team</Link></li>
                <li><Link to="/sponsors">Become a Sponsor</Link></li>
                <li><Link to="/contact">Contact GARI</Link></li>
              </ul>
            </nav>

            <div className="footer-column">
              <h4>Newsletter</h4>
              <p className="newsletter-text">Stay updated with GARI&apos;s latest aerospace projects and competition results</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit} aria-label="Newsletter subscription">
                <label htmlFor="footer-email" className="sr-only">Your email address</label>
                <input
                  type="email"
                  id="footer-email"
                  placeholder="Your email"
                  className={`newsletter-input ${error ? 'error' : ''}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  required
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className="newsletter-button"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Subscribing to GARI newsletter...' : 'Subscribe to GARI newsletter'}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {error && <p className="newsletter-error" role="alert">{error}</p>}
              {submitStatus === 'success' && (
                <p className="newsletter-success" role="status">✓ Subscribed successfully!</p>
              )}
              {submitStatus === 'error' && !error && (
                <p className="newsletter-error" role="alert">✗ Failed to subscribe. Try again.</p>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 GARI — GITAM Aerospace Rocketry Initiative. All rights reserved.
          </p>
          <p className="footer-location">
            <a href="https://www.gitam.edu" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>
              GITAM University
            </a>
            , Hyderabad, Telangana, India
          </p>
          {/* Humans.txt credit — E-E-A-T signal */}
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
            Built by{' '}
            <a href="https://bharatchandra.me" target="_blank" rel="me noopener noreferrer" style={{ color: '#60a5fa' }}>
              Bodapati Bharat Chandra
            </a>
            {' '}— Ground Station &amp; Software Lead, GARI CanSat Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
