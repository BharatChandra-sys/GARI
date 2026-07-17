import React from 'react';
import Hero from '../components/sections/Hero';
import AnimatedStats from '../components/sections/AnimatedStats';
import Sponsors from '../components/sections/Sponsors';
import SEO from '../components/common/SEO';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <SEO
        title="GITAM Aerospace Rocketry Initiative"
        description="GARI is GITAM University's student-led aerospace and rocketry team. We compete in IN-SPACe CAN-7USAT 2026, build sounding rockets, and push the boundaries of student aerospace engineering in India."
        path="/"
        keywords="GARI GITAM, student rocketry India, aerospace club GITAM, CanSat team India, IN-SPACe 2026"
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

        {/* Quick Overview Section */}
        <section className="overview-section">
          <div className="container">
            <div className="overview-grid">
              <div className="overview-card">
                <div className="card-image">
                  <img 
                    src="https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800&q=80" 
                    alt="GARI aerospace research and rocket engineering at GITAM University"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                </div>
                <h3>Aerospace Research</h3>
                <p>Exploring advanced aerospace systems and engineering innovation</p>
              </div>
              <div className="overview-card">
                <div className="card-image">
                  <img 
                    src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80" 
                    alt="GARI CanSat mission — student satellite competing in IN-SPACe CAN-7USAT"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                </div>
                <h3>CanSat Mission</h3>
                <p>Developing advanced satellite systems for IN-SPACe competition</p>
              </div>
              <div className="overview-card">
                <div className="card-image">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" 
                    alt="GARI student innovation — 30+ aerospace engineering students at GITAM"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                </div>
                <h3>Student Innovation</h3>
                <p>30+ members building the future of aerospace technology</p>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Stats */}
        <AnimatedStats />

        {/* Sponsors Section */}
        <Sponsors />
      </div>
    </>
  );
};

export default HomePage;
