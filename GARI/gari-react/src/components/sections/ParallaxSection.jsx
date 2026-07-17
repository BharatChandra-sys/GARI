import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxSection.css';

const ParallaxSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={ref} className="parallax-section">
      <div className="parallax-background">
        <motion.div 
          className="parallax-image"
          style={{ y }}
        >
          <img 
            src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070" 
            alt="Rocket Launch"
          />
        </motion.div>
        <div className="parallax-overlay"></div>
      </div>

      <motion.div 
        className="parallax-content"
        style={{ opacity }}
      >
        <div className="container">
          <h2>Pushing Boundaries</h2>
          <p>
            From concept to launch, we engineer solutions that reach for the stars
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ParallaxSection;
