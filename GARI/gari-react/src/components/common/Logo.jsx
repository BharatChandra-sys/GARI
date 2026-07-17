import React from 'react';
import './Logo.css';

// variant: 'default' (dark text) | 'white' (white text, for dark backgrounds)
const Logo = ({ size = 'medium', variant = 'default' }) => {
  const sizes = {
    small: { height: 36 },
    medium: { height: 44 },
    large: { height: 56 },
  };

  const currentSize = sizes[size];
  const containerClass = `logo-container${variant === 'white' ? ' logo-container--white' : ''}`;

  return (
    <div className={containerClass}>
      <img
        src="/gari-logo.png"
        alt="GARI Logo"
        style={{ height: `${currentSize.height}px`, width: 'auto' }}
        className="logo-image"
      />
      <span className="logo-text">GARI</span>
    </div>
  );
};

export default Logo;
