import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import StatusStrip from '../components/home/StatusStrip';
import Propulsion from '../components/home/Propulsion';
import Process from '../components/home/Process';
import { ParallaxImage, Reveal, RevealGroup, RevealItem, ScrollText } from '../components/motion';
import { projectArchives } from '../data/achievementsData';
import SEO from '../components/common/SEO';
import './HomePage.css';

// Figures match the Competitions page, which is the reviewed source.
const vehicles = [
  {
    name: 'Model rocket',
    status: 'CDR cleared · Sept 20, 2026',
    lead: 'A solid-motor rocket with a composite airframe, built to reach a one-kilometre apogee and come home on two parachutes.',
    specs: [
      ['Target apogee', '1 km'],
      ['Airframe', 'Fibreglass + carbon fibre'],
      ['Recovery', 'Drogue at apogee, then main'],
      ['Competition', 'IN-SPACe Model Rocketry India'],
    ],
    to: '/competitions#rocket',
    cta: 'Rocket breakdown',
  },
  {
    name: 'CanSat',
    status: 'PDR cleared · CDR in progress',
    lead: "A satellite the size of a soft-drink can, released at altitude and tracked on the way down by NavIC, India's own navigation constellation.",
    specs: [
      ['Form factor', '330 ml'],
      ['Release altitude', '1,000 m'],
      ['Navigation', 'NavIC GNSS'],
      ['Subsystems', '8'],
      ['Competition', 'IN-SPACe CAN-7USAT'],
    ],
    to: '/competitions',
    cta: 'CanSat breakdown',
  },
];

const HomePage = () => {
  return (
    <>
      <SEO
        title="GARI — GITAM Aerospace Rocketry Initiative | Student Rocket Team India"
        description="GARI (GITAM Aerospace Rocketry Initiative) is GITAM University's student-led aerospace and rocketry team in Hyderabad. Competing in two IN-SPACe 2026 national competitions — CAN-7USAT CanSat and Model Rocketry India (Nov 17-20, Kushinagar). CDR cleared for Rocket, PDR cleared for CanSat. Join India's most serious student aerospace team."
        path="/"
        keywords="GARI, GARI GITAM, GARI aerospace, GARI rocket team, GITAM Aerospace Rocketry Initiative, GITAM aerospace rocketry, GITAM rocketry team, student rocketry India, aerospace club GITAM, CanSat team India, IN-SPACe 2026, GARI Hyderabad, GARI GITAM University, student satellite India, aerospace engineering GITAM Hyderabad, IN-SPACe CAN-7USAT 2026, IN-SPACe Model Rocketry India, NavIC CanSat team, GARI student team 2026, best aerospace team GITAM, GITAM aerospace club 2026, student rocket team India 2026, model rocketry GITAM"
        datePublished="2024-01-01"
        dateModified="2026-10-20"
        faq={[
          { q: 'What is GARI?', a: 'GARI (GITAM Aerospace Rocketry Initiative) is a student-led aerospace and rocketry team at GITAM University, Hyderabad, India, competing in two IN-SPACe 2026 national competitions: CAN-7USAT (CanSat) and Model Rocketry India Student Competition.' },
          { q: 'How can I join GARI?', a: 'GARI recruits students from GITAM University. Apply at gari.live/apply or contact us at contact@gari.live for membership information.' },
          { q: 'How can companies sponsor GARI?', a: 'Companies can sponsor GARI through Title, Platinum, Gold, or Silver tiers. Visit gari.live/sponsors or email contact@gari.live.' },
          { q: 'What competitions does GARI participate in?', a: 'GARI competes in two IN-SPACe 2026 national competitions: IN-SPACe CAN-7USAT 2026 (CanSat) and IN-SPACe Model Rocketry India Student Competition (1km altitude rocket).' },
          { q: 'Where is GARI located?', a: 'GARI is based at GITAM University, Hyderabad campus, Rudraram, Patancheru, Telangana 502329, India.' },
          { q: "What is GARI's CanSat?", a: "GARI's CanSat is a 330ml student satellite competing in IN-SPACe CAN-7USAT 2026, featuring NavIC GNSS integration, real-time telemetry, and dual parachute recovery — one of the few student CanSats using NavIC in India." },
          { q: "What is GARI's Rocket program?", a: "GARI is developing a solid propulsion model rocket targeting 1km apogee for IN-SPACe Model Rocketry India Student Competition 2026, with custom avionics, active stability control, and dual-event recovery. CDR cleared Sept 2026, competition finals Nov 17-20 at Kushinagar." },
          { q: 'Has GARI cleared PDR?', a: 'Yes. GARI has cleared PDR for the CanSat program and CDR (Critical Design Review) for the Rocket program, confirming mission-ready designs for both IN-SPACe 2026 competitions.' },
          { q: 'Who leads GARI?', a: 'GARI is led by Harsha Vardan (CanSat Team Lead) and Shaik Aadil Iftikhar (Rocket Team Lead), with Harshith Venkata Naga Pavana Jangala as Aerospace Engineer and Bodapati Bharat Chandra as Ground Station & Software Lead.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': 'https://gari.live/#organization',
          'name': 'GARI — GITAM Aerospace Rocketry Initiative',
          'alternateName': ['GARI', 'GARI GITAM', 'GITAM Aerospace', 'GITAM Rocketry', 'GITAM Aerospace Rocketry Initiative', 'GARI rocket team', 'GARI space team'],
          'url': 'https://gari.live',
          'logo': 'https://gari.live/gari-logo-new.png',
          'foundingDate': '2024',
          'numberOfEmployees': { '@type': 'QuantitativeValue', 'value': 30 },
          'award': 'IN-SPACe CAN-7USAT 2026 National Selection',
          'description': 'GARI is a student-driven aerospace and rocketry initiative at GITAM University, Hyderabad. Competing in two IN-SPACe 2026 national competitions: CAN-7USAT (CanSat) and Model Rocketry India Student Competition (Nov 17-20, Kushinagar).',
          'foundingLocation': {
            '@type': 'Place',
            'name': 'GITAM University, Hyderabad',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Rudraram, Patancheru',
              'addressLocality': 'Hyderabad',
              'addressRegion': 'Telangana',
              'postalCode': '502329',
              'addressCountry': 'IN',
            },
          },
          'parentOrganization': {
            '@type': 'CollegeOrUniversity',
            'name': 'GITAM University',
            'url': 'https://www.gitam.edu',
            'sameAs': 'https://en.wikipedia.org/wiki/GITAM_University',
          },
          'sameAs': [
            'https://www.instagram.com/gari.gitam',
            'https://www.linkedin.com/company/gari-gitam',
          ],
        }}
      />
      <div className="home">
        <Hero />
        <StatusStrip />

        {/* Statement */}
        <section className="section theme-light statement-sec">
          <div className="container">
            <span className="eyebrow">Who we are</span>
            <ScrollText
              as="p"
              className="t-display statement"
              text="Thirty students at GITAM University, building a rocket and a satellite from the first sketch to the recovery chute, and flying them at India's national finals."
            />
          </div>
        </section>

        <Propulsion />

        {/* Vehicles */}
        <section className="section theme-light vehicles" aria-labelledby="vehicles-title">
          <div className="container vehicles-grid">
            <div className="vehicles-aside">
              <ParallaxImage
                src="/media/launch-day.webp"
                alt="A sounding rocket climbing on a column of smoke into a deep blue sky"
                className="vehicles-photo"
              />
              <p className="credit">Reference photo: student-payload sounding rocket, NASA Wallops Flight Facility</p>
            </div>
            <div className="vehicles-main">
              <Reveal className="head">
                <span className="eyebrow">Two vehicles, one launch window</span>
                <h2 id="vehicles-title" className="t-display">A rocket, and the <em>satellite</em> beside it.</h2>
              </Reveal>
              {vehicles.map((v, i) => (
                <Reveal key={v.name} className="vehicle">
                  <div className="vehicle-head">
                    <span className="vehicle-n">{i + 1}</span>
                    <div>
                      <h3 className="t-h1">{v.name}</h3>
                      <p className="vehicle-status"><i className="dot dot--ok" aria-hidden="true" />{v.status}</p>
                    </div>
                  </div>
                  <p className="t-lead">{v.lead}</p>
                  <table className="spec-table">
                    <tbody>
                      {v.specs.map(([k, val]) => (
                        <tr key={k}><th scope="row">{k}</th><td>{val}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  <Link to={v.to} className="link">{v.cta}</Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Process />

        {/* Archive: an index, not a gallery */}
        <section className="section theme-dark archive" aria-labelledby="archive-title">
          <div className="container">
            <Reveal className="head">
              <span className="eyebrow">Before the big one</span>
              <h2 id="archive-title" className="t-display">Six builds that <em>taught us how.</em></h2>
            </Reveal>
            <RevealGroup as="ol" className="index" stagger={0.05}>
              {projectArchives.map((p, i) => (
                <RevealItem as="li" key={p.slug}>
                  <Link to={`/achievements/${p.slug}`} className="index-row">
                    <span className="index-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="index-title">{p.title}</span>
                    <span className="index-cat">{p.category}</span>
                    <span className="index-year">{p.year}</span>
                    <span className="index-go" aria-hidden="true">→</span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
            <Link to="/achievements" className="link archive-all">Open the full archive</Link>
          </div>
        </section>

        {/* Closing */}
        <section className="closing theme-dark" aria-label="Join or sponsor GARI">
          <ParallaxImage src="/media/launch-night.webp" alt="" className="closing-bg" />
          <div className="closing-shade" aria-hidden="true" />
          <div className="container closing-inner">
            <Reveal>
              <h2 className="t-hero">The next one<br />needs <em>you.</em></h2>
            </Reveal>
            <div className="closing-doors">
              <Link to="/apply" className="door">
                <span className="door-kicker">Students</span>
                <span className="door-title">Join the build</span>
                <span className="door-body">Open to every branch at GITAM University, Hyderabad. First-years welcome.</span>
                <span className="door-go" aria-hidden="true">→</span>
              </Link>
              <Link to="/sponsors" className="door">
                <span className="door-kicker">Companies</span>
                <span className="door-title">Sponsor the launch</span>
                <span className="door-body">Founding partnerships are open for the 2026 season: on the rocket, the CanSat and the team.</span>
                <span className="door-go" aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="credit">Reference photo: sounding rocket night launch, NASA Wallops Flight Facility</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
