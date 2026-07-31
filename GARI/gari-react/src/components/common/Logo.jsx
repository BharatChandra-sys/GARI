import React from 'react';
import './Logo.css';

// variant: 'default' (dark bg) | 'white' (white text, for dark backgrounds)
const Logo = ({ size = 'medium', variant = 'default' }) => {
  const containerClass = `logo-container${variant === 'white' ? ' logo-container--white' : ''}`;

  return (
    <div className={containerClass}>
      <img
        src="/gari-logo-new.png"
        alt="GARI — GITAM Aerospace Rocketry Initiative logo"
        className="logo-image"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};


export default Logo;
