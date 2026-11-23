"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { invitation } from "@/data/invitation";
import { ArchPhotoFrame } from "@/components/ui/ArchPhotoFrame";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import {
  FRAMER_VIEWPORT,
  MOTION_DURATION,
  MOTION_EASE_CUBIC,
} from "@/lib/motion/tokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CoupleSceneProps {
  reducedMotion: boolean;
}

/**
 * Scene 4: The Couple & Families
 * Arch-masked portraits (gentle scale-in + subtle opposite-speed GSAP parallax)
 * paired with bride & groom names and parents' names.
 */
export function CoupleScene({ reducedMotion }: CoupleSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const brideParallaxRef = useRef<HTMLDivElement>(null);
  const groomParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (brideParallaxRef.current) {
        gsap.fromTo(
          brideParallaxRef.current,
          { y: 26 },
          {
            y: -22,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.45,
            },
          }
        );
      }

      if (groomParallaxRef.current) {
        gsap.fromTo(
          groomParallaxRef.current,
          { y: 42 },
          {
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.55,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const { bride, groom } = invitation.couple;

  return (
    <section
      ref={sectionRef}
      aria-label="The Couple and Families"
      className="relative z-10 -mt-[8dvh] flex min-h-dvh w-full flex-col items-center justify-center px-6 py-24 text-center sm:px-10"
    >
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={FRAMER_VIEWPORT}
          transition={{ duration: MOTION_DURATION.enter, ease: MOTION_EASE_CUBIC }}
          className="mb-12 flex flex-col items-center"
        >
          <p className="type-label mb-3 text-[var(--color-olive-muted)]">
            Together With Their Families
          </p>
          <h2 className="type-h1 text-[var(--color-olive)]">
            The Bride &amp; Groom
          </h2>
          <OrnamentDivider variant="heart" className="mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-10">
          {/* Bride */}
          <div ref={brideParallaxRef} className="flex flex-col items-center">
            <ArchPhotoFrame
              src={bride.photo}
              alt={bride.photoAlt}
              placeholderLabel={bride.firstName}
              placeholderInitial="L"
              className="aspect-[3/4] w-60 sm:w-72"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={FRAMER_VIEWPORT}
              transition={{
                delay: 0.15,
                duration: MOTION_DURATION.enter,
                ease: MOTION_EASE_CUBIC,
              }}
              className="mt-6 max-w-xs"
            >
              <h3 className="type-h1 font-script leading-tight text-[var(--color-olive)]">
                {bride.fullName}
              </h3>
              <p className="type-small mt-2 leading-relaxed text-[var(--color-olive-muted)]">
                {bride.parentsLine}
              </p>
            </motion.div>
          </div>

          {/* Groom */}
          <div
            ref={groomParallaxRef}
            className="flex flex-col items-center md:mt-10"
          >
            <ArchPhotoFrame
              src={groom.photo}
              alt={groom.photoAlt}
              placeholderLabel={groom.firstName}
              placeholderInitial="R"
              className="aspect-[3/4] w-60 sm:w-72"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={FRAMER_VIEWPORT}
              transition={{
                delay: 0.22,
                duration: MOTION_DURATION.enter,
                ease: MOTION_EASE_CUBIC,
              }}
              className="mt-6 max-w-xs"
            >
              <h3 className="type-h1 font-script leading-tight text-[var(--color-olive)]">
                {groom.fullName}
              </h3>
              <p className="type-small mt-2 leading-relaxed text-[var(--color-olive-muted)]">
                {groom.parentsLine}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
