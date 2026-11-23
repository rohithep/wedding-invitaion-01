"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MOTION_DURATION, MOTION_EASE_CUBIC, FRAMER_VIEWPORT } from "@/lib/motion/tokens";

interface ArchPhotoFrameProps {
  src: string | null;
  alt: string;
  placeholderLabel: string;
  placeholderInitial?: string;
  className?: string;
}

/**
 * Arch-masked portrait frame that gently scales photos into an Islamic arch silhouette.
 * Shows an elegant golden-hour ivory placeholder when src is null (ready for real photos).
 */
export function ArchPhotoFrame({
  src,
  alt,
  placeholderLabel,
  placeholderInitial,
  className = "",
}: ArchPhotoFrameProps) {
  return (
    <div
      className={`plaster-tablet relative overflow-hidden rounded-t-[999px] rounded-b-xl p-2.5 ${className}`}
    >
      <div className="plaster-recess relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-lg">
        {src ? (
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 1.09, opacity: 0.7 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={FRAMER_VIEWPORT}
            transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE_CUBIC }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 75vw, 340px"
            />
          </motion.div>
        ) : (
          <motion.div
            className="flex h-full w-full flex-col items-center justify-center px-5 text-center"
            initial={{ scale: 1.05, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={FRAMER_VIEWPORT}
            transition={{ duration: MOTION_DURATION.enter, ease: MOTION_EASE_CUBIC }}
          >
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-gold)]/45 bg-[var(--color-ivory-light)]/75">
              <span className="type-h2 font-script text-[var(--color-olive)]">
                {placeholderInitial ?? "L"}
              </span>
            </div>
            <p className="type-label text-[var(--color-olive-muted)]">{placeholderLabel}</p>
            <p className="type-small mt-1 opacity-75">Photo placeholder</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
