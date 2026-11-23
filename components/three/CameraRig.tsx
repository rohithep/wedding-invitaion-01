"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

/**
 * Continuous CatmullRomCurve3 camera path driven by master GSAP scroll progress.
 * Pushes gently through the Hero arch into Blessing, drifts past the lantern into Couple,
 * rises softly through Venue & Schedule, and settles warmly on the Closing lantern.
 */
export function CameraRig({ progressRef, reducedMotion }: CameraRigProps) {
  const { camera } = useThree();
  const smoothProgress = useRef(0);

  const { positionCurve, lookAtCurve } = useMemo(() => {
    const pos = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.25, 6.2),    // 0.00 Hero start (before arch)
      new THREE.Vector3(0, 0.1, 3.2),     // 0.14 Push through arch -> Blessing
      new THREE.Vector3(0.45, -0.35, 1.4),// 0.28 Drift past lantern -> Couple
      new THREE.Vector3(-0.35, -0.8, 0.2),// 0.45 Event details
      new THREE.Vector3(0.15, -1.25, -1.0),// 0.62 Venue (mosque horizon)
      new THREE.Vector3(-0.2, -1.7, -2.2),// 0.78 Schedule & Gallery
      new THREE.Vector3(0, -2.0, -3.4),   // 1.00 Closing warm glow
    ]);

    const look = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.15, 0),
      new THREE.Vector3(0, -0.1, -1.5),
      new THREE.Vector3(0.1, -0.55, -2.5),
      new THREE.Vector3(-0.1, -0.95, -3.6),
      new THREE.Vector3(0, -1.35, -4.8),
      new THREE.Vector3(0, -1.8, -5.8),
      new THREE.Vector3(0, -2.05, -6.8),
    ]);

    return { positionCurve: pos, lookAtCurve: look };
  }, []);

  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const t = Math.min(1, Math.max(0, progressRef.current));
    const lerpRate = reducedMotion ? 1 : 1 - Math.exp(-delta * 5.2);
    smoothProgress.current += (t - smoothProgress.current) * lerpRate;

    positionCurve.getPointAt(smoothProgress.current, targetPos);
    lookAtCurve.getPointAt(smoothProgress.current, targetLook);

    if (!reducedMotion) {
      // Subtle organic golden-hour breathing drift
      const elapsed = state.clock.elapsedTime;
      targetPos.x += Math.sin(elapsed * 0.28) * 0.08;
      targetPos.y += Math.cos(elapsed * 0.22) * 0.05;
    }

    camera.position.lerp(targetPos, reducedMotion ? 1 : 0.12);
    camera.lookAt(targetLook);
  });

  return null;
}
