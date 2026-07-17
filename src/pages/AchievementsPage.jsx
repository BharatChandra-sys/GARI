import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './AchievementsPage.css';
import { competitions, featuredProject, projectArchives, projectStats } from '../data/achievementsData';

const AchievementsPage = () => {
  const sponsors = [];

  return (
    <div className="achievements-page">
      <SEO
        title="Achievements, Past Works & Media Archive"
        description="GARI achievements and past works: national CanSat selection, rover systems, thrust control studies, rescue robotics, aerial systems, and fixed-wing prototypes with real photos and videos."
        keywords="GARI achievements, past works, aerospace media archive, student rocketry India, IN-SPACe CanSat results, GITAM rocketry awards, CanSat competition 2026"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'GARI Project Archive',
          description: 'Photos, videos, CAD work, and prototype documentation from GARI aerospace projects',
          url: 'https://gari.live/achievements',
          itemListElement: projectArchives.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              name: project.title,
              description: project.summary,
              url: `https://gari.live/achievements#${project.slug}`,
            },
          })),
        }}
      />

      <section className="page-hero">
        <div className="container">
          <div className="hero-layout">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Engineering proof that stands up in a boardroom.</h1>
              <p className="hero-subtitle">
                A curated archive of GARI&apos;s competition milestones, prototype builds, and media assets designed to show serious technical depth to sponsors, partners, and recruiters.
              </p>
              <div className="hero-actions">
                <a href="/contact" className="btn btn-primary">
                  <span>Talk to GARI</span>
                </a>
                <a href="#archive" className="btn btn-secondary">
                  <span>View project archive</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="hero-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="hero-card-image">
                {featuredProject.heroMedia.type === 'video' ? (
                  <video
                    src={featuredProject.heroMedia.src}
                    poster={featuredProject.heroMedia.poster}
                    controls
                    preload="metadata"
                  />
                ) : (
                  <img src={featuredProject.heroMedia.src} alt={featuredProject.title} loading="lazy" decoding="async" />
                )}
              </div>
              <div className="hero-card-body">
                <h2>{featuredProject.title}</h2>
                <p>{featuredProject.about}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="content-section metrics-section">
        <div className="container">
          <div className="metrics-grid">
            {projectStats.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section competitions-section">
        <div className="container">
          <h2 className="section-title">Competitions and target programs</h2>
          <p className="section-subtitle section-subtitle--wide">
            This is the mix we are building toward: national competition readiness now, with larger aerospace programs in sight.
          </p>
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

      <section id="archive" className="content-section archive-section">
        <div className="container">
          <h2 className="section-title">Past Works Archive</h2>
          <p className="section-subtitle section-subtitle--wide">
            Click any project to open the full folder, read the project summary, and inspect the photos and videos in detail.
          </p>

          <div className="archive-grid">
            {projectArchives.map((project, index) => (
              <motion.article
                key={project.slug}
                className="archive-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link to={`/achievements/${project.slug}`} className="archive-card-button" aria-label={`Open ${project.title}`}>
                  <div className="archive-media">
                    {project.heroMedia.type === 'video' ? (
                      <div className="archive-preview archive-preview--video">
                        <img src={project.heroMedia.poster} alt={project.title} loading="lazy" decoding="async" />
                      </div>
                    ) : (
                      <img src={project.heroMedia.src} alt={project.title} loading="lazy" decoding="async" />
                    )}
                  </div>
                  <div className="archive-body">
                    <div className="archive-meta">
                      <span>{project.year}</span>
                      <span>{project.category}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="archive-footer">
                      <span>{project.mediaSummary}</span>
                      <span>Open case study</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section sponsors-section">
        <div className="container">
          <h2 className="section-title">Our Sponsors & Partners</h2>
          <p className="section-subtitle">
            We are building this archive for organizations that want proof, not promises. If you want to back a team that ships work, this is the place to start.
          </p>

          <div className="sponsor-cta">
            <h3>Become a Sponsor</h3>
            <p>
              Support the next generation of aerospace engineers and innovators. Partner with GARI to make an impact.
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
