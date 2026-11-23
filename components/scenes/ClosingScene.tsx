"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { invitation } from "@/data/invitation";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import {
  FRAMER_VIEWPORT,
  MOTION_DURATION,
  MOTION_EASE_CUBIC,
} from "@/lib/motion/tokens";

/**
 * Scene 9: Photorealistic Candlelit Silk & Brass Alcove Closing
 * Uses the text-free sunlit travertine alcove photograph (/assets/photo/closing-alcove.webp)
 * with sheer silk curtains & glowing brass lantern resting on the bottom stone ledge.
 */
export function ClosingScene() {
  const { couple, closing, event } = invitation;
  const whatsappUrl = `https://wa.me/${closing.whatsappNumber}?text=${encodeURIComponent(
    closing.whatsappPrefill
  )}`;

  return (
    <footer
      aria-label="Closing and Family Compliments"
      className="relative z-10 -mt-[6dvh] flex min-h-[108dvh] w-full flex-col items-center justify-start overflow-hidden px-6 pt-24 pb-44 text-center sm:px-10 sm:pb-52"
    >
      {/* Photorealistic Candlelit Silk & Travertine Lantern Alcove Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex justify-center"
      >
        <div
          className="relative h-full w-full max-w-[680px]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 16%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 16%, black 100%)",
          }}
        >
          <Image
            src="/assets/photo/closing-alcove.webp"
            alt=""
            fill
            loading="lazy"
            className="object-cover object-bottom"
            sizes="(max-width: 680px) 100vw, 680px"
          />
          {/* Subtle warm breathing glow over the brass lantern on the ledge */}
          <div
            className="animate-glow-breathe absolute bottom-[18%] left-[26%] h-36 w-36 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,216,128,0.45) 0%, rgba(210,160,72,0.14) 50%, transparent 74%)",
            }}
          />
          {/* Horizontal desktop feathering into sunlit plaster */}
          <div
            className="hidden sm:block absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(239,227,206,0.82) 0%, transparent 14%, transparent 86%, rgba(239,227,206,0.82) 100%)",
            }}
          />
        </div>
      </div>

      {/* Real Typography seated cleanly in the sunlit plaster alcove above the stone ledge */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={FRAMER_VIEWPORT}
        transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE_CUBIC }}
        className="relative z-10 mx-auto flex max-w-md flex-col items-center"
      >
        <p className="type-label mb-3 text-[var(--color-olive-muted)]">
          {closing.eyebrow}
        </p>

        <h2 className="type-h1 font-script leading-tight text-[var(--color-olive)]">
          {couple.tagline}
        </h2>

        <OrnamentDivider variant="heart" className="my-5" />

        <p className="type-body max-w-sm text-[var(--color-olive)]">
          {closing.thankYou}
        </p>

        {/* With Best Compliments From */}
        <div className="mt-8">
          <p className="type-label mb-2.5 text-[var(--color-gold-dark)]">
            {closing.complimentsHeading}
          </p>
          <ul className="space-y-1">
            {closing.families.map((family) => (
              <li
                key={family}
                className="type-body text-[var(--color-olive-muted)]"
              >
                {family}
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp Contact Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.3, ease: MOTION_EASE_CUBIC }}
          className="gold-brass-btn mt-8 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[var(--color-olive)] transition-all"
        >
          <MessageCircle
            className="h-4 w-4 text-[var(--color-olive)]"
            strokeWidth={1.7}
          />
          <span className="type-label">{closing.whatsappLabel}</span>
        </motion.a>

        <p className="type-label mt-6 text-[var(--color-olive-muted)]">
          {couple.bride.firstName} &amp; {couple.groom.firstName} ·{" "}
          {event.month} {event.dayNumber}
        </p>
      </motion.div>
    </footer>
  );
}
