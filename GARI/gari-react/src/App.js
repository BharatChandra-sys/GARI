import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MissionPage from './pages/MissionPage';
import CompetitionsPage from './pages/CompetitionsPage';
import TeamPage from './pages/TeamPage';
import AchievementsPage from './pages/AchievementsPage';
import AchievementProjectPage from './pages/AchievementProjectPage';
import ContactPage from './pages/ContactPage';
import SponsorsPage from './pages/SponsorsPage';
import ApplicationPage from './pages/ApplicationPage';
import Footer from './components/layout/Footer';
import Boot from './components/common/Boot';
import { ease } from './components/motion';
import './App.css';

const pageNames = {
  '/': 'Home',
  '/about': 'About',
  '/mission': 'Mission',
  '/competitions': 'Competitions',
  '/cansat': 'Competitions',
  '/team': 'Team',
  '/achievements': 'Achievements',
  '/apply': 'Apply',
  '/contact': 'Contact',
  '/sponsors': 'Sponsors',
};
const nameFor = (path) => pageNames[path] || (path.startsWith('/achievements/') ? 'Project' : '');

const wipeY = { idle: '100%', cover: '0%', reveal: '-100%' };

/*
  Route change = a cobalt sheet rises over the old page, the route swaps underneath,
  and the sheet leaves through the top. The swap is held until the page is covered.
*/
const AnimatedRoutes = () => {
  const location = useLocation();
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(location);
  const [phase, setPhase] = useState('idle');
  const latest = useRef(location);
  latest.current = location;

  useEffect(() => {
    if (location.pathname === shown.pathname) {
      if (location !== shown) setShown(location);
      return;
    }
    if (reduce) {
      setShown(location);
      window.scrollTo(0, 0);
      return;
    }
    setPhase('cover');
  }, [location, shown, reduce]);

  const onDone = () => {
    if (phase === 'cover') {
      setShown(latest.current);
      window.scrollTo(0, 0);
      setPhase('reveal');
    } else if (phase === 'reveal') {
      setPhase('idle');
    }
  };

  return (
    <>
      <Routes location={shown}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/cansat" element={<CompetitionsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/achievements/:slug" element={<AchievementProjectPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
      </Routes>
      {!reduce && (
        <motion.div
          className="wipe"
          aria-hidden="true"
          initial={false}
          animate={{ y: wipeY[phase] }}
          transition={phase === 'idle' ? { duration: 0 } : { duration: 0.55, ease: ease.inOut }}
          onAnimationComplete={onDone}
        >
          <span>{nameFor(location.pathname)}</span>
        </motion.div>
      )}
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <Router>
          <div className="App">
            <a href="#main-content" className="skip-nav">Skip to main content</a>
            <Navbar />
            <main id="main-content" role="main">
              <AnimatedRoutes />
            </main>
            <Footer />
            <Boot />
          </div>
        </Router>
      </MotionConfig>
    </HelmetProvider>
  );
}

export default App;
