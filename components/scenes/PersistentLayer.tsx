"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PersistentLayerProps {
  reducedMotion: boolean;
}

/**
 * Fixed photorealistic architectural sanctuary layer shared seamlessly across all scenes:
 * - Real sunlit travertine/plaster wall cross-fading into warm cream-silk candlelight
 * - Continuous golden-hour color grade wash (Travertine -> Golden Hour -> Warm Stucco -> Sanctuary Ivory)
 * - Live drifting dappled olive-tree sunlight shadows (multiply blend)
 * - Volumetric golden-hour sunbeams (screen blend)
 * - Out-of-focus DSLR foreground bokeh baby's-breath branches for real camera depth of field
 * - Persistent hanging antique brass filigree lantern gliding smoothly across scroll
 */
export function PersistentLayer({ reducedMotion }: PersistentLayerProps) {
  const goldenTintRef = useRef<HTMLDivElement>(null);
  const sageTintRef = useRef<HTMLDivElement>(null);
  const silkRef = useRef<HTMLDivElement>(null);
  const draperyRef = useRef<HTMLDivElement>(null);
  const lanternWrapRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const bokehFgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // GPU-only opacity cross-fades (replaces CPU-repainting backgroundColor interpolation)
      if (goldenTintRef.current) {
        gsap.fromTo(
          goldenTintRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "8% top",
              end: "48% bottom",
              scrub: 0.45,
            },
          }
        );
      }

      if (sageTintRef.current) {
        const sageTl = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: "38% top",
            end: "92% bottom",
            scrub: 0.45,
          },
        });
        sageTl
          .fromTo(sageTintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "none" })
          .to(sageTintRef.current, { opacity: 0, duration: 0.5, ease: "none" });
      }

      // Cross-fade in the dreamy cream-silk candlelight backdrop in lower scenes
      if (silkRef.current) {
        gsap.fromTo(
          silkRef.current,
          { opacity: 0.08, scale: 1.04, force3D: true },
          {
            opacity: 0.42,
            scale: 1.12,
            force3D: true,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "35% top",
              end: "bottom bottom",
              scrub: 0.5,
            },
          }
        );
      }

      // Persistent hanging antique brass lantern fades in cleanly AFTER Hero (which has its own real lantern)
      // and fades out smoothly before Closing (which has its own real travertine-ledge lantern)
      if (lanternWrapRef.current) {
        const lanternTl = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });

        lanternTl
          .fromTo(
            lanternWrapRef.current,
            { opacity: 0, y: -18, scale: 0.86, force3D: true },
            { opacity: 0.9, y: 24, x: -10, scale: 0.94, force3D: true, duration: 0.22, ease: "none" }
          )
          .to(lanternWrapRef.current, {
            y: 4,
            x: 8,
            scale: 0.82,
            opacity: 0.72,
            force3D: true,
            duration: 0.48,
            ease: "none",
          })
          .to(lanternWrapRef.current, {
            y: -20,
            scale: 0.85,
            opacity: 0,
            force3D: true,
            duration: 0.3,
            ease: "none",
          });
      }

      // Sheer drapery gentle vertical parallax
      if (draperyRef.current) {
        gsap.to(draperyRef.current, {
          yPercent: -10,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
      }

      // Out-of-focus foreground DSLR bokeh florals drifting faster for depth of field
      if (bokehFgRef.current) {
        gsap.to(bokehFgRef.current, {
          yPercent: -18,
          xPercent: -4,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
          },
        });
      }

      // Golden-hour sunbeams breathing with scroll
      if (raysRef.current) {
        gsap.to(raysRef.current, {
          opacity: 0.56,
          scale: 1.08,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "55% bottom",
            scrub: 0.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: "layout paint" }}
    >
      {/* 1. Photorealistic Sunlit Travertine / Plaster Wall */}
      <div className="absolute inset-0">
        <Image
          src="/assets/photo/sunlit-plaster-bg.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* 2. Dreamy Cream-Silk Candlelight Cross-fade Layer */}
      <div ref={silkRef} className="absolute inset-0 opacity-10">
        <Image
          src="/assets/photo/silk-sanctuary-bg.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* 3. GPU-only opacity color-grade washes (Golden Hour + Soft Hazy Sage) */}
      <div
        ref={goldenTintRef}
        className="absolute inset-0 opacity-0 will-change-[opacity]"
        style={{ backgroundColor: "rgba(232, 202, 152, 0.22)" }}
      />
      <div
        ref={sageTintRef}
        className="absolute inset-0 opacity-0 will-change-[opacity]"
        style={{ backgroundColor: "rgba(196, 194, 166, 0.22)" }}
      />

      {/* 4. Architectural Vignette & Warm Sunlight Depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 52% 38%, rgba(255,248,232,0.22) 0%, rgba(220,198,162,0.12) 58%, rgba(86,64,32,0.22) 100%)",
        }}
      />

      {/* 5. Dappled Olive-Tree Sunlight Shadows (static GPU layer — avoids 60fps multiply repaints) */}
      <div className="absolute -inset-4 opacity-34 mix-blend-multiply">
        <Image
          src="/assets/leaf-shadows.webp"
          alt=""
          fill
          className="object-cover object-right-top"
          sizes="100vw"
          priority
        />
      </div>

      {/* 6. Volumetric Golden-Hour Sunbeams (screen) */}
      <div
        ref={raysRef}
        className="absolute inset-0 opacity-38 mix-blend-screen"
      >
        <Image
          src="/assets/light-rays.webp"
          alt=""
          fill
          className="object-cover object-right-top"
          sizes="100vw"
          priority
        />
      </div>

      {/* 7. Sheer sunlit white silk drapery framing left edge */}
      <div
        ref={draperyRef}
        className="absolute -top-6 -left-6 h-[112dvh] w-[42vw] max-w-[340px] opacity-65 sm:w-[28vw]"
      >
        <Image
          src="/assets/drapery-sheer.webp"
          alt=""
          fill
          className="object-cover object-left"
          sizes="(max-width: 640px) 42vw, 340px"
          priority
        />
      </div>

      {/* 8. Persistent hanging antique brass filigree lantern (top-right, mid-scenes) */}
      <div
        ref={lanternWrapRef}
        className="absolute -top-2 right-2 z-[3] w-20 opacity-0 sm:right-8 sm:w-28 md:right-14 md:w-32"
      >
        <div className="animate-lantern-sway relative">
          <div
            className="animate-glow-breathe pointer-events-none absolute top-[56%] left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-40 sm:w-40"
            style={{
              background:
                "radial-gradient(circle, rgba(255,216,128,0.68) 0%, rgba(210,160,72,0.24) 46%, transparent 74%)",
            }}
          />
          <Image
            src="/assets/lantern-hanging.webp"
            alt=""
            width={228}
            height={716}
            className="relative h-auto w-full"
            priority
          />
        </div>
      </div>

      {/* 9. Out-of-Focus DSLR Foreground Bokeh Baby's-Breath Sprig (depth of field) */}
      <div
        ref={bokehFgRef}
        className="fixed -bottom-10 -left-10 z-[15] w-44 opacity-55 sm:w-64"
      >
        <Image
          src="/assets/photo/bokeh-florals-fg.webp"
          alt=""
          width={651}
          height={712}
          className="h-auto w-full -scale-y-100"
          priority
        />
      </div>
    </div>
  );
}
