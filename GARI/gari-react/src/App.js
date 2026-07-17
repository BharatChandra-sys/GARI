import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MissionPage from './pages/MissionPage';
import CanSatPage from './pages/CanSatPage';
import TeamPage from './pages/TeamPage';
import AchievementsPage from './pages/AchievementsPage';
import AchievementProjectPage from './pages/AchievementProjectPage';
import ContactPage from './pages/ContactPage';
import SponsorsPage from './pages/SponsorsPage';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        
        <div className="App">
          {/* Skip Navigation — Accessibility + SEO */}
          <a href="#main-content" className="skip-nav">Skip to main content</a>

          <Navbar />
          
          <main id="main-content" role="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/cansat" element={<CanSatPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/achievements/:slug" element={<AchievementProjectPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
