import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/*
  One smooth-scroll instance for the whole site. It still drives the native scroll position,
  so position: sticky and framer-motion's useScroll keep working unchanged.
*/
let lenis = null;

export const startSmoothScroll = () => {
  if (lenis || typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: true });
  return () => {
    lenis.destroy();
    lenis = null;
  };
};

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
};

export const lockScroll = (locked) => {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
};
