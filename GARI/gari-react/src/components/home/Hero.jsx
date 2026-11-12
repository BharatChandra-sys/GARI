import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ease, useScrollMap } from '../motion';
import { FINALS } from '../../data/milestones';

const RocketScene = lazy(() => import('../3d/RocketScene'));

const APOGEE_M = 1000;
// Fraction of apogee reached at hero progress p: fast off the pad, slowing into the coast.
const climb = (p) => {
  const t = Math.min(1, Math.max(0, (p - 0.4) / 0.46));
  return 1 - (1 - t) * (1 - t);
};
const PHASES = [
  [0.36, 'On the pad'],
  [0.42, 'Ignition'],
  [0.64, 'Boost'],
  [0.86, 'Coast'],
  [2, 'Apogee'],
];

/* Deterministic star field: no Math.random at render, so SSR/pre-render stays stable. */
const STARS = Array.from({ length: 46 }, (_, i) => ({
  left: `${(i * 61.8) % 100}%`,
  top: `${(i * 37.3) % 78}%`,
  size: 1 + (i % 3) * 0.5,
  o: 0.35 + ((i * 7) % 10) / 16,
}));

const draw = (delay, duration = 1.4) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { duration, ease: ease.inOut, delay }, opacity: { duration: 0.2, delay } },
});

/* Side elevation traced from the CDR geometry. Callouts carry only reviewed data. */
export const Blueprint = ({ labels = true, animate = true }) => {
  const d = (delay, dur) => (animate ? draw(delay, dur) : {});
  return (
    <svg className="bp" viewBox="0 0 1200 420" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        <motion.path {...d(0.2, 1.8)} d="M100 210 C 190 180 290 158 370 156 L 570 156 L 600 148 L 1100 148 L 1100 272 L 600 272 L 570 264 L 370 264 C 290 262 190 240 100 210 Z" />
        <motion.path {...d(0.9, 0.5)} d="M370 156 V 264 M570 156 V 264 M600 148 V 272" opacity="0.55" />
        <motion.path {...d(1.1, 0.9)} d="M790 148 L 925 52 L 1105 52 L 1045 148" />
        <motion.path {...d(1.1, 0.9)} d="M790 272 L 925 368 L 1105 368 L 1045 272" />
        <motion.path {...d(1.3, 0.6)} d="M790 210 L 1100 205 V 215 Z" opacity="0.7" />
        <motion.path {...d(1.5, 0.5)} d="M1100 186 H 1122 V 234 H 1100" />
      </g>
      <g className="bp-accent" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <motion.path {...d(1.6, 0.8)} strokeDasharray="6 6" d="M900 182 H 1100 V 238 H 900 Z" />
        <motion.path {...d(1.2, 1.2)} strokeDasharray="14 5 2 5" d="M60 210 H 1160" opacity="0.5" />
        {labels && (
          <g className="bp-leaders">
            <motion.path {...d(2, 0.5)} d="M235 182 V 92 H 300" />
            <motion.path {...d(2.1, 0.5)} d="M470 264 V 338 H 520" />
            <motion.path {...d(2.2, 0.5)} d="M690 148 V 78 H 610" />
            <motion.path {...d(2.3, 0.5)} d="M1000 238 V 392 H 930" />
          </g>
        )}
      </g>
    </svg>
  );
};

const callouts = [
  { key: 'nose', title: 'Nose cone', body: 'Composite, fibreglass + carbon fibre', style: { left: '25.5%', top: '14%' } },
  { key: 'avionics', title: 'Avionics bay', body: 'Custom flight computer, live telemetry', style: { left: '44%', top: '74%' } },
  { key: 'recovery', title: 'Recovery', body: 'Dual event: drogue, then main', style: { right: '49.5%', top: '10.5%', textAlign: 'right' } },
  { key: 'motor', title: 'TIVRA K-560', body: 'Solid motor · Ø94 × 313 mm · 1,030 N peak', style: { right: '23%', top: '87%', textAlign: 'right' } },
];

const canRender3D = () => {
  try {
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return false;
  } catch {
    return false;
  }
  const conn = navigator.connection;
  if (conn && conn.saveData) return false;
  if (navigator.deviceMemory && navigator.deviceMemory <= 2) return false;
  return true;
};

const Pitch = () => (
  <>
    <p className="hero-pitch-title">
      One kilometre up.<br /><em>Built by students.</em>
    </p>
    <p className="hero-pitch-sub" itemProp="description">
      GARI is GITAM University's student rocketry team. We design, build and fly a solid-motor
      rocket and a NavIC-tracked CanSat, and take both to the IN-SPACe National Finals
      in {FINALS.short}, {FINALS.label}.
    </p>
    <div className="actions">
      <Link to="/competitions" className="btn btn--primary">See both vehicles</Link>
      <Link to="/sponsors" className="link">Back the launch</Link>
    </div>
  </>
);

const Hero = () => {
  const ref = useRef(null);
  const bpRef = useRef(null);
  const altRef = useRef(null);
  const phaseRef = useRef(null);
  const fit = useRef(0.6);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: '200px' });
  const [three, setThree] = useState(false);

  useEffect(() => {
    if (reduce || !canRender3D()) return undefined;
    // Mount the 3D scene after first paint so it never competes with the headline.
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => setThree(true));
    return () => cancel(id);
  }, [reduce]);

  // Tell the 3D scene how wide the drawn rocket is, so model and drawing register.
  useEffect(() => {
    const measure = () => {
      if (!bpRef.current) return;
      fit.current = (bpRef.current.offsetWidth * (1000 / 1200)) / window.innerWidth;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const introOpacity = useScrollMap(scrollYProgress, [0.04, 0.16], [1, 0]);
  const introY = useScrollMap(scrollYProgress, [0, 0.16], [0, -40]);
  const bpOpacity = useScrollMap(scrollYProgress, [0.1, 0.2], [1, 0]);
  const gridOpacity = useScrollMap(scrollYProgress, [0.14, 0.34], [1, 0]);
  const sceneOpacity = useScrollMap(scrollYProgress, [0.08, 0.18], [0, 1]);
  const skyY = useTransform(scrollYProgress, (p) => `${-75 * (1 - climb(p))}%`);
  const starsOpacity = useScrollMap(scrollYProgress, [0.6, 0.86], [0, 1]);
  const hudOpacity = useScrollMap(scrollYProgress, [0.3, 0.38], [0, 1]);
  const rulerY = useTransform(scrollYProgress, (p) => `${climb(p) * 100}%`);
  const pitchEvents = useTransform(scrollYProgress, (p) => (p > 0.9 ? 'auto' : 'none'));
  const limbRise = useScrollMap(scrollYProgress, [0.8, 1], [30, 0]);
  const limbY = useTransform(limbRise, (v) => `${v}%`);
  const limbOpacity = useScrollMap(scrollYProgress, [0.78, 0.92], [0, 1]);
  const pitchOpacity = useScrollMap(scrollYProgress, [0.88, 0.97], [0, 1]);
  const pitchY = useScrollMap(scrollYProgress, [0.88, 0.97], [36, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const alt = Math.round(APOGEE_M * climb(p));
    if (altRef.current) altRef.current.textContent = alt.toLocaleString('en-IN');
    if (phaseRef.current) phaseRef.current.textContent = PHASES.find(([end]) => p < end)[1];
  });

  const heading = (
    <h1 className="hero-title" itemProp="headline">
      <span className="sr-only">GARI — GITAM Aerospace Rocketry Initiative. </span>
      We build rockets<br />that <em>leave the ground.</em>
    </h1>
  );

  if (reduce) {
    return (
      <section className="hero hero--static theme-dark" aria-label="GARI — GITAM Aerospace Rocketry Initiative">
        <div className="container hero-static-inner">
          {heading}
          <div className="hero-drawing"><Blueprint animate={false} labels={false} /></div>
          <div className="hero-pitch hero-pitch--static"><Pitch /></div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="hero theme-dark"
      aria-label="GARI — GITAM Aerospace Rocketry Initiative"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="hero-stage">
        <motion.div className="hero-sky" style={{ y: skyY }} aria-hidden="true" />
        <motion.div className="hero-stars" style={{ opacity: starsOpacity }} aria-hidden="true">
          {STARS.map((s, i) => (
            <span key={i} style={{ left: s.left, top: s.top, width: s.size, height: s.size, opacity: s.o }} />
          ))}
        </motion.div>
        <motion.div className="hero-grid" style={{ opacity: gridOpacity }} aria-hidden="true" />
        <motion.div className="hero-limb" style={{ y: limbY, opacity: limbOpacity }} aria-hidden="true" />

        {/* 1 — the drawing */}
        <motion.div className="hero-drawing" ref={bpRef} style={{ opacity: bpOpacity }}>
          <Blueprint />
          <ul className="hero-callouts">
            {callouts.map((c, i) => (
              <motion.li
                key={c.key}
                style={c.style}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: ease.out, delay: 2.3 + i * 0.1 }}
              >
                <strong>{c.title}</strong>
                <span>{c.body}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* 2 — the model takes over from the drawing */}
        {three && (
          <motion.div className="hero-scene" style={{ opacity: sceneOpacity }}>
            <Suspense fallback={null}>
              <RocketScene progress={scrollYProgress} fit={fit} active={inView} />
            </Suspense>
          </motion.div>
        )}

        <motion.div className="hero-intro container" style={{ opacity: introOpacity, y: introY }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: ease.out, delay: 0.15 }}
          >
            {heading}
          </motion.div>
          <motion.p
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span>Side elevation · CDR cleared Sept 20, 2026</span>
            <span className="hero-meta-scroll">Scroll to fly it</span>
          </motion.p>
        </motion.div>

        {/* 3 — flight readout */}
        <motion.div className="hero-hud" style={{ opacity: hudOpacity }} aria-hidden="true">
          <div className="hero-ruler">
            <motion.div className="hero-ruler-scale" style={{ y: rulerY }}>
              {[1000, 800, 600, 400, 200, 0].map((m) => (
                <span key={m} style={{ top: `${100 - m / 10}%` }}>{m}</span>
              ))}
            </motion.div>
            <i className="hero-ruler-mark" />
          </div>
          <p className="hero-alt"><span ref={altRef}>0</span><small>m</small></p>
          <p className="hero-phase" ref={phaseRef}>On the pad</p>
        </motion.div>

        <motion.div className="hero-pitch container" style={{ opacity: pitchOpacity, y: pitchY, pointerEvents: pitchEvents }}>
          <Pitch />
        </motion.div>
      </div>

      <p className="sr-only">
        GARI (GITAM Aerospace Rocketry Initiative) is GITAM University's student aerospace and
        rocketry team, competing in IN-SPACe CAN-7USAT 2026 and the IN-SPACe Model Rocketry India
        Student Competition 2026. Rocket CDR cleared; CanSat PDR cleared.
      </p>
    </section>
  );
};

export default Hero;
