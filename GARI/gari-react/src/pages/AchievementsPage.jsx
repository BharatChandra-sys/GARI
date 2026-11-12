import React from 'react';
import { Link } from 'react-router-dom';
import { RevealGroup, RevealItem } from '../components/motion';
import { ClosingCTA, Head, PageHero } from '../components/ui';
import { competitions, projectArchives, projectStats } from '../data/achievementsData';
import SEO from '../components/common/SEO';
import './AchievementsPage.css';

const thumb = (p) => (p.heroMedia.type === 'video' ? p.heroMedia.poster : p.heroMedia.src);

const AchievementsPage = () => (
  <div className="achievements">
      <SEO
        title="Achievements & Past Works — GARI GITAM Aerospace | Student Rocket Projects Archive"
        description="GARI achievements and past works: national CanSat selection (IN-SPACe 2026), PDR cleared, rover systems, thrust vector control, rescue robotics, aerial systems, fixed-wing prototypes. Complete technical documentation and media archive from GITAM Aerospace Rocketry Initiative student projects."
        keywords="GARI achievements, GARI GITAM past works, GARI aerospace projects, GITAM Aerospace Rocketry archive, GARI student projects India, IN-SPACe CanSat GARI, GARI competition 2026, GITAM rocketry achievements, GARI PDR cleared, GARI rover project, GARI hexacopter, GARI gimbal system, GARI fixed wing aircraft, GARI thrust control, GARI rescue robot, student aerospace projects India, GITAM aerospace portfolio"
        datePublished="2024-01-01"
        dateModified="2026-10-20"
        breadcrumbs={[{ name: 'Achievements', url: 'https://gari.live/achievements' }]}
        faq={[
          { q: 'What has GARI achieved?', a: 'GARI has been nationally selected for two IN-SPACe 2026 competitions, cleared PDR for both CanSat and Rocket programs, cleared CDR for Rocket program (Sept 20, 2026), and built 6+ hardware prototypes including rovers, hexacopter, fixed-wing aircraft, gimbal systems, and rescue robots.' },
          { q: 'Has GARI cleared PDR and CDR?', a: 'Yes. GARI has successfully cleared PDR (Preliminary Design Review) for both CanSat and Rocket programs, and CDR (Critical Design Review) for the Rocket program on Sept 20, 2026 — formal technical milestones confirming approved designs.' },
          { q: 'What competitions has GARI participated in?', a: 'GARI is competing in two IN-SPACe 2026 national competitions: CAN-7USAT (CanSat) and Model Rocketry India Student Competition (1km altitude rocket).' },
          { q: 'How many projects has GARI completed?', a: 'GARI has completed 6 major prototype builds: Rover for Extraterrestrial Planets, 2-Axis Gimbal Rocket Thrust Control, Hexacopter, Rescue Robot, Autonomous Line-Following Bot, and Fixed-Wing Aircraft Model.' },
          { q: 'Where can I see GARI\'s past work?', a: 'All GARI past works are documented with photos, videos, and technical summaries at gari.live/achievements — the complete project archive for sponsors and recruiters.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'GARI Project Archive — GITAM Aerospace Rocketry Initiative',
          description: 'Photos, videos, CAD work, and prototype documentation from GARI aerospace projects at GITAM University Hyderabad',
          url: 'https://gari.live/achievements',
          numberOfItems: 6,
          itemListElement: projectArchives.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              name: project.title,
              description: project.summary,
              url: `https://gari.live/achievements/${project.slug}`,
              creator: { '@id': 'https://gari.live/#organization' },
              keywords: ['GARI', 'GITAM', 'aerospace', 'student project', project.category],
            },
          })),
        }}
      />

    <PageHero
      eyebrow="Achievements"
      lines={['Proof,', 'not promises.']}
      lead="Design reviews cleared, a national finals berth and six documented prototypes — the record behind the team."
    >
      <a href="#archive" className="btn btn--primary">View the archive</a>
      <Link to="/contact" className="link">Talk to GARI</Link>
    </PageHero>

    <section className="section--tight theme-dark">
      <div className="container">
        <RevealGroup className="stats ach-stats">
          {projectStats.map((m) => (
            <RevealItem key={m.label} className="stat">
              <span className="stat-value">{m.value}</span>
              <span className="stat-label">{m.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    <section className="section theme-light">
      <div className="container">
        <Head eyebrow="Competition record" title="The record so far." />
        <RevealGroup as="ol" className="record">
          {competitions.map((c) => (
            <RevealItem as="li" key={c.name} className="record-row">
              <span className="record-year">
                {c.year}
                {c.date && <span className="dim"> · {c.date}</span>}
              </span>
              <div className="record-main">
                <h3>{c.name}</h3>
                <p>{c.description}</p>
              </div>
              <span className="record-cat">{c.category}</span>
              <span className={`chip record-chip record-chip--${c.result.toLowerCase()}`}>
                <span className={`dot${c.result === 'Target' ? '' : ' dot--ok'}`} />{c.result}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    <section id="archive" className="section theme-paper">
      <div className="container">
        <Head
          eyebrow="Past works"
          title="Six builds. All documented."
          lead="Open any project for its full case study — every photo and test video from the build."
        />
        <RevealGroup className="archive">
          {projectArchives.map((p, i) => (
            <RevealItem key={p.slug} className={i === 0 ? 'archive-item archive-item--wide' : 'archive-item'}>
              <Link to={`/achievements/${p.slug}`} className="archive-card" aria-label={`Open ${p.title}`}>
                <div className="media archive-media">
                  <img src={thumb(p)} alt={p.title} loading="lazy" decoding="async" />
                </div>
                <div className="archive-body">
                  <span className="eyebrow">{p.category} · {p.mediaSummary}</span>
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="t-small">{p.summary}</p>
                  <span className="link">Open case study</span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    <ClosingCTA
      eyebrow="Sponsors & partners"
      title="Back a team that ships."
      lead="We built this archive for organisations that want proof, not promises. Founding sponsorships are open."
      primary={{ to: '/sponsors', label: 'Become a sponsor' }}
      secondary={{ to: '/contact', label: 'Get in touch' }}
    />
  </div>
);

export default AchievementsPage;
