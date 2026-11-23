"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { invitation } from "@/data/invitation";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { MOTION_DURATION, MOTION_EASE_CUBIC } from "@/lib/motion/tokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSceneProps {
  gateOpened: boolean;
  reducedMotion: boolean;
}

/**
 * Scene 2: Photorealistic Hero Sanctuary Archway
 * Uses the text-free carved Moroccan plaster archway photograph (/assets/photo/hero-archway.webp)
 * with real animated HTML typography (Arabic Bismillah, handwriting wipe on Lubaiba & Raees,
 * date & tagline) layered cleanly inside the sunlit plaster center.
 * Scrolling gently pushes the camera forward through the archway into Scene 3.
 */
export function HeroScene({ gateOpened, reducedMotion }: HeroSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoArchRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.45,
        },
      });

      // Smooth push-through-arch zoom as the guest scrolls into Blessing
      if (photoArchRef.current) {
        tl.to(
          photoArchRef.current,
          {
            scale: 1.18,
            opacity: 0.12,
            yPercent: -4,
            force3D: true,
            ease: "none",
          },
          0
        );
      }

      if (contentRef.current) {
        tl.to(
          contentRef.current,
          {
            yPercent: -14,
            opacity: 0.15,
            scale: 0.97,
            force3D: true,
            ease: "none",
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const revealState = gateOpened ? "visible" : "hidden";

  return (
    <section
      ref={sectionRef}
      aria-label="Nikkah Hero Invitation"
      className="relative z-10 min-h-[135svh] w-full"
    >
      {/* Keep sticky container strictly transform-free to prevent mobile sticky jitter */}
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            gateOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
          }
          transition={{ duration: 1.55, ease: MOTION_EASE_CUBIC }}
          className="relative flex h-full w-full items-center justify-center"
        >
          {/* Photorealistic Carved Moroccan Plaster Archway Background (Text-Free) */}
          <div
            ref={photoArchRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
          >
            <div className="relative h-full w-full max-w-[600px] sm:max-w-[660px]">
              <Image
                src="/assets/photo/hero-archway.webp"
                alt=""
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 660px"
              />
              {/* Soft warm breathing candlelight shimmer over the photo's hanging lantern */}
              <div
                className="animate-glow-breathe absolute top-[32%] right-[24%] h-24 w-24 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,222,140,0.45) 0%, rgba(215,170,80,0.12) 50%, transparent 74%)",
                }}
              />
              {/* Bottom soft fade into sunlit plaster (replaces GPU-heavy CSS maskImage) */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(239,227,206,0.92) 100%)",
                }}
              />
              {/* Soft horizontal feathering on wide desktop screens so the arch blends into the sunlit plaster */}
              <div
                className="hidden sm:block absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(239,227,206,0.75) 0%, transparent 12%, transparent 88%, rgba(239,227,206,0.75) 100%)",
                }}
              />
            </div>
          </div>

        {/* Real Animated HTML Typography seated cleanly inside the sunlit archway center */}
        <div
          ref={contentRef}
          className="relative z-20 mx-auto flex max-w-[340px] flex-col items-center px-6 pt-8 pb-12 text-center will-change-transform sm:max-w-[420px]"
        >
          {/* Real Arabic Bismillah */}
          <motion.p
            lang="ar"
            className="type-arabic mb-1.5 sm:mb-2"
            initial={{ opacity: 0, y: 14 }}
            animate={
              revealState === "visible"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            transition={{
              delay: 0.15,
              duration: MOTION_DURATION.enter,
              ease: MOTION_EASE_CUBIC,
            }}
          >
            {invitation.bismillah.arabic}
          </motion.p>

          {/* SAVE THE DATE */}
          <motion.p
            className="type-label mb-2.5"
            initial={{ opacity: 0, y: 12 }}
            animate={
              revealState === "visible"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              delay: 0.28,
              duration: MOTION_DURATION.enter,
              ease: MOTION_EASE_CUBIC,
            }}
          >
            {invitation.event.eyebrow}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.7 }}
            animate={
              revealState === "visible"
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0.7 }
            }
            transition={{
              delay: 0.36,
              duration: MOTION_DURATION.enter,
              ease: MOTION_EASE_CUBIC,
            }}
            className="mb-3.5 sm:mb-4"
          >
            <OrnamentDivider variant="diamond" />
          </motion.div>

          {/* Couple Names — soft left-to-right clip-path handwriting wipe */}
          <motion.h1
            className="type-display px-2 leading-none"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.2 }}
            animate={
              revealState === "visible"
                ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                : { clipPath: "inset(0 100% 0 0)", opacity: 0.2 }
            }
            transition={{
              delay: 0.45,
              duration: 1.3,
              ease: MOTION_EASE_CUBIC,
            }}
          >
            {invitation.couple.bride.firstName}
          </motion.h1>

          <motion.span
            className="type-h2 font-script my-0.5 text-[var(--color-olive-muted)]"
            initial={{ opacity: 0 }}
            animate={revealState === "visible" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.78, duration: 0.7, ease: MOTION_EASE_CUBIC }}
          >
            and
          </motion.span>

          <motion.h1
            className="type-display px-2 leading-none"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.2 }}
            animate={
              revealState === "visible"
                ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                : { clipPath: "inset(0 100% 0 0)", opacity: 0.2 }
            }
            transition={{
              delay: 0.88,
              duration: 1.3,
              ease: MOTION_EASE_CUBIC,
            }}
          >
            {invitation.couple.groom.firstName}
          </motion.h1>

          {/* Vine-heart ornament */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              revealState === "visible"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{
              delay: 1.15,
              duration: MOTION_DURATION.enter,
              ease: MOTION_EASE_CUBIC,
            }}
            className="my-3.5 sm:my-4"
          >
            <OrnamentDivider variant="heart" />
          </motion.div>

          {/* OUR NIKKAH · DECEMBER 26 */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={
              revealState === "visible"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{
              delay: 1.28,
              duration: MOTION_DURATION.enter,
              ease: MOTION_EASE_CUBIC,
            }}
          >
            <p className="type-label mb-1">{invitation.event.title}</p>
            <p className="type-label mb-1 text-[var(--color-olive-muted)]">
              {invitation.event.month}
            </p>
            <div className="mb-2.5 flex items-center gap-4">
              <span className="h-[1px] w-10 bg-[var(--color-gold)]/80" />
              <span className="type-h1 leading-none">
                {invitation.event.dayNumber}
              </span>
              <span className="h-[1px] w-10 bg-[var(--color-gold)]/80" />
            </div>
            <p className="type-label max-w-[230px] leading-relaxed text-[var(--color-olive-muted)]">
              {invitation.couple.tagline}
            </p>
          </motion.div>
        </div>

        {/* Gentle scroll cue at bottom */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={
            revealState === "visible" ? { opacity: 0.78 } : { opacity: 0 }
          }
          transition={{ delay: 1.7, duration: 0.9, ease: MOTION_EASE_CUBIC }}
          className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
        >
          <span className="type-label text-[var(--color-olive-muted)]">
            Scroll
          </span>
          <span className="block h-6 w-[1px] bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
