"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { invitation } from "@/data/invitation";
import { ArchPhotoFrame } from "@/components/ui/ArchPhotoFrame";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import {
  FRAMER_VIEWPORT,
  MOTION_DURATION,
  MOTION_EASE_CUBIC,
} from "@/lib/motion/tokens";

/**
 * Scene 8: Gallery
 * Swipe-friendly 3D perspective depth & tilt carousel for couple photos.
 */
export function GalleryScene() {
  const photos = invitation.gallery;
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (next: number) => {
    setActiveIndex((next + photos.length) % photos.length);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -45 || info.velocity.x < -300) {
      goTo(activeIndex + 1);
    } else if (info.offset.x > 45 || info.velocity.x > 300) {
      goTo(activeIndex - 1);
    }
  };

  return (
    <section
      aria-label="Couple Photo Gallery"
      className="relative z-10 -mt-[6dvh] flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={FRAMER_VIEWPORT}
        transition={{ duration: MOTION_DURATION.enter, ease: MOTION_EASE_CUBIC }}
        className="mb-10 flex flex-col items-center"
      >
        <p className="type-label mb-3 text-[var(--color-olive-muted)]">
          Captured Moments
        </p>
        <h2 className="type-h1 text-[var(--color-olive)]">
          Lubaiba &amp; Raees
        </h2>
        <OrnamentDivider variant="heart" className="mt-4" />
      </motion.div>

      {/* 3D Depth / Tilt Carousel Stage */}
      <div
        className="relative mx-auto flex h-[410px] w-full max-w-3xl items-center justify-center sm:h-[470px]"
        style={{ perspective: "1100px" }}
      >
        {photos.map((photo, index) => {
          let offset = index - activeIndex;
          if (offset > photos.length / 2) offset -= photos.length;
          if (offset < -photos.length / 2) offset += photos.length;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          return (
            <motion.div
              key={photo.id}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={isActive ? handleDragEnd : undefined}
              onClick={() => !isActive && goTo(index)}
              animate={{
                x: offset * 210,
                scale: isActive ? 1 : 0.82,
                rotateY: offset * -18,
                opacity: isActive ? 1 : isVisible ? 0.58 : 0,
                zIndex: isActive ? 20 : 10 - Math.abs(offset),
              }}
              transition={{
                duration: 0.75,
                ease: MOTION_EASE_CUBIC,
              }}
              className={`absolute flex flex-col items-center ${
                isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
              }`}
              style={{
                transformStyle: "preserve-3d",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              <ArchPhotoFrame
                src={photo.src}
                alt={photo.alt}
                placeholderLabel={`Moment 0${index + 1}`}
                placeholderInitial={`${index + 1}`}
                className="aspect-[3/4] w-60 sm:w-72"
              />
              <p
                className={`type-small mt-4 transition-opacity duration-500 ${
                  isActive ? "opacity-90" : "opacity-0"
                }`}
              >
                {photo.caption}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Controls & Dots */}
      <div className="mt-6 flex items-center gap-5">
        <motion.button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Previous photo"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/55 bg-[var(--color-ivory-light)]/80 text-[var(--color-olive)] backdrop-blur-sm"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
        </motion.button>

        <div className="flex items-center gap-2">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-[var(--color-gold)]"
                  : "w-2 bg-[var(--color-gold)]/35 hover:bg-[var(--color-gold)]/60"
              }`}
            />
          ))}
        </div>

        <motion.button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Next photo"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/55 bg-[var(--color-ivory-light)]/80 text-[var(--color-olive)] backdrop-blur-sm"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
        </motion.button>
      </div>

      <p className="type-small mt-3 opacity-65">Swipe or tap to explore</p>
    </section>
  );
}
