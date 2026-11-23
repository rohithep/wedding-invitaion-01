"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AtmosphericPlanesProps {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

/**
 * Soft 3D golden-hour luminous halos & subtle translucent arch rings positioned
 * along the Z-axis so the camera glides organically through warm depth layers.
 */
export function AtmosphericPlanes({
  progressRef,
  reducedMotion,
}: AtmosphericPlanesProps) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    const p = progressRef.current;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = Math.sin(t * 0.15) * 0.03;
      const mat = ring1Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0.06, 0.26 - p * 0.35);
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -Math.cos(t * 0.12) * 0.03;
    }

    if (glowRef.current) {
      const s = 1 + Math.sin(t * 0.55) * 0.06;
      glowRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group>
      {/* Subtle floating antique-gold arch aura near Hero depth */}
      <mesh ref={ring1Ref} position={[0, 0.15, 2.2]}>
        <ringGeometry args={[1.65, 1.675, 64]} />
        <meshBasicMaterial
          color="#c5a45c"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Mid-journey golden-hour luminous halo */}
      <mesh ref={ring2Ref} position={[0.1, -0.95, -1.6]}>
        <ringGeometry args={[2.1, 2.12, 64]} />
        <meshBasicMaterial
          color="#d7be82"
          transparent
          opacity={0.14}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Closing warm lantern ember glow in deep space */}
      <mesh ref={glowRef} position={[0, -2.05, -6.2]}>
        <circleGeometry args={[2.6, 32]} />
        <meshBasicMaterial
          color="#f0d592"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
