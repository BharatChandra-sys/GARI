import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import { projectArchives } from '../data/achievementsData';
import './AchievementProjectPage.css';

const AchievementProjectPage = () => {
  const { slug } = useParams();
  const project = projectArchives.find((entry) => entry.slug === slug);

  if (!project) {
    return (
      <div className="project-page project-page--empty">
        <SEO
          title="Project not found"
          description="The requested GARI project archive could not be found."
          path={`/achievements/${slug}`}
        />
        <div className="container project-page-empty-state">
          <h1>That project page does not exist.</h1>
          <p>
            The archive may have been moved or the link may be outdated.
          </p>
          <Link to="/achievements" className="btn btn-primary">
            <span>Back to achievements</span>
          </Link>
        </div>
      </div>
    );
  }

  const featuredMedia = project.heroMedia;

  return (
    <div className="project-page">
      <SEO
        title={`${project.title} | GARI Project Archive`}
        description={project.about}
        path={`/achievements/${project.slug}`}
        keywords={`GARI, ${project.title}, aerospace project archive, photos, videos`}
        breadcrumbs={[
          { name: 'Achievements', url: 'https://gari.live/achievements' },
          { name: project.title, url: `https://gari.live/achievements/${project.slug}` },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.summary,
          url: `https://gari.live/achievements/${project.slug}`,
          genre: project.category,
        }}
      />

      <section className="project-hero">
        <div className="container project-hero-grid">
          <motion.div
            className="project-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Link to="/achievements" className="back-link">
              ← Back to archive
            </Link>
            <p className="project-meta-line">{project.year} / {project.category}</p>
            <h1>{project.title}</h1>
            <p className="project-summary">{project.summary}</p>
            <p className="project-about">{project.about}</p>
            <div className="project-actions">
              <a href="/contact" className="btn btn-primary">
                <span>Discuss this work</span>
              </a>
              <a href="#project-gallery" className="btn btn-secondary">
                <span>Jump to gallery</span>
              </a>
            </div>
            <div className="project-facts">
              <div>
                <strong>{project.mediaSummary}</strong>
                <span>Archive content</span>
              </div>
              <div>
                <strong>{project.category}</strong>
                <span>Program area</span>
              </div>
              <div>
                <strong>{project.year}</strong>
                <span>Archive year</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="project-hero-media"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {featuredMedia.type === 'video' ? (
              <video src={featuredMedia.src} poster={featuredMedia.poster} controls preload="metadata" />
            ) : (
              <img src={featuredMedia.src} alt={project.title} loading="lazy" decoding="async" />
            )}
          </motion.div>
        </div>
      </section>

      <section id="project-gallery" className="project-gallery-section">
        <div className="container">
          <div className="section-heading">
            <h2>Full media set</h2>
            <p>
              Every file in the project folder is displayed below so the page reads like a proper portfolio case study.
            </p>
          </div>

          <div className="project-gallery-grid">
            {project.media.map((item) => (
              <motion.figure
                key={item.label}
                className="project-gallery-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                {item.type === 'video' ? (
                  <video src={item.src} poster={item.poster} controls preload="metadata" />
                ) : (
                  <img src={item.src} alt={item.label} loading="lazy" decoding="async" />
                )}
                <figcaption>
                  <span>{item.label}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AchievementProjectPage;
