import React from 'react';
import { motion } from 'framer-motion';
import './SponsorsPage.css';

const SponsorsPage = () => {
  const sponsors = {
    title: [
      {
        name: 'GITAM University',
        logo: 'https://via.placeholder.com/300x150/1e40af/ffffff?text=GITAM+University',
        tier: 'Title Sponsor',
        description: 'Our primary institutional partner supporting aerospace innovation'
      }
    ],
    platinum: [
      {
        name: 'Aerospace Corp',
        logo: 'https://via.placeholder.com/250x120/3b82f6/ffffff?text=Aerospace+Corp',
        tier: 'Platinum Sponsor'
      },
      {
        name: 'Tech Industries',
        logo: 'https://via.placeholder.com/250x120/3b82f6/ffffff?text=Tech+Industries',
        tier: 'Platinum Sponsor'
      }
    ],
    gold: [
      {
        name: 'Innovation Labs',
        logo: 'https://via.placeholder.com/200x100/60a5fa/ffffff?text=Innovation+Labs',
        tier: 'Gold Sponsor'
      },
      {
        name: 'Space Systems',
        logo: 'https://via.placeholder.com/200x100/60a5fa/ffffff?text=Space+Systems',
        tier: 'Gold Sponsor'
      },
      {
        name: 'Engineering Co',
        logo: 'https://via.placeholder.com/200x100/60a5fa/ffffff?text=Engineering+Co',
        tier: 'Gold Sponsor'
      }
    ],
    silver: [
      {
        name: 'Tech Solutions',
        logo: 'https://via.placeholder.com/180x90/94a3b8/ffffff?text=Tech+Solutions',
        tier: 'Silver Sponsor'
      },
      {
        name: 'Digital Systems',
        logo: 'https://via.placeholder.com/180x90/94a3b8/ffffff?text=Digital+Systems',
        tier: 'Silver Sponsor'
      },
      {
        name: 'Smart Tech',
        logo: 'https://via.placeholder.com/180x90/94a3b8/ffffff?text=Smart+Tech',
        tier: 'Silver Sponsor'
      },
      {
        name: 'Future Labs',
        logo: 'https://via.placeholder.com/180x90/94a3b8/ffffff?text=Future+Labs',
        tier: 'Silver Sponsor'
      }
    ]
  };

  return (
    <div className="sponsors-page">
      {/* Hero Section */}
      <section className="sponsors-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="sponsors-hero-content"
          >
            <h1>Our Sponsors</h1>
            <p>
              We are grateful to our sponsors who make our aerospace rocketry and innovation possible.
              Their support enables us to push the boundaries of technology and engineering excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Title Sponsor */}
      <section className="sponsor-tier title-tier">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Title Sponsor
          </motion.h2>
          <div className="sponsors-grid title-grid">
            {sponsors.title.map((sponsor, index) => (
              <motion.div
                key={index}
                className="sponsor-card title-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="sponsor-logo">
                  <img src={sponsor.logo} alt={sponsor.name} />
                </div>
                <h3>{sponsor.name}</h3>
                <p className="sponsor-tier-badge">{sponsor.tier}</p>
                <p className="sponsor-description">{sponsor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platinum Sponsors */}
      <section className="sponsor-tier platinum-tier">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Platinum Sponsors
          </motion.h2>
          <div className="sponsors-grid platinum-grid">
            {sponsors.platinum.map((sponsor, index) => (
              <motion.div
                key={index}
                className="sponsor-card platinum-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="sponsor-logo">
                  <img src={sponsor.logo} alt={sponsor.name} />
                </div>
                <h3>{sponsor.name}</h3>
                <p className="sponsor-tier-badge">{sponsor.tier}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Sponsors */}
      <section className="sponsor-tier gold-tier">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Gold Sponsors
          </motion.h2>
          <div className="sponsors-grid gold-grid">
            {sponsors.gold.map((sponsor, index) => (
              <motion.div
                key={index}
                className="sponsor-card gold-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="sponsor-logo">
                  <img src={sponsor.logo} alt={sponsor.name} />
                </div>
                <h3>{sponsor.name}</h3>
                <p className="sponsor-tier-badge">{sponsor.tier}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Silver Sponsors */}
      <section className="sponsor-tier silver-tier">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Silver Sponsors
          </motion.h2>
          <div className="sponsors-grid silver-grid">
            {sponsors.silver.map((sponsor, index) => (
              <motion.div
                key={index}
                className="sponsor-card silver-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="sponsor-logo">
                  <img src={sponsor.logo} alt={sponsor.name} />
                </div>
                <h3>{sponsor.name}</h3>
                <p className="sponsor-tier-badge">{sponsor.tier}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="sponsor-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Become a Sponsor</h2>
            <p>
              Join us in shaping the future of aerospace innovation. Partner with GARI to support
              student-driven rocketry and engineering excellence.
            </p>
            <a href="/contact" className="cta-button">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SponsorsPage;
