import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './SponsorsPage.css';

const SponsorsPage = () => {
  const tiers = [
    {
      name: 'Title Sponsor',
      price: 'Primary Partner',
      benefits: [
        'Logo on all competition hardware and launch vehicle',
        'Featured placement on website homepage',
        'Named in all press releases and media coverage',
        'Team acknowledgment at IN-SPACe CAN-7USAT 2026 launch',
        'Dedicated sponsor spotlight on social media',
        'Access to full technical documentation and reports',
      ],
    },
    {
      name: 'Platinum Sponsor',
      price: 'Major Partner',
      benefits: [
        'Logo on CanSat chassis and team uniforms',
        'Prominent placement on website sponsors page',
        'Social media feature post',
        'Acknowledgment at competition events',
        'Access to mission summary report',
      ],
    },
    {
      name: 'Gold Sponsor',
      price: 'Supporting Partner',
      benefits: [
        'Logo on team uniforms',
        'Listed on website sponsors page',
        'Social media mention',
        'Acknowledgment in team communications',
      ],
    },
    {
      name: 'Silver Sponsor',
      price: 'Community Partner',
      benefits: [
        'Listed on website sponsors page',
        'Acknowledged in team newsletter',
        'Social media recognition post',
      ],
    },
  ];

  const whyGARI = [
    {
      title: 'National competition',
      desc: 'GARI competes in IN-SPACe CAN-7USAT 2026 — India\'s national student CanSat competition organized by the Indian National Space Promotion and Authorization Center.',
    },
    {
      title: 'PDR cleared — both programs',
      desc: 'GARI has cleared Preliminary Design Review for both the CanSat and Rocket programs. This is a formal technical milestone, not a participation badge.',
    },
    {
      title: '30+ engineering students',
      desc: 'Your brand gets visibility with 30+ active engineers across aerospace, ECE, CSE, and mechanical disciplines — future hires for the aerospace and tech industry.',
    },
    {
      title: 'Documented portfolio',
      desc: 'Six prototype builds on record: rovers, hexacopter, fixed-wing aircraft, gimbal systems. GARI ships hardware, not slide decks.',
    },
    {
      title: 'GITAM University platform',
      desc: 'Reach extends across GITAM University, Hyderabad — one of India\'s leading engineering institutions with a large student and alumni network.',
    },
    {
      title: 'Early partnership opportunity',
      desc: 'GARI is growing fast. Getting in early means prominent placement and a long-term association with a team that will be competing nationally for years.',
    },
  ];

  return (
    <div className="sponsors-page">
      <SEO
        title="Sponsors — Partner with GARI Aerospace GITAM"
        description="Sponsor GARI — GITAM University's student aerospace and rocketry team. PDR cleared for CanSat and Rocket. Partner with India's next-generation aerospace engineers at GITAM. Title, Platinum, Gold, Silver tiers."
        path="/sponsors"
        keywords="sponsor GARI, GARI sponsorship, GARI GITAM sponsor, GITAM Aerospace Rocketry sponsor, GARI aerospace India sponsor, student rocket team sponsor India, IN-SPACe CanSat sponsor, aerospace education sponsor India"
        breadcrumbs={[{ name: 'Sponsors', url: 'https://gari.live/sponsors' }]}
        faq={[
          { q: 'Why sponsor GARI?', a: "Sponsoring GARI gives your brand visibility among top engineering students, association with India's national CanSat competition, and contribution to next-generation aerospace development." },
          { q: 'What sponsorship tiers does GARI offer?', a: 'GARI offers Title, Platinum, Gold, and Silver sponsorship tiers with different benefits including logo placement, social media features, and team acknowledgment.' },
          { q: 'How do I become a GARI sponsor?', a: 'Contact GARI at contact@gari.live or visit gari.live/contact. Our team will respond within 48 hours with a detailed sponsorship brochure.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://gari.live/sponsors#webpage',
          url: 'https://gari.live/sponsors',
          name: 'Sponsors — GARI GITAM Aerospace Rocketry',
          description: "Partner with GARI — sponsor India's next-generation student aerospace engineers at GITAM University.",
          isPartOf: { '@id': 'https://gari.live/#website' },
          about: { '@id': 'https://gari.live/#organization' },
        }}
      />

      {/* Hero */}
      <section className="page-hero sponsors-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="sponsors-tag">SPONSORSHIP</span>
            <h1>Partner With GARI</h1>
            <p className="hero-subtitle">
              Back the next generation of Indian aerospace engineers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why GARI */}
      <section className="content-section">
        <div className="container">
          <div className="sponsors-section-header">
            <span className="sponsors-label">WHY GARI</span>
            <h2>What you are backing</h2>
            <p className="sponsors-section-desc">
              We are a technically serious team with a competition record, real hardware,
              and a growing national profile.
            </p>
          </div>
          <div className="why-grid">
            {whyGARI.map((item, i) => (
              <motion.div
                key={i}
                className="why-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="content-section sponsors-alt-bg">
        <div className="container">
          <div className="sponsors-section-header">
            <span className="sponsors-label">TIERS</span>
            <h2>Sponsorship packages</h2>
            <p className="sponsors-section-desc">
              All tiers include logo rights and attribution. Contact us for a full
              sponsorship brochure with exact specifications.
            </p>
          </div>
          <div className="tiers-grid">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                className={`tier-card tier-card--${tier.name.toLowerCase().split(' ')[0]}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="tier-header">
                  <span className="tier-name">{tier.name}</span>
                  <span className="tier-price">{tier.price}</span>
                </div>
                <ul className="tier-benefits">
                  {tier.benefits.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                <a href="/contact" className="tier-cta">Get in touch</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Sponsors */}
      <section className="content-section">
        <div className="container">
          <div className="sponsors-section-header">
            <span className="sponsors-label">CURRENT SPONSORS</span>
            <h2>Our sponsors and partners</h2>
          </div>
          <motion.div
            className="no-sponsors-state"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p>
              We are actively seeking our founding sponsors for the 2026 competition
              season. Be the first organization to partner with GARI and get the most
              prominent placement available.
            </p>
            <a href="/contact" className="sponsors-contact-btn">Become a founding sponsor</a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section sponsors-alt-bg">
        <div className="container">
          <motion.div
            className="sponsors-cta-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to partner?</h2>
            <p>
              Send us a message and we will reply within 48 hours with a full
              sponsorship brochure, team overview, and proposal tailored to your
              organisation.
            </p>
            <div className="sponsors-cta-buttons">
              <a href="/contact" className="scta-btn-primary">Contact GARI</a>
              <a href="/achievements" className="scta-btn-secondary">See our work</a>
            </div>
            <p className="sponsors-email">
              Or email directly: <a href="mailto:contact@gari.live">contact@gari.live</a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SponsorsPage;
