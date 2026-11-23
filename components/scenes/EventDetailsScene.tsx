"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { invitation } from "@/data/invitation";
import { downloadNikkahICS } from "@/lib/calendar";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import {
  FRAMER_VIEWPORT,
  MOTION_DURATION,
  MOTION_EASE_CUBIC,
} from "@/lib/motion/tokens";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(targetIso: string): TimeLeft {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="plaster-recess relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl sm:h-20 sm:w-20">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: MOTION_EASE_CUBIC }}
            className="type-h2 tabular-nums leading-none text-[var(--color-olive)]"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="type-label mt-2.5 text-[var(--color-olive-muted)]">
        {label}
      </span>
    </div>
  );
}

/**
 * Scene 5: Event Details
 * Date, day, time, live countdown with Framer Motion digit transitions,
 * and working "Add to Calendar" (.ics) download.
 */
export function EventDetailsScene() {
  const { event } = invitation;
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(computeTimeLeft(event.startDateISO));
    const timer = setInterval(() => {
      setTimeLeft(computeTimeLeft(event.startDateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [event.startDateISO]);

  return (
    <section
      aria-label="Event Details and Countdown"
      className="relative z-10 -mt-[6dvh] flex min-h-[92dvh] w-full flex-col items-center justify-center px-5 py-24 text-center sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={FRAMER_VIEWPORT}
        transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE_CUBIC }}
        className="plaster-tablet relative mx-auto w-full max-w-xl rounded-t-[160px] rounded-b-2xl px-6 py-14 sm:px-12 sm:py-16"
      >
        <p className="type-label mb-3 text-[var(--color-olive-muted)]">
          {event.title}
        </p>

        <h2 className="type-h1 text-[var(--color-olive)]">
          {event.month} {event.dayNumber}, {event.year}
        </h2>

        <p className="type-body mt-2 text-[var(--color-olive-muted)]">
          {event.dayOfWeek} · {event.timeDisplay}
        </p>

        <OrnamentDivider variant="diamond" className="my-8" />

        {/* Live Countdown */}
        <p className="type-label mb-5 text-[var(--color-olive-muted)]">
          Counting Down The Moments
        </p>

        <div className="grid grid-cols-4 justify-items-center gap-2.5 sm:gap-4">
          <CountdownUnit value={timeLeft?.days ?? 0} label="Days" />
          <CountdownUnit value={timeLeft?.hours ?? 0} label="Hours" />
          <CountdownUnit value={timeLeft?.minutes ?? 0} label="Mins" />
          <CountdownUnit value={timeLeft?.seconds ?? 0} label="Secs" />
        </div>

        {/* Add to Calendar (.ics) */}
        <motion.button
          type="button"
          onClick={downloadNikkahICS}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.3, ease: MOTION_EASE_CUBIC }}
          className="gold-brass-btn mt-10 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[var(--color-olive)] transition-all"
        >
          <CalendarPlus className="h-4 w-4 text-[var(--color-gold)]" strokeWidth={1.7} />
          <span className="type-label">Add to Calendar</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
