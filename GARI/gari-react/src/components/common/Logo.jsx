import React from 'react';
import './Logo.css';

// variant: 'white' (for dark surfaces) | 'default' (ink, for light surfaces)
const Logo = ({ size = 'medium', variant = 'white', wordmark = true }) => {
  const heights = { small: 26, medium: 30, large: 40 };
  const h = heights[size] ?? 30;

  return (
    <span className={`logo logo--${variant}`}>
      <img
        src="/gari-logo-new.png"
        alt=""
        width={h}
        height={h}
        style={{ height: h, width: h }}
        className="logo-mark"
        loading="eager"
        decoding="async"
      />
      {wordmark && <span className="logo-word">GARI</span>}
    </span>
  );
};

export default Logo;
