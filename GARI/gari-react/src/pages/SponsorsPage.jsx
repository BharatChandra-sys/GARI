import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealItem } from '../components/motion';
import { Head, PageHero } from '../components/ui';
import SEO from '../components/common/SEO';
import './SponsorsPage.css';

const tiers = [
  {
    name: 'Title',
    role: 'Primary partner',
    benefits: [
      'Logo on all competition hardware — CanSat and rocket',
      'Featured placement on the website homepage',
      'Named in all press releases and media coverage',
      'Acknowledged at both IN-SPACe competition events',
      'Dedicated sponsor spotlight on social media',
      'Access to full technical documentation and reports',
    ],
    featured: true,
  },
  {
    name: 'Platinum',
    role: 'Major partner',
    benefits: [
      'Logo on the CanSat chassis, rocket airframe and team uniforms',
      'Prominent placement on the sponsors page',
      'Social media feature post',
      'Acknowledged at competition events',
      'Access to the mission summary report',
    ],
  },
  {
    name: 'Gold',
    role: 'Supporting partner',
    benefits: [
      'Logo on team uniforms',
      'Listed on the sponsors page',
      'Social media mention',
      'Acknowledged in team communications',
    ],
  },
  {
    name: 'Silver',
    role: 'Community partner',
    benefits: [
      'Listed on the sponsors page',
      'Acknowledged in the team newsletter',
      'Social media recognition post',
    ],
  },
];

const reasons = [
  { title: 'Two national competitions', body: 'IN-SPACe CAN-7USAT (CanSat with NavIC GNSS) and Model Rocketry India (1 km rocket) — both run by the Indian National Space Promotion and Authorization Center.' },
  { title: 'Reviewed and approved', body: 'PDR cleared for both programs and CDR cleared for the rocket on Sept 20, 2026. Formal milestones, not marketing.' },
  { title: '30+ future hires', body: 'Your brand in front of engineers across aerospace, ECE, CSE and mechanical — the people the aerospace and tech industry will hire next.' },
  { title: 'A documented portfolio', body: 'Six prototype builds on record: rovers, a hexacopter, a fixed-wing aircraft and a gimbal system. We ship hardware.' },
  { title: 'The GITAM platform', body: "Reach across GITAM University, Hyderabad — one of India's leading engineering institutions, with a large student and alumni network." },
  { title: 'Get in early', body: 'Founding partners get the most prominent placement and a long-term association with a team that will compete nationally for years.' },
];

const SponsorsPage = () => (
  <div className="sponsors">
      <SEO
        title="Sponsors — Partner with GARI Aerospace GITAM | Sponsor India's Next Rocket Engineers"
        description="Sponsor GARI — GITAM University's student aerospace and rocketry team competing in two IN-SPACe 2026 national competitions. PDR cleared for both CanSat and Rocket. Your brand alongside India's next-generation aerospace engineers. Title, Platinum, Gold, Silver sponsorship tiers available."
        path="/sponsors"
        keywords="sponsor GARI, GARI sponsorship, GARI GITAM sponsor, GITAM Aerospace Rocketry sponsor, GARI aerospace India sponsor, student rocket team sponsor India, IN-SPACe CanSat sponsor, aerospace education sponsor India, GARI title sponsor, GARI platinum sponsor, GARI partner India, sponsor student rocketry India, aerospace sponsorship India, GITAM student team sponsor, GARI 2026 sponsor"
        datePublished="2024-01-01"
        dateModified="2026-10-20"
        breadcrumbs={[{ name: 'Sponsors', url: 'https://gari.live/sponsors' }]}
        faq={[
          { q: 'Why sponsor GARI?', a: "Sponsoring GARI gives your brand visibility among 30+ top engineering students at GITAM University, direct association with two IN-SPACe 2026 national competitions (CanSat and Rocket), and contribution to next-generation aerospace engineering development in India." },
          { q: 'What sponsorship tiers does GARI offer?', a: 'GARI offers Title, Platinum, Gold, and Silver sponsorship tiers. Benefits include logo placement on hardware and uniforms, website features, social media coverage, and acknowledgment at competition events.' },
          { q: 'How do I become a GARI sponsor?', a: 'Contact GARI at contact@gari.live or fill the form at gari.live/contact. Our team will reply within 48 hours with a full sponsorship brochure and proposal.' },
          { q: 'What is the reach of GARI sponsorship?', a: 'GARI sponsorship reaches GITAM University\'s 30,000+ student network, national aerospace competition audiences, and growing social media following across Instagram and LinkedIn.' },
          { q: 'Is GARI a serious aerospace team?', a: 'Yes. GARI has cleared PDR for both CanSat and Rocket programs, built 6 hardware prototypes, and is nationally selected for two IN-SPACe 2026 competitions — formal government-run aerospace competitions.' },
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

    <PageHero
      eyebrow="Sponsorship"
      lines={['Your logo.', 'On the pad.']}
      lead="Back the next generation of Indian aerospace engineers — and fly with them at the IN-SPACe National Finals, Nov 17–20, 2026."
    >
      <Link to="/contact" className="btn btn--primary">Become a sponsor</Link>
      <a href="#tiers" className="link">See the tiers</a>
    </PageHero>

    <section className="section theme-light">
      <div className="container">
        <Head eyebrow="Why GARI" title="What you're backing." lead="A technically serious team with a competition record, real hardware and a growing national profile." />
        <RevealGroup className="grid-list">
          {reasons.map((r, i) => (
            <RevealItem key={r.title}>
              <span className="row-index">0{i + 1}</span>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    <section id="tiers" className="section theme-paper">
      <div className="container">
        <Head eyebrow="Tiers" title="Sponsorship packages." lead="Every tier includes logo rights and attribution. Ask for the full brochure with exact specifications." />
        <RevealGroup className="tiers">
          {tiers.map((t) => (
            <RevealItem key={t.name} className={`tier${t.featured ? ' tier--featured theme-dark' : ''}`}>
              <span className="eyebrow">{t.role}</span>
              <h3 className="t-h2">{t.name}</h3>
              <ul>
                {t.benefits.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <Link to="/contact" className={`btn ${t.featured ? 'btn--primary' : 'btn--solid'} tier-cta`}>Get in touch</Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    <section className="section theme-light">
      <div className="container">
        <Reveal className="tile founding">
          <span className="eyebrow eyebrow--accent">Current sponsors</span>
          <h2 className="t-h1">This space is reserved for our first partner.</h2>
          <p className="t-lead">
            We're seeking founding sponsors for the 2026 competition season. Be the first organisation
            to partner with GARI and take the most prominent placement available.
          </p>
          <div className="actions">
            <Link to="/contact" className="btn btn--solid">Become a founding sponsor</Link>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="section theme-dark">
      <div className="container cta">
        <Reveal>
          <span className="eyebrow eyebrow--accent">Ready to partner?</span>
          <h2 className="t-display">Help us reach apogee.</h2>
          <p className="t-lead">Send us a message. We'll reply within 48 hours with the brochure, a team overview and a proposal for your organisation.</p>
          <div className="actions">
            <Link to="/contact" className="btn btn--primary">Contact GARI</Link>
            <a href="mailto:contact@gari.live" className="link">contact@gari.live</a>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);

export default SponsorsPage;
