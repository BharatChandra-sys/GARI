import React from 'react';
import './Logo.css';

// variant: 'default' (dark bg) | 'white' (white text, for dark backgrounds)
const Logo = ({ size = 'medium', variant = 'default' }) => {
  const sizes = {
    small:  { height: 50 },
    medium: { height: 68 },
    large:  { height: 86 },
  };

  const h = sizes[size]?.height ?? 42;
  const containerClass = `logo-container${variant === 'white' ? ' logo-container--white' : ''}`;

  return (
    <div className={containerClass}>
      <img
        src="/gari-logo-new.png"
        alt="GARI — GITAM Aerospace Rocketry Initiative logo"
        style={{
          height: `${h}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
        className="logo-image"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Logo;
