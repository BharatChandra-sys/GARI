import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Html, Lightformer, PerformanceMonitor, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { makeLiveryMaps, paintGeometry } from './livery';

const MODEL = '/models/rocket.glb';
const NODE_SCALE = 0.874; // the GLB node's own scale along the body axis
const NODE_SHIFT = 0.066; // and its offset

/*
  The CDR export is one mesh, so sections are cut in the shader by local z
  (nose at +1, tail at -1). Each cut end stays open, showing the internals.
  Ordered tail → nose; `key` matches the Anatomy stop key.
*/
const SECTIONS = [
  { key: 'motor', n: '04', label: 'Fin can + TIVRA K-560', range: [-1.01, -0.33] },
  { key: 'recovery', n: '03', label: 'Recovery bay', range: [-0.33, 0.08] },
  { key: 'avionics', n: '02', label: 'Avionics bay', range: [0.08, 0.6] },
  { key: 'nose', n: '01', label: 'Nose cone', range: [0.6, 1.01] },
];
const SPREAD = [-0.42, -0.14, 0.14, 0.42]; // explode offsets, scene units

const sectionMaterial = (base, [zMin, zMax]) => {
  const m = base.clone();
  const range = { value: new THREE.Vector2(zMin, zMax) };
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uRange = range;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vLocalZ;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocalZ = position.z;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec2 uRange;\nvarying float vLocalZ;')
      .replace('void main() {', 'void main() {\n  if (vLocalZ < uRange.x || vLocalZ >= uRange.y) discard;');
  };
  m.customProgramCacheKey = () => 'gari-section';
  return m;
};

const Exploded = ({ progress, activeKey, labels }) => {
  const { scene } = useGLTF(MODEL);
  const rig = useRef();
  const tilt = useRef();
  const yaw = useRef();
  const roll = useRef();
  const parts = useRef([]);
  const marks = useRef([]);
  const tmp = useMemo(() => ({ a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3() }), []);

  const sections = useMemo(() => {
    const base = new THREE.MeshStandardMaterial({
      ...makeLiveryMaps(),
      bumpScale: 0.35,
      roughness: 1,
      metalness: 1,
      envMapIntensity: 0.6,
      side: THREE.DoubleSide,
    });
    let painted = null;
    return SECTIONS.map((sec) => {
      const clone = scene.clone(true);
      const mat = sectionMaterial(base, sec.range);
      mat.transparent = true;
      clone.traverse((o) => {
        if (!o.isMesh) return;
        if (!painted) painted = paintGeometry(o.geometry);
        o.geometry = painted;
        o.material = mat;
      });
      return { ...sec, object: clone, mat, center: NODE_SCALE * ((sec.range[0] + sec.range[1]) / 2) + NODE_SHIFT };
    });
  }, [scene]);

  /*
    Everything is scrubbed by scroll (p = section progress, 5 stops of 0.2):
    stop 0  the rocket pulls apart into its four sections while the assembly turns;
    stops 1–4  the camera glides to the nose, avionics, recovery bay, then the motor.
  */
  const FOCUS_ORDER = [3, 2, 1, 0];

  useFrame((state, delta) => {
    const { damp, smoothstep, clamp } = THREE.MathUtils;
    const p = progress.get();
    const open = smoothstep(p, 0.02, 0.18);
    const t = state.clock.elapsedTime;

    sections.forEach((s, i) => {
      const g = parts.current[i];
      if (!g) return;
      g.position.z = damp(g.position.z, SPREAD[i] * open, 12, delta);
      const lit = !activeKey || activeKey === s.key;
      // Unfocused sections fade almost out, so the part being described stands alone.
      s.mat.opacity = damp(s.mat.opacity, lit ? 1 : 0.1, 6, delta);
      s.mat.depthWrite = s.mat.opacity > 0.98;
      s.mat.emissive.set('#2b5bff');
      s.mat.emissiveIntensity = damp(s.mat.emissiveIntensity, activeKey === s.key ? 0.06 : 0, 6, delta);
    });

    // The assembly keeps turning as you scroll, so the cut ends and internals change view.
    if (yaw.current) yaw.current.rotation.y = damp(yaw.current.rotation.y, Math.PI / 2 - 0.62 + p * 0.6, 8, delta);
    if (roll.current) roll.current.rotation.z = Math.sin(t * 0.3) * 0.25 + p * 0.9;
    if (tilt.current) tilt.current.rotation.y = damp(tilt.current.rotation.y, state.pointer.x * 0.1, 3, delta);

    // Camera glide: interpolate the focus point between consecutive sections as the scroll crosses each stop.
    const r = rig.current;
    if (!r) return;
    const f = clamp(p * 5, 0, 4.999);
    const k = Math.floor(f);
    const glide = smoothstep(f - k, 0.7, 1.0);
    const at = (idx, out) => {
      if (idx < 0) return out.set(0, 0, 0);
      const m = marks.current[FOCUS_ORDER[idx]];
      if (!m) return out.set(0, 0, 0);
      m.getWorldPosition(out);
      return r.worldToLocal(out);
    };
    at(k - 1, tmp.a);
    at(Math.min(3, k), tmp.b);
    tmp.c.copy(tmp.a).lerp(tmp.b, glide);
    const focus = smoothstep(f, 0.7, 1.0);
    const zoom = 1 + 0.6 * focus;
    // Focused parts sit right of centre, clear of the spec panel on the left.
    const narrow = state.viewport.aspect < 1;
    r.scale.setScalar(damp(r.scale.x, zoom, 6, delta));
    r.position.x = damp(r.position.x, -tmp.c.x * zoom + (narrow ? 0 : 0.55 * focus), 6, delta);
    r.position.y = damp(r.position.y, -tmp.c.y * zoom, 6, delta);
  });

  return (
    <group ref={rig}>
    <group ref={tilt}>
      {/* Outer z tilt gives the poster-style rising diagonal; inner yaw shows the cut ends. */}
      <group rotation={[0, 0, 0.36]} position={[0.08, -0.06, 0]}>
      <group ref={yaw} rotation={[0.2, Math.PI / 2 - 0.62, 0]}>
        <group ref={roll} position={[0, 0, -NODE_SHIFT]}>
          {sections.map((s, i) => (
            <group key={s.key} ref={(el) => { parts.current[i] = el; }}>
              <primitive object={s.object} />
              <object3D ref={(el) => { marks.current[i] = el; }} position={[0, 0, s.center]} />
              {labels && (
                <Html position={[0, 0.17, s.center]} center zIndexRange={[2, 0]} className="xp-anchor">
                  <div className={`xp-label${activeKey && activeKey !== s.key ? ' is-dim' : ''}`}>
                    <span>{s.n}</span>{s.label}
                  </div>
                </Html>
              )}
            </group>
          ))}
        </group>
      </group>
      </group>
    </group>
    </group>
  );
};

const Studio = () => (
  <Environment resolution={128}>
    <Lightformer form="rect" intensity={2.2} position={[0, 3, 2]} scale={[6, 2, 1]} />
    <Lightformer form="rect" intensity={1.1} position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[4, 6, 1]} />
    <Lightformer form="rect" intensity={0.7} position={[4, -1, -1]} rotation-y={-Math.PI / 2} scale={[3, 5, 1]} />
  </Environment>
);

/* progress: framer-motion value 0–1 for the pinned section. activeKey: highlighted section, or null for all. */
const ExplodedRocket = ({ progress, activeKey = null, active = true, labels = true }) => {
  const [dpr, setDpr] = useState(1.5);
  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.15, 3.25], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <hemisphereLight args={['#ffffff', '#0f1628', 1.0]} />
      <directionalLight position={[3, 4, 3]} intensity={2.2} />
      <directionalLight position={[-2.5, 2, -4]} intensity={1.8} color="#d6e2ff" />
      <Suspense fallback={null}>
        <Exploded progress={progress} activeKey={activeKey} labels={labels} />
        <Studio />
      </Suspense>
    </Canvas>
  );
};

export default ExplodedRocket;
