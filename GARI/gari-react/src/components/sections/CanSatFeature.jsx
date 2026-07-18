import { motion, useInView } from 'framer-motion';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';
import './CanSatFeature.css';

// Preload so it's ready before scroll
useGLTF.preload('/models/rocket.gltf');

const RocketModel = () => {
  const { scene } = useGLTF('/models/rocket.gltf');
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.8}
      position={[0, 0, 0]}
    />
  );
};

const RocketCanvas = () => (
  <Canvas
    camera={{ position: [0, 0.5, 3], fov: 45 }}
    gl={{ antialias: true, alpha: true }}
    style={{ background: 'transparent' }}
  >
    <Suspense fallback={null}>
      <Stage
        environment="city"
        intensity={0.6}
        adjustCamera={false}
      >
        <RocketModel />
      </Stage>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Suspense>
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} />
    <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#60a5fa" />
  </Canvas>
);

const specs = [
  { value: '1000 m', label: 'Launch Altitude' },
  { value: 'NavIC', label: 'GNSS Integration' },
  { value: '8', label: 'Subsystems' },
  { value: 'Dual', label: 'Recovery Mechanism' },
];

const highlights = [
  {
    title: 'NavIC GNSS',
    desc: "India's own satellite navigation system — one of the few student CanSats in the country using NavIC over GPS.",
  },
  {
    title: 'Real-Time Telemetry',
    desc: 'Custom RF data link transmitting live sensor packets from launch through landing to a ground station dashboard.',
  },
  {
    title: 'Dual Parachute Recovery',
    desc: 'Drogue chute at apogee for stabilisation, main chute for controlled descent triggered by barometric pressure.',
  },
  {
    title: 'Custom Ground Station',
    desc: 'In-house GCS software for live telemetry visualisation, packet parsing, mission logging, and data export.',
  },
];

const CanSatFeature = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="csf-section" ref={ref} aria-label="CanSat Mission Feature">
      <div className="csf-container">

        {/* Left — content */}
        <motion.div
          className="csf-content"
          initial={{ opacity: 0, x: -28 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="csf-tag">IN-SPACe CAN-7USAT 2026</span>

          <h2>
            A satellite in a can.
            <br />
            <span className="csf-accent">A real aerospace mission.</span>
          </h2>

          <p className="csf-lead">
            GARI's CanSat is a 330 ml form-factor satellite competing in India's national
            student space program. PDR cleared. Eight subsystems. NavIC on board.
          </p>

          {/* Spec pills */}
          <div className="csf-specs" role="list" aria-label="CanSat key specifications">
            {specs.map((s, i) => (
              <motion.div
                key={i}
                className="csf-spec"
                role="listitem"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
              >
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Highlights */}
          <div className="csf-highlights">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                className="csf-highlight"
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.38, delay: 0.35 + i * 0.08 }}
              >
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="csf-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.38, delay: 0.72 }}
          >
            <a href="/cansat" className="csf-btn-primary">Full mission details</a>
            <a href="/team" className="csf-btn-secondary">Meet the CanSat team</a>
          </motion.div>
        </motion.div>

        {/* Right — visual */}
        <motion.div
          className="csf-visual"
          initial={{ opacity: 0, x: 28 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="csf-image-wrap csf-image-wrap--3d">
            <RocketCanvas />

            {/* Floating PDR badge */}
            <div className="csf-badge" aria-label="PDR Cleared milestone">
              <span className="csf-badge-dot" aria-hidden="true" />
              <span>PDR Cleared</span>
            </div>
          </div>

          {/* Phase status strip below image */}
          <div className="csf-status-strip" aria-label="Current program phase">
            <div className="csf-status-item csf-status-item--done">
              <span className="csf-status-dot" aria-hidden="true" />
              PDR
            </div>
            <div className="csf-status-divider" aria-hidden="true" />
            <div className="csf-status-item csf-status-item--active">
              <span className="csf-status-dot" aria-hidden="true" />
              CDR
            </div>
            <div className="csf-status-divider" aria-hidden="true" />
            <div className="csf-status-item csf-status-item--upcoming">
              <span className="csf-status-dot" aria-hidden="true" />
              Build
            </div>
            <div className="csf-status-divider" aria-hidden="true" />
            <div className="csf-status-item csf-status-item--upcoming">
              <span className="csf-status-dot" aria-hidden="true" />
              Launch
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CanSatFeature;
