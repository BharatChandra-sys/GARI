import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, ContactShadows, Environment, Lightformer, OrbitControls, PerformanceMonitor, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL = '/models/rocket.glb';
const LENGTH = 1.75; // nose-to-tail length of the CDR model, in scene units
useGLTF.preload(MODEL);

/* Exhaust plume: additive, soft-edged cone whose length follows scroll progress. */
const plumeVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const plumeFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPower;
  varying vec2 vUv;
  void main() {
    float along = vUv.y;                         // 1 at the nozzle, 0 at the tip
    float edge = 1.0 - abs(vUv.x - 0.5) * 2.0;   // soft rim around the cone
    float flicker = 0.85 + 0.15 * sin(uTime * 40.0 + along * 18.0);
    float a = pow(along, 1.6) * pow(max(edge, 0.0), 1.5) * flicker * uPower;
    vec3 core = vec3(1.0, 0.95, 0.85);
    vec3 outer = vec3(1.0, 0.35, 0.12);
    gl_FragColor = vec4(mix(outer, core, pow(along, 3.0)), a);
  }
`;

const Plume = ({ progress }) => {
  const mesh = useRef();
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPower: { value: 0 } }), []);

  useFrame((state, delta) => {
    const p = progress ? progress.get() : 0;
    // Burn, then coast: the motor lights after the rocket stands up and cuts out before apogee.
    const power = THREE.MathUtils.smoothstep(p, 0.36, 0.42) * (1 - THREE.MathUtils.smoothstep(p, 0.6, 0.68));
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uPower.value = THREE.MathUtils.damp(uniforms.uPower.value, power, 8, delta);
    if (mesh.current) {
      const len = 0.2 + uniforms.uPower.value * 1.4;
      mesh.current.scale.set(1, len, 1);
      mesh.current.position.y = -LENGTH / 2 - len / 2;
      mesh.current.visible = uniforms.uPower.value > 0.01;
    }
  });

  return (
    <mesh ref={mesh} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[0.075, 1, 32, 1, true]} />
      <shaderMaterial
        vertexShader={plumeVertex}
        fragmentShader={plumeFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/* The GARI rocket (CDR geometry), re-skinned in satin ceramic white. */
const Rocket = ({ progress, pointer, idle = true, fit }) => {
  const { scene } = useGLTF(MODEL);
  const group = useRef();
  const spin = useRef();

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const body = new THREE.MeshStandardMaterial({ color: '#f2f2f4', roughness: 0.42, metalness: 0.05, side: THREE.DoubleSide });
    clone.traverse((o) => {
      if (o.isMesh) o.material = body;
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
      0.00–0.20  lying on the drawing, nose left, sized to match the blueprint
      0.20–0.36  stands up
      0.36–0.68  burn (shake + plume), then coast
      0.86–1.00  apogee: noses over and moves aside for the copy
    */
    const { smoothstep, damp, lerp } = THREE.MathUtils;
    const p = progress.get();
    const { width: vw, height: vh } = state.viewport;
    const narrow = vw < vh * 0.8;
    const stand = smoothstep(p, 0.2, 0.36);
    const burn = smoothstep(p, 0.36, 0.42) * (1 - smoothstep(p, 0.6, 0.68));
    const climb = smoothstep(p, 0.4, 0.86);
    const apogee = smoothstep(p, 0.86, 0.98);

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
    <group ref={group} rotation={progress ? [0, 0, Math.PI / 2] : undefined}>
      <group ref={spin}>
        <Center>
          <primitive object={model} rotation={[-Math.PI / 2, 0, 0]} />
        </Center>
        {progress && <Plume progress={progress} />}
      </group>
    </group>
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
