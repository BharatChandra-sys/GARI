import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Rocket3D = () => {
  const rocketRef = useRef();
  const exhaustRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Rocket floating animation
    if (rocketRef.current) {
      rocketRef.current.position.y = Math.sin(time * 0.5) * 0.3;
      rocketRef.current.rotation.y = time * 0.2;
      rocketRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }

    // Exhaust glow animation
    if (exhaustRef.current) {
      exhaustRef.current.scale.y = 1 + Math.sin(time * 5) * 0.2;
      exhaustRef.current.material.opacity = 0.6 + Math.sin(time * 5) * 0.2;
    }
  });

  return (
    <group ref={rocketRef}>
      {/* Rocket Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 2, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.8}
          roughness={0.2}
          emissive="#1e40af"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Rocket Nose Cone */}
      <mesh position={[0, 1.3, 0]}>
        <coneGeometry args={[0.3, 0.8, 32]} />
        <meshStandardMaterial
          color="#60a5fa"
          metalness={0.9}
          roughness={0.1}
          emissive="#2563eb"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Rocket Fins */}
      {[0, 120, 240].map((angle, i) => {
        const radian = (angle * Math.PI) / 180;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(radian) * 0.4,
              -0.8,
              Math.sin(radian) * 0.4,
            ]}
            rotation={[0, radian, 0]}
          >
            <boxGeometry args={[0.1, 0.6, 0.4]} />
            <meshStandardMaterial
              color="#1e40af"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        );
      })}

      {/* Rocket Window */}
      <mesh position={[0, 0.5, 0.31]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          color="#60a5fa"
          metalness={1}
          roughness={0}
          emissive="#3b82f6"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Exhaust Flame */}
      <mesh ref={exhaustRef} position={[0, -1.5, 0]}>
        <coneGeometry args={[0.35, 1, 32]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Exhaust Glow */}
      <pointLight
        position={[0, -2, 0]}
        color="#f97316"
        intensity={2}
        distance={5}
      />

      {/* Rocket Glow */}
      <pointLight
        position={[0, 0, 0]}
        color="#3b82f6"
        intensity={1}
        distance={8}
      />
    </group>
  );
};

export default Rocket3D;
