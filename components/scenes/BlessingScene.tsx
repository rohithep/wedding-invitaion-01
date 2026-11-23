"use client";

import { motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import {
  FRAMER_VIEWPORT,
  MOTION_DURATION,
  MOTION_EASE_CUBIC,
  MOTION_STAGGER,
} from "@/lib/motion/tokens";

/**
 * Scene 3: Blessing
 * Quranic verse (Surah Ar-Rum 30:21) with poetic line-by-line staggered reveal.
 * Overlaps gently out of the Hero push-through-arch transition.
 */
export function BlessingScene() {
  const { blessing } = invitation;

  return (
    <section
      aria-label="Nikkah Blessing"
      className="relative z-10 -mt-[16dvh] flex min-h-[92dvh] w-full flex-col items-center justify-center px-6 py-24 text-center sm:px-10"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center">
        {/* Continuous gold thread emerging from Hero */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 0.8 }}
          viewport={FRAMER_VIEWPORT}
          transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE_CUBIC }}
          className="mb-8 block h-20 w-[1px] origin-top bg-gradient-to-b from-transparent via-[var(--color-gold)] to-[var(--color-gold)]/30"
        />

        <motion.p
          className="type-label mb-4 text-[var(--color-olive-muted)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={FRAMER_VIEWPORT}
          transition={{ duration: MOTION_DURATION.enter, ease: MOTION_EASE_CUBIC }}
        >
          {blessing.eyebrow}
        </motion.p>

        <motion.p
          lang="ar"
          className="type-arabic mb-6 max-w-lg text-[var(--color-olive)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={FRAMER_VIEWPORT}
          transition={{
            delay: 0.12,
            duration: MOTION_DURATION.slow,
            ease: MOTION_EASE_CUBIC,
          }}
        >
          {blessing.arabic}
        </motion.p>

        <OrnamentDivider variant="diamond" className="mb-7" />

        {/* Line-by-line poetic reveal */}
        <blockquote className="space-y-1.5">
          {blessing.lines.map((line, index) => (
            <motion.p
              key={line}
              className="type-body italic text-[var(--color-olive)]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={FRAMER_VIEWPORT}
              transition={{
                delay: 0.2 + index * MOTION_STAGGER.relaxed,
                duration: MOTION_DURATION.enter,
                ease: MOTION_EASE_CUBIC,
              }}
            >
              {line}
            </motion.p>
          ))}
        </blockquote>

        <motion.p
          className="type-label mt-6 text-[var(--color-gold)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={FRAMER_VIEWPORT}
          transition={{ delay: 0.58, duration: MOTION_DURATION.enter, ease: MOTION_EASE_CUBIC }}
        >
          {blessing.reference}
        </motion.p>

        <motion.p
          className="type-small mt-5 max-w-md text-[var(--color-olive-muted)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={FRAMER_VIEWPORT}
          transition={{ delay: 0.68, duration: MOTION_DURATION.enter, ease: MOTION_EASE_CUBIC }}
        >
          {blessing.dua}
        </motion.p>
      </div>
    </section>
  );
}
