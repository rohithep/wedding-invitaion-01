"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { invitation } from "@/data/invitation";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import {
  FRAMER_VIEWPORT,
  MOTION_DURATION,
  MOTION_EASE_CUBIC,
} from "@/lib/motion/tokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VenueSceneProps {
  reducedMotion: boolean;
}

/**
 * Scene 6: Venue
 * Address, "Get Directions" button, and the hazy mosque & palm silhouette
 * rising gracefully with GSAP ScrollTrigger parallax.
 */
export function VenueScene({ reducedMotion }: VenueSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mosqueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !mosqueRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mosqueRef.current,
        { yPercent: 22, opacity: 0.25, scale: 0.95 },
        {
          yPercent: -4,
          opacity: 0.88,
          scale: 1.03,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 0.45,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const { venue } = invitation;

  return (
    <section
      ref={sectionRef}
      aria-label="Venue and Directions"
      className="relative z-10 -mt-[8dvh] flex min-h-[96dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-10"
    >
      {/* Rising Hazy Mosque & Palm Silhouette */}
      <div
        ref={mosqueRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 mx-auto flex max-w-2xl justify-center sm:justify-end"
      >
        <div className="relative h-64 w-72 sm:h-80 sm:w-96 md:h-96 md:w-[440px]">
          <Image
            src="/assets/mosque-silhouette.webp"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 640px) 288px, 440px"
            loading="lazy"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={FRAMER_VIEWPORT}
        transition={{ duration: MOTION_DURATION.enter, ease: MOTION_EASE_CUBIC }}
        className="relative z-10 mx-auto mb-28 flex max-w-lg flex-col items-center sm:mb-20"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)]/55 bg-[var(--color-ivory-light)]/80">
          <MapPin className="h-4 w-4 text-[var(--color-gold)]" strokeWidth={1.7} />
        </div>

        <p className="type-label mb-3 text-[var(--color-olive-muted)]">
          {venue.eyebrow}
        </p>

        <h2 className="type-h1 text-[var(--color-olive)]">{venue.name}</h2>

        <OrnamentDivider variant="diamond" className="my-5" />

        <p className="type-body text-[var(--color-olive)]">{venue.addressLine1}</p>
        <p className="type-body text-[var(--color-olive-muted)]">
          {venue.addressLine2}
        </p>

        <p className="type-small mt-4 max-w-sm text-[var(--color-olive-muted)]">
          {venue.note}
        </p>

        <motion.a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.3, ease: MOTION_EASE_CUBIC }}
          className="gold-brass-btn mt-8 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[var(--color-olive)] transition-all"
        >
          <span className="type-label">Get Directions</span>
          <ExternalLink className="h-3.5 w-3.5 text-[var(--color-gold)]" strokeWidth={1.7} />
        </motion.a>
      </motion.div>
    </section>
  );
}
