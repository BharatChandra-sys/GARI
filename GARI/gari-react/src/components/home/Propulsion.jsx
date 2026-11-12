import React, { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal, useScrollMap } from '../motion';

// Reviewed figures for the competition motor (see Competitions page).
const motor = [
  ['Motor', 'TIVRA K-560, solid'],
  ['Peak thrust', '1,030 N'],
  ['Total impulse', '1,960 N·s'],
  ['Burn time', '3.5 s'],
  ['Propellant', '1.8 kg'],
  ['Casing', 'Ø94 × 313 mm'],
];

/* A test-stand firing that opens from a framed window to full bleed as you scroll into it. */
const Propulsion = () => {
  const ref = useRef(null);
  const video = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: '0px 0px -20% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const inset = useScrollMap(scrollYProgress, [0.25, 1], [14, 0]);
  const clip = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}%)`);
  const scale = useScrollMap(scrollYProgress, [0.25, 1], [1.18, 1]);

  // Only decode video while it is on screen.
  useEffect(() => {
    const v = video.current;
    if (!v || reduce) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);

  return (
    <section ref={ref} className="prop theme-dark" aria-labelledby="prop-title">
      <motion.div className="prop-media" style={reduce ? undefined : { clipPath: clip }}>
        <motion.video
          ref={video}
          style={reduce ? undefined : { scale }}
          src="/media/motor-test.mp4"
          poster="/media/motor-test-poster.webp"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="prop-shade" aria-hidden="true" />
      </motion.div>

      <div className="container prop-inner">
        <Reveal className="prop-head">
          <span className="eyebrow">Propulsion</span>
          <h2 id="prop-title" className="t-hero">
            3.5 seconds<br />of <em>fire.</em>
          </h2>
          <p className="t-lead">
            That is all the motor gets. One solid grain, 1,030 newtons at peak, and everything
            after burnout is a coast to one kilometre on momentum alone.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="prop-spec">
          <table className="spec-table">
            <tbody>
              {motor.map(([k, v]) => (
                <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>

      <p className="prop-credit">Reference footage: hybrid motor test firing, NASA Marshall Space Flight Center</p>
    </section>
  );
};

export default Propulsion;
