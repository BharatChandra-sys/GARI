import React, { useState } from 'react';
import { Reveal, RevealGroup, RevealItem } from '../components/motion';
import { PageHero } from '../components/ui';
import SEO from '../components/common/SEO';
import './ContactPage.css';

const channels = [
  { label: 'Sponsorship & partnerships', value: 'contact@gari.live', href: 'mailto:contact@gari.live?subject=Sponsorship' },
  { label: 'Students who want to join', value: 'Apply online', href: '/apply' },
  { label: 'Instagram', value: '@gari.gitam', href: 'https://instagram.com/gari.gitam' },
  { label: 'LinkedIn', value: 'GARI GITAM', href: 'https://linkedin.com/company/gari-gitam' },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name is too long (max 100 characters)';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name contains invalid characters';
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
    } else if (formData.email.trim().length > 254) {
      newErrors.email = 'Email is too long';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = 'Subject is too long (max 200 characters)';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 5000) {
      newErrors.message = 'Message is too long (max 5000 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setTimeout(() => setSubmitStatus(null), 5000); // Clear success message after 5s
      } else {
        console.error('Error sending email:', data);
        setSubmitStatus('error');
        if (data.error) {
          setErrors({ general: data.error });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <SEO
        title="Contact GARI — Sponsorship, Collaboration & Membership"
        description="Contact GARI — GITAM Aerospace Rocketry Initiative for sponsorship, collaboration, media inquiries, or student membership. Based at GITAM University Hyderabad. Email: contact@gari.live. Reply within 48 hours."
        path="/contact"
        keywords="contact GARI, GARI sponsorship enquiry, GITAM aerospace contact, aerospace collaboration India, contact GARI GITAM, GARI email, GARI contact form, contact aerospace team India, GITAM rocketry contact, GARI partnership inquiry, GARI media contact, gari.live contact"
        datePublished="2024-01-01"
        dateModified="2026-10-20"
        breadcrumbs={[{ name: 'Contact', url: 'https://gari.live/contact' }]}
        faq={[
          { q: 'How can I contact GARI?', a: 'Email GARI at contact@gari.live or fill the contact form at gari.live/contact. The team replies within 48 hours.' },
          { q: 'Where is GARI located?', a: 'GARI is based at GITAM University, Hyderabad campus, Rudraram, Patancheru, Telangana 502329, India.' },
          { q: 'How can I sponsor GARI?', a: 'Fill the contact form at gari.live/contact or email contact@gari.live with your company name and sponsorship interest. GARI will send a full brochure within 48 hours.' },
          { q: 'How can I collaborate with GARI?', a: 'GARI is open to industry partnerships, research collaborations, mentorship, and component/equipment sponsorships. Contact us at contact@gari.live.' },
          { q: 'How can a student join GARI?', a: 'GITAM University students can apply at gari.live/apply. Applications are reviewed on a rolling basis.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': 'https://gari.live/contact#webpage',
          'url': 'https://gari.live/contact',
          'name': 'Contact GARI — GITAM Aerospace Rocketry Initiative',
          'description': 'Contact GARI for sponsorship, collaboration, or membership at GITAM University, Hyderabad.',
          'isPartOf': { '@id': 'https://gari.live/#website' },
          'about': {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://gari.live/#organization',
            'contactPoint': {
              '@type': 'ContactPoint',
              'contactType': 'general inquiries',
              'email': 'gari@gitam.edu',
              'url': 'https://gari.live/contact',
              'availableLanguage': 'English',
            },
          },
        }}
      />

      <PageHero
        eyebrow="Contact"
        lines={["Let's talk."]}
        size="hero"
        lead="Sponsorship, collaboration, media or membership — we reply within 48 hours."
      />

      <section className="section theme-paper">
        <div className="container contact-grid">
          <div className="contact-side">
            <RevealGroup as="ul" className="channels">
              {channels.map((c) => (
                <RevealItem as="li" key={c.label}>
                  <span className="t-small">{c.label}</span>
                  <a
                    href={c.href}
                    className="channel-link"
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {c.value}
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="contact-address">
              <span className="eyebrow">Find us</span>
              <address>
                GITAM University, Hyderabad campus<br />
                Rudraram, Patancheru<br />
                Telangana 502329, India
              </address>
            </Reveal>
          </div>

          <Reveal className="contact-card theme-light">
            <h2 className="t-h2">Send a message.</h2>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : undefined} autoComplete="name" required />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : undefined} autoComplete="email" required />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={errors.subject ? 'error' : undefined} placeholder="Sponsorship, collaboration, media…" required />
                {errors.subject && <span className="field-error">{errors.subject}</span>}
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className={errors.message ? 'error' : undefined} required />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn--primary contact-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
              {errors.general && <div className="notice notice--err">{errors.general}</div>}
              {submitStatus === 'success' && (
                <div className="notice notice--ok" role="status">Thanks — your message is on its way. We'll get back to you soon.</div>
              )}
              {submitStatus === 'error' && !errors.general && (
                <div className="notice notice--err">Failed to send. Try again or email contact@gari.live directly.</div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="theme-paper contact-map-section">
        <div className="container">
          <Reveal className="contact-map">
            <iframe
              title="GITAM University Hyderabad on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.1609!3d17.5510!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc9f2e1b7b%3A0x8f5a6b2c3d4e5f6a!2sGITAM+University+Hyderabad!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
              width="100%"
              height="420"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
