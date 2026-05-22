import React from 'react';
import Hero from '../components/sections/Hero';
import AnimatedStats from '../components/sections/AnimatedStats';
import ParallaxSection from '../components/sections/ParallaxSection';
import Sponsors from '../components/sections/Sponsors';
import ImageGallery from '../components/sections/ImageGallery';
import './HomePage.css';

const HomePage = () => {
  return (
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
                  alt="Aerospace Research"
                />
              </div>
              <h3>Aerospace Research</h3>
              <p>Exploring advanced aerospace systems and engineering innovation</p>
            </div>
            <div className="overview-card">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80" 
                  alt="CanSat Mission"
                />
              </div>
              <h3>CanSat Mission</h3>
              <p>Developing advanced satellite systems for IN-SPACe competition</p>
            </div>
            <div className="overview-card">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" 
                  alt="Student Innovation"
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

      {/* Parallax Section */}
      <ParallaxSection />

      {/* Sponsors Section */}
      <Sponsors />

      {/* Image Gallery */}
      <ImageGallery />
    </div>
  );
};

export default HomePage;
