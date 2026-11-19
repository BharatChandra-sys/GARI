import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';

const NOISE = /* glsl */ `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }
`;

/* Flame: an open cylinder reshaped into a plume. Edges fade by view angle, so it reads as a volume. */
const flameVertex = /* glsl */ `
  uniform float uLen;
  uniform float uRad;
  varying float vT;
  varying float vAng;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float t = 0.5 - position.y;                       // 0 at the nozzle, 1 at the tail of the flame
    float r = uRad * (0.9 + 1.7 * t) * (1.0 - 0.7 * smoothstep(0.55, 1.0, t));
    vec3 p = vec3(position.x * r, -t * uLen, position.z * r);
    vT = t;
    vAng = atan(position.z, position.x);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vN = normalize(normalMatrix * vec3(position.x, 0.0, position.z));
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const flameFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPower;
  varying float vT;
  varying float vAng;
  varying vec3 vN;
  varying vec3 vV;
  ${NOISE}
  void main() {
    float facing = abs(dot(vN, vV));
    float n = fbm(vec2(vAng * 1.6, vT * 7.0 - uTime * 11.0));
    float diamonds = 1.0 + 0.35 * smoothstep(0.2, 1.0, sin(vT * 44.0 - 1.2)) * (1.0 - smoothstep(0.05, 0.42, vT));
    float fade = 1.0 - smoothstep(0.25, 1.0, vT + (n - 0.5) * 0.45);
    float hot = (1.0 - smoothstep(0.0, 0.55, vT)) * pow(facing, 1.5);

    vec3 col = mix(vec3(0.55, 0.1, 0.03), vec3(1.0, 0.4, 0.1), smoothstep(0.0, 0.6, facing * (1.0 - vT) + n * 0.35));
    col = mix(col, vec3(1.0, 0.78, 0.38), smoothstep(0.3, 0.75, hot + n * 0.15));
    col = mix(col, vec3(1.0, 0.98, 0.92), smoothstep(0.62, 0.95, hot));

    float a = pow(facing, 1.3) * fade * diamonds * (0.5 + 0.7 * n) * uPower;
    gl_FragColor = vec4(col * (1.15 + hot), a);
  }
`;

const glowVertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const glowFragment = /* glsl */ `
  uniform float uPower;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float a = pow(max(0.0, 1.0 - d), 2.6) * uPower;
    gl_FragColor = vec4(vec3(1.0, 0.55, 0.22) * 1.4, a * 0.9);
  }
`;

/* Everything that lives at the nozzle, in the rocket's own frame. */
export const Flame = ({ engine, y }) => {
  const flame = useRef();
  const light = useRef();
  const geometry = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 40, 24, true), []);
  // Built here rather than as JSX: R3F copies a `uniforms` prop, which would detach per-frame updates.
  const flameMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: flameVertex,
    fragmentShader: flameFragment,
    uniforms: { uTime: { value: 0 }, uPower: { value: 0 }, uLen: { value: 0.3 }, uRad: { value: 0.045 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  }), []);
  const glowMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: glowVertex,
    fragmentShader: glowFragment,
    uniforms: { uPower: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame((state) => {
    const pw = engine.current.power;
    const t = state.clock.elapsedTime;
    const flicker = 0.92 + 0.08 * Math.sin(t * 31) * Math.sin(t * 17.3);
    flameMat.uniforms.uTime.value = t;
    flameMat.uniforms.uPower.value = pw;
    flameMat.uniforms.uLen.value = (0.25 + pw * 1.25) * flicker;
    glowMat.uniforms.uPower.value = pw * flicker;
    if (flame.current) flame.current.visible = pw > 0.01;
    if (light.current) light.current.intensity = pw * 4.5 * flicker;
  });

  return (
    <group position={[0, y, 0]}>
      <mesh ref={flame} geometry={geometry} material={flameMat} frustumCulled={false} />
      <Billboard position={[0, -0.12, 0]}>
        <mesh material={glowMat}>
          <planeGeometry args={[0.9, 0.9]} />
        </mesh>
      </Billboard>
      <pointLight ref={light} position={[0, -0.2, 0.05]} color="#ff8a3d" intensity={0} distance={3} decay={2} />
    </group>
  );
};

const SMOKE_N = 700;

const smokeVertex = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute float aHeat;
  attribute float aSeed;
  uniform float uPx;
  varying float vAlpha;
  varying float vHeat;
  varying float vSeed;
  void main() {
    vAlpha = aAlpha;
    vHeat = aHeat;
    vSeed = aSeed;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPx / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;
const smokeFragment = /* glsl */ `
  varying float vAlpha;
  varying float vHeat;
  varying float vSeed;
  float h(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float n2(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h(i), h(i + vec2(1.0, 0.0)), f.x), mix(h(i + vec2(0.0, 1.0)), h(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    // Each puff gets its own lumpy edge and shade, so overlapping puffs read as billows.
    float lumps = n2(c * 5.0 + vSeed * 17.0) * 0.6 + n2(c * 11.0 + vSeed * 31.0) * 0.4;
    float d = length(c) + (lumps - 0.5) * 0.32;
    float a = smoothstep(0.5, 0.0, d) * vAlpha * (0.55 + 0.6 * lumps);
    vec3 cool = vec3(0.7, 0.73, 0.82) * (0.8 + 0.35 * lumps);
    vec3 warm = vec3(1.0, 0.6, 0.3);
    gl_FragColor = vec4(mix(cool, warm, vHeat), a);
  }
`;

/*
  Smoke trail, simulated in world space. The camera follows the rocket, so the air
  (and everything left in it) streams downward at the rocket's climb speed: engine.flow.
*/
export const Smoke = ({ engine, nozzle }) => {
  const sim = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(SMOKE_N * 3), 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(SMOKE_N), 1));
    g.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(SMOKE_N), 1));
    g.setAttribute('aHeat', new THREE.BufferAttribute(new Float32Array(SMOKE_N), 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(new Float32Array(SMOKE_N), 1));
    return {
      g,
      vel: new Float32Array(SMOKE_N * 3),
      age: new Float32Array(SMOKE_N).fill(99),
      life: new Float32Array(SMOKE_N).fill(1),
      big: new Float32Array(SMOKE_N),
      next: 0,
      carry: 0,
    };
  }, []);
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: smokeVertex,
    fragmentShader: smokeFragment,
    uniforms: { uPx: { value: 600 } },
    transparent: true,
    depthWrite: false,
  }), []);
  const tmp = useMemo(() => ({ at: new THREE.Vector3(), up: new THREE.Vector3() }), []);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const cam = state.camera;
    material.uniforms.uPx.value = (state.size.height * state.viewport.dpr) / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)));

    const n = nozzle.current;
    if (!n) return;
    const { at, up } = tmp;
    n.getWorldPosition(at);
    up.setFromMatrixColumn(n.matrixWorld, 1);
    const s = up.length();
    up.normalize();

    const pos = sim.g.attributes.position.array;
    const size = sim.g.attributes.aSize.array;
    const alpha = sim.g.attributes.aAlpha.array;
    const heat = sim.g.attributes.aHeat.array;
    const { vel, age, life, big } = sim;
    // 1 while the rocket is still on the pad: exhaust hits the ground and rolls outward.
    const pad = 1 - Math.min(1, engine.current.flow / (1.1 * s));

    sim.carry += engine.current.power * 340 * dt;
    while (sim.carry >= 1) {
      const i = sim.next;
      sim.next = (i + 1) % SMOKE_N;
      const o = i * 3;
      const j = 0.05 * s;
      pos[o] = at.x - up.x * 0.12 * s + (Math.random() - 0.5) * j;
      pos[o + 1] = at.y - up.y * 0.12 * s + (Math.random() - 0.5) * j;
      pos[o + 2] = at.z - up.z * 0.12 * s + (Math.random() - 0.5) * j;
      const ex = (1.2 + Math.random() * 0.8) * s * (1 - 0.55 * pad);
      const spread = (0.35 + 3.4 * pad) * s;
      vel[o] = -up.x * ex + (Math.random() - 0.5) * spread;
      vel[o + 1] = -up.y * ex + (Math.random() - 0.5) * spread * (1 - 0.7 * pad);
      vel[o + 2] = -up.z * ex + (Math.random() - 0.5) * spread * 0.6;
      age[i] = 0;
      life[i] = 1.3 + Math.random() * 0.9 + pad * 1.6;
      big[i] = pad;
      sim.g.attributes.aSeed.array[i] = Math.random();
      sim.g.attributes.aSeed.needsUpdate = true;
      sim.carry -= 1;
    }

    const flow = engine.current.flow;
    const drag = Math.exp(-2.2 * dt);
    for (let i = 0; i < SMOKE_N; i += 1) {
      age[i] += dt;
      const k = age[i] / life[i];
      if (k >= 1) {
        alpha[i] = 0;
        continue;
      }
      const o = i * 3;
      vel[o] *= drag; vel[o + 1] *= drag; vel[o + 2] *= drag;
      pos[o] += vel[o] * dt;
      pos[o + 1] += (vel[o + 1] - flow) * dt;
      pos[o + 2] += vel[o + 2] * dt;
      size[i] = (0.07 + (0.5 + 0.35 * big[i]) * Math.sqrt(k)) * s;
      alpha[i] = Math.pow(1 - k, 1.6) * (0.26 - 0.08 * big[i]) * Math.min(1, age[i] * 10);
      heat[i] = Math.max(0, 1 - age[i] * 5);
    }
    sim.g.attributes.position.needsUpdate = true;
    sim.g.attributes.aSize.needsUpdate = true;
    sim.g.attributes.aAlpha.needsUpdate = true;
    sim.g.attributes.aHeat.needsUpdate = true;
  });

  return (
    <points geometry={sim.g} material={material} frustumCulled={false} renderOrder={-1} />
  );
};
