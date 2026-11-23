"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PetalTransitionLayerProps {
  reducedMotion: boolean;
}

/**
 * GPU-composited floating rose petals & baby's-breath transition layer.
 * Uses pre-baked shadow & soft-focus WebPs (zero live CSS blur/drop-shadow during scroll)
 * with tight Apple-style scrub physics locked to GPU translate3d transforms.
 */
export function PetalTransitionLayer({
  reducedMotion,
}: PetalTransitionLayerProps) {
  const driftARef = useRef<HTMLDivElement>(null);
  const driftBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (driftARef.current) {
        gsap.fromTo(
          driftARef.current,
          { yPercent: 18, xPercent: -4, rotate: -6, opacity: 0.74, force3D: true },
          {
            yPercent: -38,
            xPercent: 6,
            rotate: 12,
            opacity: 0.45,
            force3D: true,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.45,
            },
          }
        );
      }

      if (driftBRef.current) {
        gsap.fromTo(
          driftBRef.current,
          { yPercent: 32, xPercent: 5, rotate: 10, opacity: 0.22, force3D: true },
          {
            yPercent: -26,
            xPercent: -6,
            rotate: -14,
            opacity: 0.65,
            force3D: true,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "20% top",
              end: "bottom bottom",
              scrub: 0.55,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[18] overflow-hidden"
      style={{ contain: "layout paint" }}
    >
      {/* Near-camera crisp floating petals drift (pre-baked shadow WebP) */}
      <div
        ref={driftARef}
        className="absolute top-[12%] -right-8 h-[68dvh] w-[62vw] max-w-[460px] opacity-60 will-change-transform"
      >
        <Image
          src="/assets/photo/petals-transition.webp"
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 640px) 62vw, 460px"
        />
      </div>

      {/* Deeper soft-focus counter-drifting petals (pre-baked blur + shadow WebP) */}
      <div
        ref={driftBRef}
        className="absolute top-[36%] -left-10 h-[62dvh] w-[58vw] max-w-[420px] opacity-42 will-change-transform"
      >
        <Image
          src="/assets/photo/petals-transition-soft.webp"
          alt=""
          fill
          className="-scale-x-100 object-contain"
          sizes="(max-width: 640px) 58vw, 420px"
        />
      </div>
    </div>
  );
}
