import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import './Footer.css';

const columns = [
  {
    title: 'Programs',
    links: [
      { label: 'Competitions', to: '/competitions' },
      { label: 'Mission', to: '/mission' },
      { label: 'Achievements', to: '/achievements' },
    ],
  },
  {
    title: 'GARI',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Team', to: '/team' },
      { label: 'Apply to join', to: '/apply' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Sponsorship', to: '/sponsors' },
      { label: 'Contact', to: '/contact' },
      { label: 'contact@gari.live', href: 'mailto:contact@gari.live' },
    ],
  },
  {
    title: 'Follow',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/gari.gitam' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/gari-gitam' },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value.trim()) return 'Email is required';
    if (!emailRegex.test(value.trim())) return 'Invalid email format';
    if (value.trim().length > 254) return 'Email is too long';
    return '';
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email: email.trim() }),
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
    } catch (err) {
      console.error('Error submitting newsletter:', err);
      setSubmitStatus('error');
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer theme-dark" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo size="small" variant="white" />
            <p className="footer-blurb" itemProp="description">
              GITAM Aerospace Rocketry Initiative — the student rocketry and CanSat team at
              GITAM University, Hyderabad. Competing at the IN-SPACe 2026 National Finals.
            </p>
            <form className="footer-form" onSubmit={handleNewsletterSubmit} aria-label="Newsletter subscription">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                type="email"
                id="footer-email"
                placeholder="Email for launch updates"
                className={error ? 'error' : ''}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                disabled={isSubmitting}
                autoComplete="email"
                required
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
            {error && <p className="footer-msg footer-msg--err" role="alert">{error}</p>}
            {submitStatus === 'success' && <p className="footer-msg" role="status">Subscribed. We'll keep you posted.</p>}
          </div>

          <div className="footer-cols">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.to ? (
                        <Link to={l.to}>{l.label}</Link>
                      ) : (
                        <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{l.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 GARI — GITAM Aerospace Rocketry Initiative.</p>
          <p itemScope itemType="https://schema.org/PostalAddress">
            <a href="https://www.gitam.edu" target="_blank" rel="noopener noreferrer">GITAM University</a>,{' '}
            <span itemProp="addressLocality">Hyderabad</span>, <span itemProp="addressRegion">Telangana</span>,{' '}
            <span itemProp="addressCountry">India</span>
          </p>
          <p>
            Built by{' '}
            <a href="https://bharatchandra.me" target="_blank" rel="me noopener noreferrer">Bodapati Bharat Chandra</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
