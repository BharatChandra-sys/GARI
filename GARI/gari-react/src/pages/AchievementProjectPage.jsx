import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import { LineReveal, Reveal, RevealGroup, RevealItem, ease } from '../components/motion';
import { projectArchives } from '../data/achievementsData';
import './AchievementProjectPage.css';

const Lightbox = ({ items, index, onClose, onStep }) => {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={item.src}
          className="lightbox-figure"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: ease.out }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'video' ? (
            <video src={item.src} poster={item.poster} controls autoPlay playsInline />
          ) : (
            <img src={item.src} alt={item.label} />
          )}
          <figcaption className="t-mono">{item.label} · {index + 1} / {items.length}</figcaption>
        </motion.figure>
      </AnimatePresence>
      <button className="lb-btn lb-close" onClick={onClose} aria-label="Close">×</button>
      {items.length > 1 && (
        <>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); onStep(-1); }} aria-label="Previous">‹</button>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); onStep(1); }} aria-label="Next">›</button>
        </>
      )}
    </motion.div>
  );
};

const AchievementProjectPage = () => {
  const { slug } = useParams();
  const index = projectArchives.findIndex((entry) => entry.slug === slug);
  const project = projectArchives[index];
  const [open, setOpen] = useState(null);

  const step = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + project.media.length) % project.media.length)),
    [project]
  );
  const close = useCallback(() => setOpen(null), []);

  if (!project) {
    return (
      <div className="project theme-dark">
        <SEO
          title="Project not found"
          description="The requested GARI project archive could not be found."
          path={`/achievements/${slug}`}
        />
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow eyebrow--accent">404</span>
            <h1 className="t-display">That project doesn't exist.</h1>
            <p className="t-lead">The archive may have moved or the link may be outdated.</p>
            <div className="actions">
              <Link to="/achievements" className="btn btn--primary">Back to the archive</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const hero = project.heroMedia;
  const next = projectArchives[(index + 1) % projectArchives.length];

  return (
    <div className="project">
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

      <section className="page-hero theme-dark project-hero">
        <div className="container">
          <Reveal y={8}>
            <Link to="/achievements" className="link project-back">Archive</Link>
          </Reveal>
          <Reveal y={12}>
            <span className="eyebrow eyebrow--accent">{project.year} · {project.category}</span>
          </Reveal>
          <LineReveal as="h1" className="t-display" lines={[project.title]} />
          <Reveal delay={0.2}>
            <p className="t-lead">{project.summary}</p>
          </Reveal>
        </div>
      </section>

      <section className="theme-dark project-media-section">
        <div className="container">
          <Reveal className="project-hero-media">
            {hero.type === 'video' ? (
              <video src={hero.src} poster={hero.poster} controls playsInline preload="metadata" />
            ) : (
              <img src={hero.src} alt={project.title} decoding="async" />
            )}
          </Reveal>
        </div>
      </section>

      <section className="section theme-dark">
        <div className="container project-overview">
          <Reveal>
            <span className="eyebrow">Overview</span>
          </Reveal>
          <Reveal className="project-overview-copy">
            <p className="t-h3">{project.about}</p>
            <dl className="project-facts">
              <div><dt>Program area</dt><dd>{project.category}</dd></div>
              <div><dt>Year</dt><dd>{project.year}</dd></div>
              <div><dt>Archive</dt><dd>{project.mediaSummary}</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="project-gallery" className="section theme-light">
        <div className="container">
          <Reveal className="head">
            <span className="eyebrow">Gallery</span>
            <h2 className="t-h1">Every photo and test from the build.</h2>
          </Reveal>
          <RevealGroup className="gallery">
            {project.media.map((item, i) => (
              <RevealItem key={item.src}>
                <button className="gallery-item" onClick={() => setOpen(i)} aria-label={`Open ${item.label}`}>
                  <div className="media gallery-media">
                    <img src={item.type === 'video' ? item.poster : item.src} alt={item.label} loading="lazy" decoding="async" />
                    {item.type === 'video' && <span className="gallery-play" aria-hidden="true">▶</span>}
                  </div>
                  <span className="t-mono dim">{item.label}</span>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section theme-paper">
        <div className="container">
          <Link to={`/achievements/${next.slug}`} className="project-next">
            <span className="eyebrow">Next project</span>
            <span className="t-display">{next.title}</span>
            <span className="link">Open case study</span>
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && <Lightbox items={project.media} index={open} onClose={close} onStep={step} />}
      </AnimatePresence>
    </div>
  );
};

export default AchievementProjectPage;
