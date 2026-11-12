import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { Reveal, RevealGroup, RevealItem, useScrollMap } from '../motion';

const steps = [
  { title: 'Design', body: 'Requirements, trade studies and CAD for every subsystem, reviewed by IN-SPACe at PDR and CDR.' },
  { title: 'Simulate', body: 'Flight simulations, stability margins and structural analysis before a single part is cut.' },
  { title: 'Build', body: 'Airframe, avionics boards, wiring harnesses and parachutes, built by hand in our lab.' },
  { title: 'Test', body: 'Bench tests, ejection tests and full-system trials ahead of Flight Readiness Review.' },
  { title: 'Fly', body: 'Launch, live telemetry and recovery, then a post-flight report that feeds the next design.' },
];

/* Five stages on one line that draws itself as the section scrolls through. */
const Process = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });
  const scaleX = useScrollMap(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section process theme-light" aria-labelledby="process-title">
      <div className="container">
        <Reveal className="head">
          <span className="eyebrow">How we work</span>
          <h2 id="process-title" className="t-display">From CAD <em>to countdown.</em></h2>
        </Reveal>
        <div className="process-track" ref={ref}>
          <div className="process-line" aria-hidden="true">
            <motion.span style={{ scaleX: reduce ? 1 : scaleX }} />
          </div>
          <RevealGroup as="ol" className="process-steps" stagger={0.09}>
            {steps.map((s, i) => (
              <RevealItem as="li" key={s.title} className="process-step">
                <span className="process-n">{i + 1}</span>
                <h3 className="t-h2">{s.title}</h3>
                <p>{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
};

export default Process;
