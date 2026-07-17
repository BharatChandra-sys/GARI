import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './ContactPage.css';

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
    <div className="contact-page">
      <SEO
        title="Contact GARI — Sponsorship & Collaboration"
        description="Contact GARI for sponsorship, collaboration, media, or membership. Reach GITAM Aerospace Rocketry Initiative at GITAM University, Hyderabad. Email: gari@gitam.edu"
        path="/contact"
        keywords="contact GARI, GARI sponsorship enquiry, GITAM aerospace contact, aerospace collaboration India, gari@gitam.edu"
        breadcrumbs={[{ name: 'Contact', url: 'https://gari.live/contact' }]}
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
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Contact Us</h1>
            <p className="hero-subtitle">
              Let's Build The Future Together
            </p>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="contact-content">

            {/* 1. Form first */}
            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2>Send us a message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    required
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    required
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'error' : ''}
                    required
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    required
                  ></textarea>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {errors.general && (
                  <div className="status-message error-message">
                    {errors.general}
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="status-message success-message">
                    ✓ Thank you for your message! We will get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && !errors.general && (
                  <div className="status-message error-message">
                    ✗ Failed to send message. Please try again or email us directly at contact@gari.live
                  </div>
                )}
              </form>
            </motion.div>

            {/* 2. Contact info cards */}
            <div className="contact-info-grid">
              <motion.div
                className="info-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3>Email</h3>
                <p>contact@gari.live</p>
              </motion.div>

              <motion.div
                className="info-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3>Instagram</h3>
                <p>@gari.live</p>
              </motion.div>

              <motion.div
                className="info-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3>Location</h3>
                <p>GITAM University, Hyderabad</p>
              </motion.div>
            </div>

            {/* 3. GITAM map */}
            <motion.div
              className="contact-map"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3>Find us</h3>
              <iframe
                title="GITAM University Hyderabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5!2d78.1609!3d17.5510!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc9f2e1b7b%3A0x8f5a6b2c3d4e5f6a!2sGITAM+University+Hyderabad!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                width="100%"
                height="360"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
