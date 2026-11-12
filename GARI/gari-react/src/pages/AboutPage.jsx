import React from 'react';
import { Counter, Reveal, RevealGroup, RevealItem, ParallaxImage } from '../components/motion';
import { ClosingCTA, Head, PageHero, SmartLink } from '../components/ui';
import SEO from '../components/common/SEO';
import './AboutPage.css';

const principles = [
  {
    title: 'Engineer from first principles',
    body: 'Every subsystem — telemetry, recovery, structures — is designed from scratch. We prototype fast, test hard and iterate until it works at altitude.',
  },
  {
    title: 'Test what you fly',
    body: 'Nothing goes on the rail without a bench test behind it. Failures are documented, root-caused and fixed before the next build.',
  },
  {
    title: 'Systems, not silos',
    body: 'Aerospace is a systems discipline. Aerospace, ECE, CSE and mechanical engineers work the same problem, in the same room.',
  },
];

const story = [
  {
    year: '2024',
    title: 'Founded',
    body: 'A core group of aerospace students at GITAM University, Hyderabad, starts GARI to do the work textbooks only describe.',
  },
  {
    year: '2025',
    title: 'First builds',
    body: 'Six prototypes in a year: planetary and rescue rovers, a hexacopter, a fixed-wing aircraft, a line-following bot and a thrust-vectoring gimbal.',
  },
  {
    year: '2026',
    title: 'National stage',
    body: 'Selected for two IN-SPACe competitions. PDR cleared for both programs; rocket CDR cleared on Sept 20. Finals in Kushinagar, Nov 17–20.',
  },
];

const divisions = [
  { name: 'Aerospace & Structures', desc: 'Aerodynamic design, CAD modelling and structural analysis.' },
  { name: 'Avionics & Electronics', desc: 'Flight computers, sensor integration and PCB design.' },
  { name: 'Software & Ground Station', desc: 'Real-time telemetry software, data pipelines and the GCS.' },
  { name: 'Propulsion', desc: 'Motor selection, thrust studies and gimbal control systems.' },
  { name: 'Recovery Systems', desc: 'Dual-parachute deployment and safe descent mechanisms.' },
  { name: 'Media & Outreach', desc: 'Documentation, social presence and sponsor relations.' },
];

const AboutPage = () => (
  <div className="about">
      <SEO
        title="About GARI — GITAM Aerospace Rocketry Initiative | Student Aerospace Team"
        description="About GARI — GITAM University's student aerospace and rocketry team. Founded in 2024 with 30+ multidisciplinary engineers across Aerospace, ECE, CSE and Mechanical. Competing in two IN-SPACe 2026 national competitions: CanSat CAN-7USAT and Model Rocketry India. Building rockets, CanSats, and aerospace systems in Hyderabad, India. PDR cleared for both programs."
        path="/about"
        keywords="about GARI, GARI GITAM, GITAM Aerospace Rocketry Initiative about, GARI aerospace team, GITAM aerospace research, GARI student team, aerospace students GITAM Hyderabad, GARI team India, GARI founded 2024, GARI 30 engineers, GARI aerospace club history, GITAM aerospace club members, who is GARI, what is GITAM aerospace team"
        datePublished="2024-01-01"
        dateModified="2026-10-20"
        breadcrumbs={[{ name: 'About', url: 'https://gari.live/about' }]}
        faq={[
          { q: 'When was GARI founded?', a: 'GARI (GITAM Aerospace Rocketry Initiative) was founded in 2024 at GITAM University, Hyderabad, India.' },
          { q: 'How many members does GARI have?', a: 'GARI has 30+ active student members across Aerospace, ECE, CSE, and Mechanical Engineering at GITAM University, Hyderabad.' },
          { q: 'What divisions does GARI have?', a: 'GARI has six technical divisions: Aerospace & Structures, Avionics & Electronics, Software & Ground Station, Propulsion, Recovery Systems, and Media & Outreach.' },
          { q: 'What has GARI built so far?', a: 'GARI has built six prototype hardware systems including planetary rovers, hexacopters, fixed-wing aircraft, gimbal systems, rescue robots, and is currently developing a CanSat satellite and a model rocket for two IN-SPACe 2026 national competitions.' },
          { q: 'Is GARI open to all GITAM branches?', a: 'Yes. GARI welcomes students from all engineering branches at GITAM University — Aerospace, ECE, CSE, Mechanical, Electrical and more.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': 'https://gari.live/about#webpage',
          url: 'https://gari.live/about',
          name: 'About GARI — GITAM Aerospace Rocketry Initiative',
          description: "GARI is GITAM University's student aerospace and rocketry team built on innovation, collaboration, and research. 30+ engineers, 6 prototype builds, competing in two IN-SPACe 2026 national competitions.",
          isPartOf: { '@id': 'https://gari.live/#website' },
          about: { '@id': 'https://gari.live/#organization' },
          mentions: [
            { '@type': 'Person', 'name': 'Harshith Venkata Naga Pavana Jangala', 'jobTitle': 'Aerospace Engineer', 'worksFor': { '@id': 'https://gari.live/#organization' } },
            { '@type': 'Person', 'name': 'Bodapati Bharat Chandra', 'jobTitle': 'Ground Station & Software Lead', 'worksFor': { '@id': 'https://gari.live/#organization' } },
            { '@type': 'Person', 'name': 'Shaik Aadil Iftikhar', 'jobTitle': 'Rocket Team Lead', 'worksFor': { '@id': 'https://gari.live/#organization' } },
            { '@type': 'Person', 'name': 'Harsha Vardan', 'jobTitle': 'CanSat Team Lead', 'worksFor': { '@id': 'https://gari.live/#organization' } },
          ],
        }}
      />

    <PageHero
      eyebrow="Est. 2024 · GITAM University"
      lines={['A student team', 'that ships hardware.']}
      lead="GARI — the GITAM Aerospace Rocketry Initiative — gives engineering students a serious place to design, build and fly aerospace systems."
    />

    <section className="theme-dark about-visual">
      <div className="container">
        <ParallaxImage
          className="about-visual-img"
          src="/achievements/03_hexa_copter_making/hexa_copter_photo_02.jpeg"
          alt="GARI members assembling the hexacopter on the GITAM field"
        />
      </div>
    </section>

    {/* Story */}
    <section className="section theme-dark">
      <div className="container about-intro">
        <Reveal>
          <span className="eyebrow">Who we are</span>
        </Reveal>
        <Reveal className="about-intro-copy">
          <p className="t-h2">
            Not simulations. Not textbooks. Actual prototypes, actual launches, actual telemetry.
          </p>
          <p className="t-body">
            We compete at the national level in two IN-SPACe 2026 competitions: the CAN-7USAT CanSat
            program, with NavIC GNSS and real-time telemetry, and the Model Rocketry India Student
            Competition, targeting a 1 km apogee. Alongside them we have built rovers, multirotors,
            a fixed-wing aircraft and a thrust-vectoring gimbal — all documented in our archive.
          </p>
          <div className="actions">
            <SmartLink to="/team" className="link">Meet the team</SmartLink>
            <SmartLink to="/achievements" className="link">See our past work</SmartLink>
          </div>
        </Reveal>
      </div>

      <div className="container">
        <RevealGroup className="stats about-stats">
          <RevealItem className="stat">
            <span className="stat-value"><Counter to={30} /><small>+</small></span>
            <span className="stat-label">Active engineers</span>
          </RevealItem>
          <RevealItem className="stat">
            <span className="stat-value"><Counter to={6} /></span>
            <span className="stat-label">Technical divisions</span>
          </RevealItem>
          <RevealItem className="stat">
            <span className="stat-value"><Counter to={6} /></span>
            <span className="stat-label">Prototypes built</span>
          </RevealItem>
          <RevealItem className="stat">
            <span className="stat-value"><Counter to={2} /></span>
            <span className="stat-label">National competitions in 2026</span>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>

    {/* Principles */}
    <section className="section theme-light">
      <div className="container">
        <Head eyebrow="What drives us" title="Three principles." />
        <RevealGroup className="rows">
          {principles.map((p, i) => (
            <RevealItem key={p.title} className="row">
              <span className="row-index">0{i + 1}</span>
              <h3 className="row-title">{p.title}</h3>
              <p className="row-body">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    {/* Timeline */}
    <section className="section theme-paper">
      <div className="container">
        <Head eyebrow="Our story" title="Zero to national finals in under two years." />
        <RevealGroup className="story">
          {story.map((s) => (
            <RevealItem key={s.year} className="story-item">
              <span className="story-year">{s.year}</span>
              <h3 className="t-h3">{s.title}</h3>
              <p className="t-body">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    {/* Divisions */}
    <section className="section theme-light">
      <div className="container">
        <Head
          eyebrow="Structure"
          title="Six divisions. One mission."
          lead="Every subsystem has an owner. This is how GARI is organised."
        />
        <RevealGroup className="grid-list">
          {divisions.map((d) => (
            <RevealItem key={d.name}>
              <h3>{d.name}</h3>
              <p>{d.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    <ClosingCTA
      eyebrow="Partner with us"
      title="Invest in India's next aerospace engineers."
      lead="We're looking for sponsors, industry partners and mentors who want to see students fly real hardware."
      primary={{ to: '/sponsors', label: 'Sponsorship tiers' }}
      secondary={{ to: '/contact', label: 'Get in touch' }}
    />
  </div>
);

export default AboutPage;
