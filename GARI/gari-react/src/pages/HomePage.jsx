import React from 'react';
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
        title="GARI — GITAM Aerospace Rocketry Initiative"
        description="GARI (GITAM Aerospace Rocketry Initiative) is GITAM University's student-led aerospace and rocketry team in Hyderabad. Competing in IN-SPACe CAN-7USAT 2026, building sounding rockets, and advancing student aerospace engineering in India."
        path="/"
        keywords="GARI, GARI GITAM, GARI aerospace, GARI rocket team, GITAM Aerospace Rocketry Initiative, GITAM aerospace rocketry, GITAM rocketry team, student rocketry India, aerospace club GITAM, CanSat team India, IN-SPACe 2026, GARI Hyderabad, GARI GITAM University"
        faq={[
          { q: 'What is GARI?', a: 'GARI (GITAM Aerospace Rocketry Initiative) is a student-led aerospace and rocketry team at GITAM University, Hyderabad, India, competing in IN-SPACe CAN-7USAT 2026.' },
          { q: 'How can I join GARI?', a: 'GARI recruits students from GITAM University. Contact us at gari@gitam.edu or visit gari.live/contact for membership information.' },
          { q: 'How can companies sponsor GARI?', a: 'Companies can sponsor GARI through Title, Platinum, Gold, or Silver tiers. Visit gari.live/sponsors or email gari@gitam.edu.' },
          { q: 'What competitions does GARI participate in?', a: 'GARI competes in IN-SPACe CAN-7USAT 2026, India\'s national CanSat competition, and targets Spaceport America Cup for future rocketry.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': 'https://gari.live/#organization',
          'name': 'GARI — GITAM Aerospace Rocketry Initiative',
          'url': 'https://gari.live',
          'logo': 'https://gari.live/gari-logo.png',
          'foundingDate': '2025',
          'numberOfEmployees': { '@type': 'QuantitativeValue', 'value': 30 },
          'award': 'IN-SPACe CAN-7USAT 2026 National Selection',
          'parentOrganization': {
            '@type': 'CollegeOrUniversity',
            'name': 'GITAM University',
            'url': 'https://www.gitam.edu'
          }
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
              <div className="overview-card">
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
              </div>
              <div className="overview-card">
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
              </div>
              <div className="overview-card">
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
              </div>
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
