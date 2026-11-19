import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Blueprint } from './Hero';
import { ease } from '../motion';

const ExplodedRocket = lazy(() => import('../3d/ExplodedRocket'));

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

/*
  span: [x0, x1] along the side-elevation drawing (nose at 100, nozzle at 1122).
  Figures match the Competitions page, which is the reviewed source.
*/
const stops = [
  {
    key: 'overview',
    label: 'Overview',
    title: <>Anatomy of a <em>one-kilometre</em> rocket.</>,
    body: 'Four systems, each one reviewed by IN-SPACe at PDR and CDR. Scroll through them.',
    specs: [['Target apogee', '1 km'], ['Recovery events', '2'], ['Motor', 'TIVRA K-560']],
    span: null,
    zoom: 1,
  },
  {
    key: 'nose',
    label: 'Nose cone',
    title: <>Nose <em>cone.</em></>,
    body: 'Part of a composite airframe in fibreglass and carbon fibre, optimised for drag, strength and the mass budget.',
    specs: [['Airframe', 'Fibreglass + carbon fibre'], ['Review', 'CDR cleared']],
    span: [100, 370],
    zoom: 2.3,
  },
  {
    key: 'avionics',
    label: 'Avionics bay',
    title: <>Avionics <em>bay.</em></>,
    body: 'A custom flight computer for data acquisition, apogee detection and deployment logic, streaming live telemetry to our own ground station.',
    specs: [['Flight computer', 'Custom, in-house'], ['Apogee detection', 'On board'], ['Telemetry', 'Live RF downlink']],
    span: [370, 570],
    zoom: 2.6,
  },
  {
    key: 'recovery',
    label: 'Recovery',
    title: <>Recovery, <em>twice.</em></>,
    body: 'A drogue opens at apogee to stabilise the fall, then the main opens for a slow, safe landing.',
    specs: [['First event', 'Drogue at apogee'], ['Second event', 'Main'], ['Separation', 'Mechanical']],
    span: [570, 790],
    zoom: 2.4,
  },
  {
    key: 'motor',
    label: 'Propulsion',
    title: <>TIVRA <em>K-560.</em></>,
    body: 'One solid grain. Everything after burnout is a coast to apogee on momentum alone.',
    specs: [['Peak thrust', '1,030 N'], ['Total impulse', '1,960 N·s'], ['Burn time', '3.5 s'], ['Casing', 'Ø94 × 313 mm']],
    span: [880, 1122],
    zoom: 2.1,
  },
];

const pad = (n) => String(n).padStart(2, '0');

const Panel = ({ s, i }) => (
  <>
    <span className="eyebrow">{pad(i + 1)} / {pad(stops.length)} · {s.label}</span>
    <h2 className="t-display">{s.title}</h2>
    <p className="t-lead">{s.body}</p>
    <table className="spec-table">
      <tbody>
        {s.specs.map(([k, v]) => (
          <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
        ))}
      </tbody>
    </table>
  </>
);

/*
  Pinned walk-through. The real CDR model is cut into its four sections and pulled apart
  as an exploded view; each stop then highlights one section while the spec panel swaps.
  Without WebGL, the upright line drawing zooms to each system instead.
*/
const Anatomy = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [stop, setStop] = useState(0);
  const [three, setThree] = useState(false);
  const near = useInView(ref, { margin: '300px 0px' });

  useEffect(() => { setThree(hasWebGL()); }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(stops.length - 1, Math.max(0, Math.floor(p * stops.length)));
    if (i !== stop) setStop(i);
  });

  if (reduce) {
    return (
      <section className="section anatomy anatomy--static theme-dark" aria-label="Anatomy of the GARI rocket">
        <div className="container anatomy-static">
          {stops.map((s, i) => <div key={s.key} className="anatomy-panel"><Panel s={s} i={i} /></div>)}
        </div>
      </section>
    );
  }

  const s = stops[stop];
  const center = s.span ? (s.span[0] + s.span[1]) / 2 / 1200 : 0.5;

  return (
    <section ref={ref} className="anatomy theme-dark" style={{ height: `${stops.length * 100}vh` }} aria-label="Anatomy of the GARI rocket">
      <div className="anatomy-stage">
        <div className="container anatomy-grid">
          <div className="anatomy-copy" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.key}
                className="anatomy-panel"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: ease.out }}
              >
                <Panel s={s} i={stop} />
              </motion.div>
            </AnimatePresence>
          </div>

          {three ? (
            <div className="anatomy-view anatomy-view--3d" aria-hidden="true">
              {near && (
                <Suspense fallback={null}>
                  <ExplodedRocket progress={scrollYProgress} activeKey={s.span ? s.key : null} active={near} />
                </Suspense>
              )}
            </div>
          ) : (
          <div className="anatomy-view" aria-hidden="true">
            <motion.div
              className="anatomy-figure"
              initial={false}
              animate={{ y: `${-(center - 0.5) * 100 * s.zoom}%`, scale: s.zoom }}
              transition={{ type: 'spring', stiffness: 70, damping: 20, mass: 1 }}
            >
              <Blueprint upright labels={false} animate={false} focus={s.span || [0, 0]} />
            </motion.div>
          </div>
          )}

          <ol className="anatomy-index" aria-hidden="true">
            {stops.map((t, i) => (
              <li key={t.key} className={i === stop ? 'is-active' : undefined}>
                <span>{pad(i + 1)}</span>{t.label}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Anatomy;
