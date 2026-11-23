"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GoldDustParticlesProps {
  count?: number;
  reducedMotion: boolean;
}

/**
 * Instanced 3D drifting antique-gold dust motes & soft ivory petals
 * spanning the full depth of the camera path.
 */
export function GoldDustParticles({
  count = 140,
  reducedMotion,
}: GoldDustParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random distribution for consistent SSR/CSR
      const s1 = Math.sin(i * 12.9898) * 43758.5453;
      const s2 = Math.sin(i * 78.233) * 43758.5453;
      const s3 = Math.sin(i * 39.425) * 43758.5453;
      const r1 = s1 - Math.floor(s1);
      const r2 = s2 - Math.floor(s2);
      const r3 = s3 - Math.floor(s3);

      items.push({
        x: (r1 - 0.5) * 9.5,
        y: (r2 - 0.5) * 7.5 - 0.8,
        z: 4.5 - r3 * 12.0,
        scale: 0.014 + (i % 7) * 0.0045,
        speedY: 0.04 + (i % 5) * 0.012,
        phase: r1 * Math.PI * 2,
      });
    }
    return items;
  }, [count]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = reducedMotion ? 0 : state.clock.elapsedTime;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const yOffset = ((t * p.speedY + p.phase) % 4.5) - 2.25;
      dummy.position.set(
        p.x + Math.sin(t * 0.35 + p.phase) * 0.16,
        p.y + yOffset * 0.35,
        p.z
      );
      const pulse = 0.8 + Math.sin(t * 1.1 + p.phase) * 0.25;
      dummy.scale.setScalar(p.scale * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#d8b970"
        transparent
        opacity={0.58}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
