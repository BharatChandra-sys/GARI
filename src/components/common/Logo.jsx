import React from 'react';
import './Logo.css';

// Professional GARI Logo with Text
const Logo = ({ size = 'medium' }) => {
  const sizes = {
    small: { height: 36 },
    medium: { height: 44 },
    large: { height: 56 },
  };

  const currentSize = sizes[size];

  return (
    <div className="logo-container">
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
