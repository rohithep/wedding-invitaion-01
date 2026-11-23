/**
 * Shared motion tokens used by both GSAP and Framer Motion
 * Tuned for Apple-like 60fps responsiveness on mobile & desktop.
 */

export const MOTION_EASE_CUBIC = [0.22, 1, 0.36, 1] as const;

/** GSAP-compatible smooth deceleration ease */
export const GSAP_EASE = "power3.out";

export const MOTION_DURATION = {
  fast: 0.38,
  enter: 0.85,
  slow: 1.08,
  gateExit: 1.2,
} as const;

export const MOTION_STAGGER = {
  tight: 0.06,
  base: 0.08,
  relaxed: 0.1,
} as const;

export const FRAMER_VIEWPORT = {
  once: true,
  amount: 0.14,
} as const;

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.enter,
      ease: MOTION_EASE_CUBIC,
    },
  },
};

export const staggerContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_STAGGER.base,
      delayChildren: 0.05,
    },
  },
};
