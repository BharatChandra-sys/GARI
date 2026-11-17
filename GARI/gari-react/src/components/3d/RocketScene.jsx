import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, ContactShadows, Environment, Lightformer, OrbitControls, PerformanceMonitor, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { makeLiveryTexture, paintGeometry } from './livery';
import { Flame, Smoke } from './exhaust';

const MODEL = '/models/rocket.glb';
const LENGTH = 1.75; // nose-to-tail length of the CDR model, in scene units
useGLTF.preload(MODEL);

/* The GARI rocket (CDR geometry) in the GARI livery. */
const Rocket = ({ progress, pointer, idle = true, fit }) => {
  const { scene } = useGLTF(MODEL);
  const group = useRef();
  const spin = useRef();
  const nozzle = useRef();
  const engine = useRef({ power: 0, flow: 0 });

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const paint = new THREE.MeshPhysicalMaterial({
      map: makeLiveryTexture(),
      roughness: 0.34,
      metalness: 0,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });
    clone.traverse((o) => {
      if (!o.isMesh) return;
      o.geometry = paintGeometry(o.geometry);
      o.material = paint;
    });
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || !progress) {
      if (g && idle) g.rotation.y += delta * 0.2;
      return;
    }
    /*
      Scroll choreography (p = hero progress):
      0.00–0.18  lying on the drawing, nose left, sized to match the blueprint
      0.18–0.32  stands up on the pad
      0.32–0.78  ignition and boost (flame, smoke, shake), then coast
      0.86–1.00  apogee: noses over and moves aside for the copy
    */
    const { smoothstep, damp, lerp } = THREE.MathUtils;
    const p = progress.get();
    const { width: vw, height: vh } = state.viewport;
    const narrow = vw < vh * 0.8;
    const stand = smoothstep(p, 0.18, 0.32);
    const burn = smoothstep(p, 0.32, 0.36) * (1 - smoothstep(p, 0.72, 0.78));
    const climb = smoothstep(p, 0.36, 0.86);
    const apogee = smoothstep(p, 0.86, 0.98);

    engine.current.power = damp(engine.current.power, burn, 10, delta);
    // Air speed past the camera: rises through boost, falls off toward apogee.
    const speed = smoothstep(p, 0.34, 0.5) * (1 - smoothstep(p, 0.8, 0.95));
    engine.current.flow = damp(engine.current.flow, speed * 2.6 * g.scale.x, 4, delta);

    const flat = ((fit ? fit.current : 0.6) * vw) / LENGTH;
    const upright = Math.min(1, (vh * 0.5) / LENGTH);
    const scale = lerp(flat, upright, stand) * (1 - apogee * 0.3);
    g.scale.setScalar(damp(g.scale.x, scale, 10, delta));

    g.rotation.z = damp(g.rotation.z, (1 - stand) * (Math.PI / 2) - apogee * 0.5 + pointer.current.x * 0.04 * stand, 8, delta);
    g.rotation.x = damp(g.rotation.x, pointer.current.y * 0.04 * stand, 6, delta);
    if (spin.current) spin.current.rotation.y += delta * stand * (0.2 + burn * 0.9);

    const restY = lerp(0, -0.2, stand) + climb * 0.3;
    const x = apogee * (narrow ? 0 : vw * 0.22);
    const y = restY + apogee * (narrow ? vh * 0.16 : 0.05);
    const shake = burn * 0.008;
    g.position.x = damp(g.position.x, x, 6, delta) + (Math.random() - 0.5) * shake;
    g.position.y = damp(g.position.y, y, 6, delta);
  });

  return (
    <>
      <group ref={group} rotation={progress ? [0, 0, Math.PI / 2] : undefined}>
        <group ref={spin}>
          <Center>
            <primitive object={model} rotation={[-Math.PI / 2, 0, 0]} />
          </Center>
          <object3D ref={nozzle} position={[0, -LENGTH / 2, 0]} />
          {progress && <Flame engine={engine} y={-LENGTH / 2} />}
        </group>
      </group>
      {progress && <Smoke engine={engine} nozzle={nozzle} />}
    </>
  );
};

const Studio = () => (
  <Environment resolution={128}>
    <Lightformer form="rect" intensity={2.4} position={[0, 3, 2]} scale={[6, 2, 1]} />
    <Lightformer form="rect" intensity={1.2} position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[4, 6, 1]} />
    <Lightformer form="rect" intensity={0.8} color="#7f9dff" position={[4, -1, -1]} rotation-y={-Math.PI / 2} scale={[3, 5, 1]} />
  </Environment>
);

/*
  mode="hero"     — scroll-driven launch (pass a framer-motion progress value).
  mode="inspect"  — drag-to-rotate viewer for the Competitions page.
*/
const RocketScene = ({ progress, fit, active = true, mode = 'hero' }) => {
  const [dpr, setDpr] = useState(1.5);
  const pointer = useRef({ x: 0, y: 0 });
  const inspect = mode === 'inspect';

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };

  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: inspect ? [1.8, 0.4, 2.6] : [0, 0, 5.4], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onPointerMove={inspect ? undefined : onPointerMove}
      style={{ background: 'transparent', touchAction: inspect ? 'pan-y' : 'auto' }}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <hemisphereLight args={['#ffffff', '#0a1024', 1.1]} />
      <directionalLight position={[3, 4, 3]} intensity={2.4} />
      <directionalLight position={[-4, -1, -2]} intensity={0.9} color="#2b5bff" />
      <Suspense fallback={null}>
        <Rocket progress={inspect ? null : progress} fit={fit} pointer={pointer} idle={inspect} />
        <Studio />
        {inspect && (
          <ContactShadows position={[0, -LENGTH / 2 - 0.05, 0]} opacity={0.45} scale={3} blur={2.4} far={2} frames={1} />
        )}
      </Suspense>
      {inspect && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
        />
      )}
    </Canvas>
  );
};

export default RocketScene;
