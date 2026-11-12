import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Logo from '../common/Logo';
import { ease } from '../motion';
import './Navbar.css';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Mission', path: '/mission' },
  { name: 'Competitions', path: '/competitions' },
  { name: 'Team', path: '/team' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();
  const { scrollY } = useScroll();

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 120 && y > prev);
    setAtTop(y < 24);
  });

  // Expose state so sticky sub-navs can follow the bar.
  useEffect(() => {
    document.documentElement.dataset.nav = hidden && !open ? 'hidden' : 'shown';
  }, [hidden, open]);

  // Close menu on navigation.
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock scroll and listen for Esc while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav${atTop && !open ? ' nav--top' : ''}`}
        animate={{ y: hidden && !open ? '-100%' : 0 }}
        transition={{ duration: 0.3, ease: ease.apple }}
      >
        <nav className="nav-inner" aria-label="GARI main navigation">
          <Link to="/" className="nav-logo" aria-label="GARI — GITAM Aerospace Rocketry Initiative, home">
            <Logo size="small" variant="white" />
            <span className="nav-sub">GITAM · HYDERABAD</span>
          </Link>

          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.path}>
                <NavLink to={l.path} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                  {l.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-end">
            <Link to="/apply" className="nav-cta">Join</Link>
            <button
              className={`nav-toggle${open ? ' is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="nav-sheet"
            >
              <span className="nav-toggle-label">{open ? 'Close' : 'Menu'}</span>
              <span className="nav-toggle-line" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-sheet"
            className="nav-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: ease.apple }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {[{ name: 'Home', path: '/' }, ...navLinks].map((l) => (
                <motion.li
                  key={l.path}
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: ease.out } } }}
                >
                  <NavLink to={l.path} end className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                    {l.name}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
            <Link to="/apply" className="btn btn--primary nav-sheet-cta">Apply to join GARI</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
