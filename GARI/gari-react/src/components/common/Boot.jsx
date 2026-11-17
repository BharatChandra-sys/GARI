import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useReducedMotion } from 'framer-motion';
import { ease } from '../motion';
import './Boot.css';

const MIN_MS = 1100;
const MAX_MS = 4000;

const seen = () => {
  try { return sessionStorage.getItem('gari-boot') === '1'; } catch { return true; }
};
const remember = () => {
  try { sessionStorage.setItem('gari-boot', '1'); } catch { /* private mode */ }
};

/* Stream the rocket model so progress reflects real bytes, and leave it warm in the HTTP cache. */
const loadModel = async (onProgress) => {
  const res = await fetch('/models/rocket.glb');
  const total = Number(res.headers.get('content-length')) || 0;
  if (!res.body || !total) {
    await res.arrayBuffer();
    onProgress(1);
    return;
  }
  const reader = res.body.getReader();
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    got += value.length;
    onProgress(Math.min(1, got / total));
  }
  onProgress(1);
};

/* First visit in a session only. */
const Boot = () => {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !seen());
  const pctRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (!show) return undefined;
    let alive = true;
    const parts = { model: 0, type: 0 };
    let shown = 0;
    let anim;
    const started = Date.now();

    const render = (v) => {
      if (pctRef.current) pctRef.current.textContent = String(Math.round(v * 100)).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${v})`;
    };
    const update = () => {
      const target = parts.model * 0.7 + parts.type * 0.3;
      if (anim) anim.stop();
      anim = animate(shown, target, { duration: 0.5, ease: ease.out, onUpdate: (v) => { shown = v; render(v); } });
    };
    const finish = () => {
      if (!alive) return;
      alive = false;
      remember();
      if (anim) anim.stop();
      render(1);
      setTimeout(() => setShow(false), 280);
    };

    const fonts = (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { parts.type = 1; update(); });
    const model = loadModel((v) => { parts.model = v; update(); }).catch(() => { parts.model = 1; update(); });

    Promise.all([fonts, model]).then(() => {
      setTimeout(finish, Math.max(0, MIN_MS - (Date.now() - started)));
    });
    const cap = setTimeout(finish, MAX_MS);
    window.addEventListener('pointerdown', finish);

    return () => {
      alive = false;
      clearTimeout(cap);
      if (anim) anim.stop();
      window.removeEventListener('pointerdown', finish);
    };
  }, [show]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="boot"
          role="status"
          aria-label="Loading GARI"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease: ease.inOut }}
        >
          <motion.div
            className="boot-brand"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.8, ease: ease.out }}
          >
            <span className="boot-word">GARI</span>
            <span className="boot-name">GITAM Aerospace Rocketry Initiative</span>
          </motion.div>

          <div className="boot-foot">
            <span className="boot-meta">Hyderabad, India</span>
            <span className="boot-pct" ref={pctRef}>000</span>
          </div>
          <div className="boot-bar"><span ref={barRef} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Boot;
