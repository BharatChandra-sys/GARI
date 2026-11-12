import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, RevealGroup, RevealItem, ease } from '../components/motion';
import { ClosingCTA, Head, MilestoneTrack, PageHero } from '../components/ui';
import SEO from '../components/common/SEO';
import './CompetitionsPage.css';

const RocketScene = lazy(() => import('../components/3d/RocketScene'));

const Viewer = () => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      setOk(!!(c.getContext('webgl2') || c.getContext('webgl')));
    } catch {
      setOk(false);
    }
  }, []);
  return (
    <div className="viewer theme-dark">
      {ok ? (
        <Suspense fallback={null}>
          <RocketScene mode="inspect" />
        </Suspense>
      ) : (
        <img src="/rocket-cdr.webp" alt="GARI model rocket CDR render" />
      )}
      <span className="viewer-hint t-mono">{ok ? 'DRAG TO ROTATE // CDR GEOMETRY' : 'CDR GEOMETRY'}</span>
    </div>
  );
};

const programs = {
  cansat: {
    key: 'cansat',
    tab: 'CanSat',
    competition: 'IN-SPACe CAN-7USAT 2026',
    status: 'PDR cleared · CDR in progress',
    title: 'A satellite the size of a soda can.',
    intro: [
      "A CanSat is a 330 ml satellite — the diameter of a soda can — that carries a full instrument suite, is released at around 1,000 m and transmits live data as it descends under parachute. Every subsystem has to survive launch loads, work in flight and return usable data to the ground.",
      "Ours tracks its position with NavIC, India's own satellite navigation constellation — one of the few student CanSats in the country to use it instead of GPS. A ground station we wrote ourselves handles live telemetry, mission logging and post-flight analysis.",
    ],
    stats: [
      { value: '330', unit: 'ml', label: 'Form factor' },
      { value: '1,000', unit: 'm', label: 'Release altitude' },
      { value: '8', unit: '', label: 'Subsystems' },
      { value: '2', unit: '', label: 'Parachutes' },
    ],
    profileTitle: 'Mission profile.',
    profile: [
      { t: 'Launch', d: 'Carried aloft inside the launch vehicle.' },
      { t: 'Release', d: 'Deployed at roughly 1,000 m.' },
      { t: 'Drogue', d: 'Stabilises the descent right after release.' },
      { t: 'Main', d: 'Opens at a barometric trigger for a controlled descent.' },
      { t: 'Telemetry', d: 'Live sensor and NavIC packets stream to the ground station.' },
      { t: 'Recovery', d: 'Touchdown, retrieval and post-flight data export.' },
    ],
    timeline: [
      { id: 'c1', code: 'PDR', title: 'Preliminary Design Review', dateLabel: 'Nov 2025', status: 'done', detail: 'Architecture, subsystem definitions and design approach approved.' },
      { id: 'c2', code: 'CDR', title: 'Critical Design Review', dateLabel: '2026', status: 'active', detail: 'Detailed design, manufacturing drawings and test plans in development.' },
      { id: 'c3', code: 'Build', title: 'Build & integration', dateLabel: 'Oct–Nov 2026', status: 'upcoming', detail: 'PCB assembly, firmware integration and system-level testing.' },
      { id: 'c4', code: 'Launch', title: 'National Finals', dateLabel: 'Nov 17–20, 2026', status: 'upcoming', detail: 'Release at 1,000 m and full mission with live telemetry, Kushinagar.' },
    ],
    subsystemsTitle: 'Eight subsystems. Every one has an owner.',
    subsystems: [
      { name: 'Telemetry & Communication', lead: 'Nischal Aditya M · Varshith Pappuri', desc: 'Real-time RF link between CanSat and ground station, sending sensor packets at fixed intervals from launch to landing.' },
      { name: 'Avionics & Flight Software', lead: 'Singam Sai Harshith', desc: 'Flight computer for sensor fusion, state estimation and timed deployment logic. Interrupt-driven firmware written in C.' },
      { name: 'Ground Station Software', lead: 'Bodapati Bharat Chandra', desc: 'Custom GCS for live telemetry visualisation, packet parsing, mission logging and post-flight data export.' },
      { name: 'NavIC GNSS Integration', lead: 'Avionics team', desc: "Positional tracking during descent using India's NavIC constellation instead of GPS." },
      { name: 'Descent & Recovery', lead: 'Hanzel Vergis Thomas', desc: 'Drogue chute for stabilisation, main chute for the final descent, triggered by barometric altitude.' },
      { name: 'Power & Electrical', lead: 'Satya Rishi Chodesetty', desc: 'Battery selection, power budgeting, voltage regulation and harness routing for the full mission envelope.' },
      { name: 'Structures & Mechanical', lead: 'Tanmaay Sharma', desc: '330 ml chassis designed for launch loads and parachute shock — CAD-modelled and stress-tested before fabrication.' },
      { name: 'Sensor & Payload', lead: 'Rohan Jason Bellapu', desc: 'Pressure, temperature, humidity, IMU and altitude sensors, calibrated for accuracy across the mission profile.' },
    ],
  },
  rocket: {
    key: 'rocket',
    tab: 'Rocket',
    competition: 'IN-SPACe Model Rocketry India 2026',
    status: 'CDR cleared · Sept 20, 2026',
    title: 'Built to reach one kilometre.',
    intro: [
      'Our model rocket is designed, built and flown by students to reach a 1 km apogee for the IN-SPACe Model Rocketry India Student Competition 2026. It is full-stack aerospace engineering: propulsion, a composite airframe, stability, custom avionics and dual-event recovery.',
      'A custom flight computer handles data acquisition, apogee detection and parachute sequencing, while a real-time telemetry downlink lets the ground station track the flight from ignition to touchdown.',
    ],
    stats: [
      { value: '1', unit: 'km', label: 'Target apogee' },
      { value: '1,030', unit: 'N', label: 'Peak thrust' },
      { value: '3.5', unit: 's', label: 'Burn time' },
      { value: '2', unit: '', label: 'Recovery events' },
    ],
    motor: [
      ['Motor', 'TIVRA K-560 solid'],
      ['Peak thrust', '1,030 N'],
      ['Total impulse', '1,960 N·s'],
      ['Burn time', '3.5 s'],
      ['Diameter', '94 mm'],
      ['Length', '313 mm'],
      ['Total mass', '3.71 kg'],
      ['Propellant mass', '1.8 kg'],
    ],
    profileTitle: 'Flight profile.',
    profile: [
      { t: 'Ignition', d: 'TIVRA K-560 lights on the pad.' },
      { t: 'Boost', d: '3.5 s burn at up to 1,030 N.' },
      { t: 'Coast', d: 'Unpowered climb toward apogee.' },
      { t: 'Apogee', d: 'Detected on board at ~1 km.' },
      { t: 'Drogue', d: 'First recovery event at apogee.' },
      { t: 'Main', d: 'Second event for a slow, safe landing.' },
    ],
    timeline: [
      { id: 'r1', code: 'Design', title: 'Conceptual design', dateLabel: '2025', status: 'done', detail: 'Mission requirements, design parameters and motor selection completed.' },
      { id: 'r2', code: 'CDR', title: 'Critical Design Review', dateLabel: 'Sept 20, 2026', status: 'done', detail: 'Detailed design, manufacturing approach and integration plan approved by IN-SPACe.' },
      { id: 'r3', code: 'FRR', title: 'Flight Readiness Review', dateLabel: 'Oct 21, 2026', status: 'active', detail: 'Hardware integration, motor procurement and full-system trials. Virtual review.' },
      { id: 'r4', code: 'Launch', title: 'National Finals', dateLabel: 'Nov 17–20, 2026', status: 'upcoming', detail: 'Competition flight to 1 km apogee at Kushinagar, Uttar Pradesh.' },
    ],
    subsystemsTitle: 'Full-stack rocket engineering.',
    subsystems: [
      { name: 'Propulsion', lead: 'Propulsion team', desc: 'Integration of the TIVRA K-560 solid motor — thrust curve analysis, motor mount and retention.' },
      { name: 'Airframe & Structures', lead: 'Structures team', desc: 'Composite airframe in fibreglass and carbon fibre, optimised for drag, strength and the mass budget.' },
      { name: 'Recovery', lead: 'Recovery team', desc: 'Dual-event drogue and main parachutes, separation mechanisms and descent-rate calculations.' },
      { name: 'Avionics & Flight Computer', lead: 'Avionics team', desc: 'Custom flight computer for data acquisition, apogee detection, deployment logic and state estimation.' },
      { name: 'Telemetry & Ground', lead: 'Telemetry team', desc: 'RF downlink for live flight data, with ground software for tracking and visualisation.' },
      { name: 'Payload', lead: 'Payload team', desc: 'Sensors for atmospheric data, on-board video and experimental instrumentation.' },
    ],
  },
};

const ProgramPanel = ({ p }) => (
  <>
    <section className="section theme-dark comp-intro">
      <div className="container comp-intro-grid">
        <Reveal className="comp-intro-copy">
          <span className="eyebrow">{p.competition}</span>
          <h2 className="t-display">{p.title}</h2>
          <span className="chip"><span className={`dot ${p.key === 'rocket' ? 'dot--ok' : 'dot--live'}`} />{p.status}</span>
          {p.intro.map((para) => <p key={para.slice(0, 24)} className="t-body">{para}</p>)}
        </Reveal>
        <RevealGroup className="comp-stats">
          {p.stats.map((s) => (
            <RevealItem key={s.label} className="comp-stat">
              <span className="stat-value">{s.value}<small>{s.unit}</small></span>
              <span className="stat-label">{s.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    {p.key === 'rocket' && (
      <section className="section theme-paper">
        <div className="container comp-motor">
          <Reveal className="comp-viewer-wrap">
            <Viewer />
          </Reveal>
          <Reveal className="comp-render">
            <img src="/rocket-cdr.webp" alt="GARI model rocket — CDR design render showing nose cone, payload bay and fin can" width="1630" height="449" loading="lazy" decoding="async" />
          </Reveal>
          <div className="comp-motor-grid">
            <Head eyebrow="Propulsion" title="TIVRA K-560." lead="A compact solid motor with smooth, sustained thrust — the right balance of size and performance for a 1 km flight." />
            <Reveal>
              <table className="spec-table">
                <tbody>
                  {p.motor.map(([k, v]) => (
                    <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </div>
      </section>
    )}

    <section className="section theme-light">
      <div className="container">
        <Head eyebrow="Sequence" title={p.profileTitle} />
        <RevealGroup as="ol" className="profile">
          {p.profile.map((s, i) => (
            <RevealItem as="li" key={s.t} className="profile-step">
              <span className="t-mono dim">T{i === 0 ? '0' : `+${i}`}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>

    <section className="section theme-paper">
      <div className="container">
        <Head eyebrow="Mission status" title="Where we are in the program." />
        <MilestoneTrack items={p.timeline} />
      </div>
    </section>

    <section className="section theme-light">
      <div className="container">
        <Head eyebrow="Subsystems" title={p.subsystemsTitle} />
        <RevealGroup className="rows">
          {p.subsystems.map((s, i) => (
            <RevealItem key={s.name} className="row">
              <span className="row-index">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="row-title">{s.name}</h3>
                <p className="t-small comp-lead">{s.lead}</p>
              </div>
              <p className="row-body">{s.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  </>
);

const CompetitionsPage = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.hash === '#rocket' ? 'rocket' : 'cansat');

  useEffect(() => {
    if (location.hash === '#rocket' || location.hash === '#cansat') setActive(location.hash.slice(1));
  }, [location.hash]);

  const choose = (key) => {
    setActive(key);
    window.history.replaceState(null, '', `#${key}`);
  };

  return (
    <div className="competitions">
      <SEO
        title="Competitions — GARI CanSat & Rocket Programs | IN-SPACe 2026"
        description="GARI is competing in two IN-SPACe 2026 competitions: CanSat with NavIC GNSS at 1000m altitude, and Model Rocketry targeting 1km apogee (Nov 17-20, Kushinagar, UP). CDR cleared for Rocket, PDR cleared for CanSat. National-level student aerospace programs built at GITAM University Hyderabad."
        path="/competitions"
        keywords="GARI competitions, GARI IN-SPACe 2026, GARI CanSat rocket, IN-SPACe CAN-7USAT 2026, IN-SPACe Model Rocketry India, GITAM aerospace competitions, student CanSat India, student rocketry India, NavIC CanSat competition, hybrid rocket competition India, GARI GITAM competitions, aerospace student competitions 2026, IN-SPACe student programs, CanSat rocket India 2026"
        datePublished="2025-01-01"
        dateModified="2026-10-20"
        breadcrumbs={[{ name: 'Competitions', url: 'https://gari.live/competitions' }]}
        faq={[
          { q: 'What competitions is GARI participating in?', a: 'GARI is competing in two IN-SPACe 2026 national competitions: IN-SPACe CAN-7USAT 2026 (CanSat competition) and IN-SPACe Model Rocketry India Student Competition (1km altitude rocket).' },
          { q: 'What is IN-SPACe?', a: 'IN-SPACe is the Indian National Space Promotion and Authorization Center, the national regulatory body that organizes premier student aerospace competitions in India.' },
          { q: 'What makes GARI\'s CanSat unique?', a: 'GARI\'s CanSat integrates NavIC (India\'s satellite navigation system), real-time RF telemetry, dual parachute recovery, custom ground station software, and has 8 specialized subsystems with PDR cleared.' },
          { q: 'What is GARI\'s rocket program?', a: 'GARI is developing a solid propulsion model rocket targeting 1km apogee for IN-SPACe Model Rocketry India Student Competition 2026, featuring custom avionics, active stability control, and dual-event recovery. CDR cleared Sept 2026.' },
          { q: 'Has GARI cleared PDR?', a: 'Yes. GARI has successfully cleared Preliminary Design Review (PDR) for the CanSat program and Critical Design Review (CDR) for the Rocket program — formal technical milestones confirming mission-ready designs.' },
          { q: 'What is NavIC?', a: 'NavIC (Navigation with Indian Constellation) is India\'s own GPS-equivalent satellite navigation system. GARI uses NavIC in its CanSat for positional tracking, making it one of few student teams in India using NavIC instead of GPS.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ResearchProject',
          name: 'GARI Competitions — CanSat & Rocket Programs',
          description: 'GARI competing in IN-SPACe CAN-7USAT 2026 and Model Rocketry India 2026 (Nov 17-20, Kushinagar). CanSat with NavIC GNSS at 1000m, solid rocket targeting 1km. CDR cleared for Rocket.',
          url: 'https://gari.live/competitions',
          member: { '@id': 'https://gari.live/#organization' },
          keywords: ['CanSat', 'Model Rocketry', 'NavIC', 'IN-SPACe', 'India', 'GITAM', 'competitions', '2026'],
        }}
      />

      <PageHero
        eyebrow="IN-SPACe 2026 National Competitions"
        lines={['Two missions.', 'One launch window.']}
        lead="A CanSat and a model rocket, engineered side by side for the National Finals in Kushinagar, November 17–20, 2026."
      />

      <div className="comp-switch theme-dark">
        <div className="container">
          <div className="segmented" role="tablist" aria-label="Choose a program">
            {Object.values(programs).map((p) => (
              <button
                key={p.key}
                role="tab"
                aria-selected={active === p.key}
                className={active === p.key ? 'is-active' : undefined}
                onClick={() => choose(p.key)}
              >
                {active === p.key && (
                  <motion.span layoutId="seg-pill" className="segmented-pill" transition={{ duration: 0.4, ease: ease.out }} />
                )}
                <span className="segmented-label">{p.tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: ease.inOut }}
        >
          <ProgramPanel p={programs[active]} />
        </motion.div>
      </AnimatePresence>

      <ClosingCTA
        eyebrow="Partner with GARI"
        title="Put your name on the flight."
        lead="Sponsors appear on the rocket airframe, the CanSat and the team at the National Finals."
        primary={{ to: '/sponsors', label: 'Sponsorship tiers' }}
        secondary={{ to: '/team', label: 'Meet the teams' }}
      />
    </div>
  );
};

export default CompetitionsPage;
