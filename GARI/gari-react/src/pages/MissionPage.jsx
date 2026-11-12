import React from 'react';
import { Reveal, RevealGroup, RevealItem, ScrollText } from '../components/motion';
import { ClosingCTA, Head, PageHero } from '../components/ui';
import SEO from '../components/common/SEO';
import './MissionPage.css';

const pillars = [
  {
    title: 'Build it ourselves',
    body: "We don't buy off the shelf and call it done. Avionics, recovery and the ground station are designed, built and tested by students. The goal is engineering judgment, not assembly.",
  },
  {
    title: 'Cross the boundaries',
    body: 'Real missions are multidisciplinary. We put aerospace, ECE, CSE and mechanical engineers on the same subsystem so they learn to work across disciplines.',
  },
  {
    title: 'Learn from every failure',
    body: 'Every prototype is a learning instrument. Failures are documented, root-caused and fixed. That loop is how we grow — and how aerospace engineering works.',
  },
  {
    title: 'Compete to stay honest',
    body: 'IN-SPACe CAN-7USAT and Model Rocketry India give us hard deadlines and external reviewers. Things have to work under pressure, not just on paper.',
  },
  {
    title: 'Graduate ready',
    body: "India needs aerospace engineers. GARI members leave having shipped flight hardware, ready to contribute on day one at ISRO, IN-SPACe or a launch startup.",
  },
  {
    title: 'Choose the hard problem',
    body: 'NavIC GNSS integration, real-time telemetry, thrust-vector control. The harder the problem, the more the team learns.',
  },
];

const roadmap = [
  {
    term: '2026',
    title: 'Fly both missions',
    items: [
      'Compete in IN-SPACe CAN-7USAT 2026 and Model Rocketry India 2026',
      'Fly the CanSat with NavIC GNSS and dual-parachute recovery',
      'Reach a 1 km apogee and recover the rocket intact',
      'Run the full mission from our own ground station software',
      'Publish a public technical portfolio of every subsystem',
    ],
  },
  {
    term: '2027',
    title: 'Go higher',
    items: [
      'Design and launch a low-power sounding rocket',
      'Work toward Spaceport America Cup qualification',
      'Grow to 50+ members across GITAM campuses',
      'Formalise industry partnerships and mentorship',
    ],
  },
  {
    term: 'Beyond',
    title: 'Build the pipeline',
    items: [
      "Become one of India's most competitive student aerospace teams",
      'Release open-source aerospace tooling other institutions can use',
      'Send GITAM graduates into ISRO, IN-SPACe and aerospace startups',
      'Sustain a culture of engineering excellence at GITAM',
    ],
  },
];

const MissionPage = () => (
  <div className="mission">
      <SEO
        title="Mission — GARI GITAM Aerospace Rocketry Initiative | Student Aerospace Goals"
        description="GARI's mission: advancing aerospace engineering through hands-on rocketry, CanSat competitions, and student-led research at GITAM University Hyderabad. Building India's next generation of aerospace engineers through real hardware, national competitions, and multidisciplinary teamwork."
        path="/mission"
        keywords="GARI mission, GARI GITAM, GITAM Aerospace Rocketry Initiative mission, GARI aerospace goals, aerospace innovation GITAM India, student rocketry mission India, GARI rocketry research, GARI vision, GARI roadmap, GARI aerospace India, GITAM aerospace mission 2026, why GARI, GARI innovation pillars, aerospace education India"
        datePublished="2024-01-01"
        dateModified="2026-10-20"
        breadcrumbs={[{ name: 'Mission', url: 'https://gari.live/mission' }]}
        faq={[
          { q: 'What is GARI\'s mission?', a: 'GARI\'s mission is to create a platform where GITAM students design, build, and fly aerospace systems — competing at the national level and building real skills for India\'s next generation of aerospace engineers.' },
          { q: "What are GARI's goals for 2026?", a: "GARI's 2026 goals include competing in both IN-SPACe CAN-7USAT 2026 and IN-SPACe Model Rocketry India Student Competition 2026, completing CanSat with NavIC GNSS, launching a model rocket to 1km apogee, and deploying real-time ground station software." },
          { q: "What is GARI's long-term vision?", a: "GARI aims to become one of India's most competitive student aerospace teams, contribute open-source aerospace tooling, and enable GITAM graduates to enter ISRO, IN-SPACe, and aerospace startups with hands-on engineering experience." },
          { q: 'Why does GARI participate in competitions?', a: 'External competitions like IN-SPACe CAN-7USAT and Model Rocketry India give GARI hard deadlines and technical requirements, pushing the team to build systems that actually work under pressure — the best way to develop real engineering judgment.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://gari.live/mission#webpage',
          url: 'https://gari.live/mission',
          name: 'Mission — GARI Aerospace Rocketry Initiative',
          description:
            'GARI mission: inspire innovation, collaborative research, and impactful aerospace technologies through practical engineering at GITAM University.',
          isPartOf: { '@id': 'https://gari.live/#website' },
          about: { '@id': 'https://gari.live/#organization' },
        }}
      />

    <PageHero
      eyebrow="Our mission"
      lines={['Engineers who ship,', 'not just study.']}
      lead="We exist so GITAM students can design, build and fly aerospace systems before they graduate."
    />

    <section className="section theme-light">
      <div className="container">
        <span className="eyebrow">Mission statement</span>
        <ScrollText
          as="blockquote"
          className="t-display mission-quote"
          text="To create a platform where GITAM students design, build and fly aerospace systems — competing at the national level and laying the foundation for India's next generation of aerospace engineers."
        />
        <Reveal className="mission-note">
          <p className="t-lead">
            That sentence filters every decision. If a project doesn't teach someone to ship something
            real, we don't build it. If a competition doesn't push us technically, we don't enter it.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="section theme-paper">
      <div className="container">
        <Head eyebrow="Six pillars" title="What we stand for." />
        <RevealGroup className="grid-list grid-list--2 pillars">
          {pillars.map((p, i) => (
            <RevealItem key={p.title}>
              <span className="row-index">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    <section className="section theme-dark">
      <div className="container">
        <Head eyebrow="Roadmap" title="Where we're headed." lead="Concrete goals, by time horizon." />
        <RevealGroup className="roadmap">
          {roadmap.map((r) => (
            <RevealItem key={r.term} className="roadmap-col">
              <span className="roadmap-term">{r.term}</span>
              <h3 className="t-h3">{r.title}</h3>
              <ul>
                {r.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    <ClosingCTA
      theme="light"
      eyebrow="Aligned with us?"
      title="Build what's next with GARI."
      lead="Sponsors, research partners and students who want to fly real hardware — we'd love to hear from you."
      primary={{ to: '/contact', label: 'Get in touch' }}
      secondary={{ to: '/competitions', label: 'See our competition programs' }}
    />
  </div>
);

export default MissionPage;
