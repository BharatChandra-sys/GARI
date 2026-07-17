import React, { useState, useEffect, useRef } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if splash has been shown before
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      // Skip splash if already seen in this session
      setIsVisible(false);
      onComplete();
      return;
    }

    // Optimize video playback quality
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
      // Force high quality rendering
      videoRef.current.setAttribute('playsinline', 'true');
      videoRef.current.setAttribute('webkit-playsinline', 'true');
      // Ensure smooth playback
      videoRef.current.style.willChange = 'transform';
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    // Mark splash as seen
    sessionStorage.setItem('hasSeenSplash', 'true');
    
    // Start fade out animation
    setFadeOut(true);
    
    // Wait for fade out animation to complete
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 500);
  };

  const handleSkip = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setFadeOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <video
          ref={videoRef}
          className="splash-video"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          style={{
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: 1000
          }}
        >
          <source src="/intro-video.mp4" type="video/mp4; codecs=avc1.4D401E,mp4a.40.2" />
          Your browser does not support the video tag.
        </video>
        
        <button 
          className="skip-button"
          onClick={handleSkip}
          aria-label="Skip intro"
        >
          Skip →
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
