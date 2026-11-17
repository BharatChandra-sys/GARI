import React from 'react';
import './Logo.css';

// variant: 'white' (for dark surfaces) | 'default' (ink, for light surfaces)
const Logo = ({ size = 'medium', variant = 'white' }) => (
  <span className={`logo logo--${variant} logo--${size}`}>GARI</span>
);

export default Logo;
