import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './AchievementsPage.css';

const AchievementsPage = () => {
  const achievements = [
    {
      year: '2026',
      title: 'IN-SPACe CAN-7USAT Competition',
      description: 'Selected for national CanSat competition',
      status: 'Ongoing',
    },
    {
      year: '2025',
      title: 'Team Formation',
      description: 'GARI officially established at GITAM University',
      status: 'Completed',
    },
  ];

  const sponsors = [
    {
      name: 'Sponsor Name',
      logo: null,
      tier: 'Platinum',
    },
    // Add more sponsors here
  ];

  const competitions = [
    {
      name: 'IN-SPACe CanSat Competition',
      year: '2026',
      category: 'CAN-7USAT',
      description: 'National level student satellite competition',
    },
    {
      name: 'Spaceport America Cup',
      year: 'Future',
      category: 'Target',
      description: 'World\'s largest intercollegiate rocket competition',
    },
  ];

  return (
    <div className="achievements-page">
      <SEO
        title="Achievements"
        description="GARI's competition results, awards, and milestones. From IN-SPACe CAN-7USAT to Spaceport America Cup targets — GITAM's rocketry team is making waves."
        path="/achievements"
      />
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Achievements & Recognition</h1>
            <p className="hero-subtitle">
              Building Excellence Through Competition and Innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{achievement.year}</span>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  <span className={`status ${achievement.status.toLowerCase()}`}>
                    {achievement.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section className="content-section competitions-section">
        <div className="container">
          <h2 className="section-title">Competitions</h2>
          <div className="values-grid">
            {competitions.map((comp, index) => (
              <motion.div
                key={index}
                className="competition-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="comp-header">
                  <span className="comp-year">{comp.year}</span>
                  <span className="comp-category">{comp.category}</span>
                </div>
                <h3>{comp.name}</h3>
                <p>{comp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="content-section sponsors-section">
        <div className="container">
          <h2 className="section-title">Our Sponsors & Partners</h2>
          <p className="section-subtitle">
            We're grateful for the support of organizations that believe in student innovation
          </p>
          
          <div className="sponsor-cta">
            <h3>Become a Sponsor</h3>
            <p>
              Support the next generation of aerospace engineers and innovators.
              Partner with GARI to make an impact.
            </p>
            <a href="/contact" className="btn btn-primary">
              <span>Partner With Us</span>
            </a>
          </div>

          {sponsors.length > 0 && (
            <div className="sponsors-grid">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={index}
                  className="sponsor-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="sponsor-logo">
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} />
                    ) : (
                      <span>{sponsor.name}</span>
                    )}
                  </div>
                  <span className="sponsor-tier">{sponsor.tier}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage;
