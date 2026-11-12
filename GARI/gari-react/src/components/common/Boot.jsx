import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ease } from '../motion';
import './Boot.css';

const MIN_MS = 900;
const MAX_MS = 2400;

const seen = () => {
  try { return sessionStorage.getItem('gari-boot') === '1'; } catch { return true; }
};

/* First-visit loader. Lists what is actually loading; any click or key skips it. */
const Boot = () => {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !seen());
  const [done, setDone] = useState({ type: false, model: false });
  const started = useRef(Date.now());

  useEffect(() => {
    if (!show) return undefined;
    let alive = true;
    const mark = (k) => alive && setDone((d) => ({ ...d, [k]: true }));
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => mark('type'));
    fetch('/models/rocket.glb').then((r) => r.blob()).catch(() => null).then(() => mark('model'));

    const close = () => {
      try { sessionStorage.setItem('gari-boot', '1'); } catch { /* private mode */ }
      setShow(false);
    };
    const cap = setTimeout(close, MAX_MS);
    window.addEventListener('pointerdown', close);
    window.addEventListener('keydown', close);
    return () => {
      alive = false;
      clearTimeout(cap);
      window.removeEventListener('pointerdown', close);
      window.removeEventListener('keydown', close);
    };
  }, [show]);

  useEffect(() => {
    if (!show || !done.type || !done.model) return undefined;
    const wait = Math.max(0, MIN_MS - (Date.now() - started.current));
    const t = setTimeout(() => {
      try { sessionStorage.setItem('gari-boot', '1'); } catch { /* private mode */ }
      setShow(false);
    }, wait);
    return () => clearTimeout(t);
  }, [show, done]);

  if (reduce) return null;
  const count = Number(done.type) + Number(done.model);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="boot"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: ease.inOut }}
          role="status"
          aria-label="Loading GARI"
        >
          <div className="boot-inner">
            <p className="boot-word">GARI</p>
            <ul className="boot-list">
              <li className={done.type ? 'is-done' : ''}><span>Typefaces</span><span>{done.type ? 'Ready' : 'Loading'}</span></li>
              <li className={done.model ? 'is-done' : ''}><span>Flight model</span><span>{done.model ? 'Ready' : 'Loading'}</span></li>
            </ul>
            <div className="boot-bar"><span style={{ transform: `scaleX(${0.12 + count * 0.44})` }} /></div>
            <p className="boot-skip">Press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Boot;
