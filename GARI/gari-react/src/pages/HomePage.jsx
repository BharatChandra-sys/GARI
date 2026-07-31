import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import AnimatedStats from '../components/sections/AnimatedStats';
import Sponsors from '../components/sections/Sponsors';
import MissionTracker from '../components/sections/MissionTracker';
import CanSatFeature from '../components/sections/CanSatFeature';
import LatestUpdates from '../components/sections/LatestUpdates';
import JoinGARI from '../components/sections/JoinGARI';
import SEO from '../components/common/SEO';
import './HomePage.css';
import './HomePageMobile.css';

const HomePage = () => {
  return (
    <>
      <SEO
        title="GARI — GITAM Aerospace Rocketry Initiative | Student Rocket Team India"
        description="GARI (GITAM Aerospace Rocketry Initiative) is GITAM University's student-led aerospace and rocketry team in Hyderabad. Competing in IN-SPACe CAN-7USAT 2026, building sounding rockets, and advancing student aerospace engineering in India. Join India's most serious student rocket team."
        path="/"
        keywords="GARI, GARI GITAM, GARI aerospace, GARI rocket team, GITAM Aerospace Rocketry Initiative, GITAM aerospace rocketry, GITAM rocketry team, student rocketry India, aerospace club GITAM, CanSat team India, IN-SPACe 2026, GARI Hyderabad, GARI GITAM University, student satellite India, aerospace engineering GITAM Hyderabad, IN-SPACe CAN-7USAT 2026, NavIC CanSat team, GARI student team 2026, best aerospace team GITAM, GITAM aerospace club 2026"
        datePublished="2024-01-01"
        dateModified="2026-07-01"
        faq={[
          { q: 'What is GARI?', a: 'GARI (GITAM Aerospace Rocketry Initiative) is a student-led aerospace and rocketry team at GITAM University, Hyderabad, India, competing in IN-SPACe CAN-7USAT 2026 — India\'s national student CanSat competition.' },
          { q: 'How can I join GARI?', a: 'GARI recruits students from GITAM University. Apply at gari.live/apply or contact us at contact@gari.live for membership information.' },
          { q: 'How can companies sponsor GARI?', a: 'Companies can sponsor GARI through Title, Platinum, Gold, or Silver tiers. Visit gari.live/sponsors or email contact@gari.live.' },
          { q: 'What competitions does GARI participate in?', a: 'GARI competes in IN-SPACe CAN-7USAT 2026, India\'s national CanSat competition, and targets Spaceport America Cup for future rocketry competitions.' },
          { q: 'Where is GARI located?', a: 'GARI is based at GITAM University, Hyderabad campus, Rudraram, Patancheru, Telangana 502329, India.' },
          { q: 'What is GARI\'s CanSat?', a: 'GARI\'s CanSat is a 330ml student satellite competing in IN-SPACe CAN-7USAT 2026, featuring NavIC GNSS integration, real-time telemetry, and dual parachute recovery — one of the few student CanSats using NavIC in India.' },
          { q: 'Has GARI cleared PDR?', a: 'Yes. GARI has successfully cleared the Preliminary Design Review (PDR) for both the CanSat and Rocket programs, a formal technical milestone confirming mission-ready architecture.' },
          { q: 'Who leads GARI?', a: 'GARI is led by Harsha Vardan (CanSat Team Lead) and Shaik Aadil Iftikhar (Rocket Team Lead), with Harshith Venkata Naga Pavana Jangala as Aerospace Engineer and Bodapati Bharat Chandra as Ground Station & Software Lead.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': 'https://gari.live/#organization',
          'name': 'GARI — GITAM Aerospace Rocketry Initiative',
          'alternateName': ['GARI', 'GARI GITAM', 'GITAM Aerospace', 'GITAM Rocketry', 'GITAM Aerospace Rocketry Initiative', 'GARI rocket team', 'GARI space team'],
          'url': 'https://gari.live',
          'logo': 'https://gari.live/gari-logo.png',
          'foundingDate': '2024',
          'numberOfEmployees': { '@type': 'QuantitativeValue', 'value': 30 },
          'award': 'IN-SPACe CAN-7USAT 2026 National Selection',
          'description': 'GARI is a student-driven aerospace and rocketry initiative at GITAM University, Hyderabad. Competing in IN-SPACe CAN-7USAT 2026 national CanSat competition and developing sounding rockets.',
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
      <div className="home-page">
        <Hero />

        {/* Mission Status Tracker — biggest trust signal for sponsors and judges */}
        <MissionTracker />

        {/* CanSat Feature — deep dive without leaving the homepage */}
        <CanSatFeature />

        {/* Latest Updates / News feed */}
        <LatestUpdates />

        {/* Quick Overview — past prototype builds */}
        <section className="overview-section">
          <div className="container">
            <div className="overview-grid">
              <Link to="/achievements/rover-for-extraterrestrial-planets" className="overview-card">
                <div className="card-image">
                  <img 
                    src="/achievements/01_rover_for_extraterrestrial_planets/rover_extraterrestrial_photo_01.jpeg" 
                    alt="GARI rover prototype for extraterrestrial planet exploration"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                </div>
                <h3>Rover for Extraterrestrial Planets</h3>
                <p>Planetary rover prototype with chassis, wiring, and motion-testing documentation</p>
              </Link>
              <Link to="/achievements/hexa-copter-making" className="overview-card">
                <div className="card-image">
                  <img 
                    src="/achievements/03_hexa_copter_making/hexa_copter_photo_01.jpeg" 
                    alt="GARI hexa copter build — frame, motors and electronics assembly"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                </div>
                <h3>Hexa Copter Making</h3>
                <p>Multirotor build covering frame assembly, propulsion, and electronics integration</p>
              </Link>
              <Link to="/achievements/fixed-wing-aircraft-model" className="overview-card">
                <div className="card-image">
                  <img 
                    src="/achievements/06_fixed_wing_aircraft_model/fixed_wing_aircraft_photo_11.jpeg" 
                    alt="GARI fixed-wing aircraft model — structure and flight prototype"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                </div>
                <h3>Fixed-Wing Aircraft Model</h3>
                <p>Full fixed-wing prototype with structure, electronics placement, and test setup</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Animated Stats */}
        <AnimatedStats />

        {/* Join GARI — student recruitment CTA */}
        <JoinGARI />

        {/* Sponsors Section */}
        <Sponsors />
      </div>
    </>
  );
};

export default HomePage;
