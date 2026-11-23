"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useInvitationScroll } from "@/lib/motion/SmoothScrollProvider";
import { CameraRig } from "@/components/three/CameraRig";
import { GoldDustParticles } from "@/components/three/GoldDustParticles";
import { AtmosphericPlanes } from "@/components/three/AtmosphericPlanes";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

interface InvitationCanvasProps {
  use3D: boolean;
  reducedMotion: boolean;
}

/**
 * Fixed atmospheric 3D WebGL canvas (DPR capped at 2) with automatic lightweight
 * 2D fallback for low-end devices or prefers-reduced-motion.
 */
export function InvitationCanvas({
  use3D,
  reducedMotion,
}: InvitationCanvasProps) {
  const { progressRef } = useInvitationScroll();

  if (!use3D) {
    // Lightweight 2D fallback (zero WebGL overhead)
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      >
        <div className="relative h-full w-full opacity-45 mix-blend-screen">
          <Image
            src="/assets/gold-dust-bokeh.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2]"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 44, near: 0.1, far: 40, position: [0, 0.25, 6.2] }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} />
        <GoldDustParticles count={120} reducedMotion={reducedMotion} />
        <AtmosphericPlanes
          progressRef={progressRef}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
