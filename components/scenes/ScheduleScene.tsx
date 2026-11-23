"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { invitation } from "@/data/invitation";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import {
  FRAMER_VIEWPORT,
  MOTION_DURATION,
  MOTION_EASE_CUBIC,
  MOTION_STAGGER,
} from "@/lib/motion/tokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScheduleSceneProps {
  reducedMotion: boolean;
}

/**
 * Scene 7: Schedule
 * Vertical ceremony timeline with a continuous antique-gold line that draws
 * downward dynamically as you scroll via GSAP ScrollTrigger.
 */
export function ScheduleScene({ reducedMotion }: ScheduleSceneProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !timelineRef.current || !progressLineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.4,
          },
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      aria-label="Nikkah Ceremony Schedule"
      className="relative z-10 -mt-[8dvh] flex min-h-dvh w-full flex-col items-center justify-center px-6 py-24 sm:px-10"
    >
      <div className="mx-auto w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={FRAMER_VIEWPORT}
          transition={{ duration: MOTION_DURATION.enter, ease: MOTION_EASE_CUBIC }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <p className="type-label mb-3 text-[var(--color-olive-muted)]">
            Ceremony Schedule
          </p>
          <h2 className="type-h1 text-[var(--color-olive)]">
            Order of the Evening
          </h2>
          <OrnamentDivider variant="diamond" className="mt-4" />
        </motion.div>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative mx-auto max-w-xl pl-8 sm:pl-0">
          {/* Background guide rail */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-2.5 w-[1px] bg-[var(--color-gold)]/25 sm:left-1/2 sm:-translate-x-1/2"
          />

          {/* Scroll-drawn gold timeline line */}
          <div
            ref={progressLineRef}
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-2.5 w-[1.5px] origin-top bg-gradient-to-b from-[var(--color-gold-light)] via-[var(--color-gold)] to-[var(--color-olive)]/70 sm:left-1/2 sm:-translate-x-1/2"
            style={{ transform: reducedMotion ? "scaleY(1)" : "scaleY(0)" }}
          />

          <div className="space-y-12 sm:space-y-14">
            {invitation.schedule.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={FRAMER_VIEWPORT}
                  transition={{
                    delay: idx * MOTION_STAGGER.tight,
                    duration: MOTION_DURATION.enter,
                    ease: MOTION_EASE_CUBIC,
                  }}
                  className={`relative flex flex-col sm:flex-row sm:items-center ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Diamond node on timeline */}
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[27px] h-2.5 w-2.5 rotate-45 border border-[var(--color-gold)] bg-[var(--color-ivory-light)] shadow-[0_0_12px_rgba(184,150,78,0.45)] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
                  />

                  <div
                    className={`plaster-tablet w-full rounded-2xl p-5 sm:w-[45%] ${
                      isEven ? "sm:mr-auto sm:text-right" : "sm:ml-auto sm:text-left"
                    }`}
                  >
                    <p className="type-label text-[var(--color-gold)]">
                      {item.time}
                    </p>
                    <h3 className="type-h2 mt-1.5 text-[var(--color-olive)]">
                      {item.title}
                    </h3>
                    <p className="type-small mt-2 text-[var(--color-olive-muted)]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
