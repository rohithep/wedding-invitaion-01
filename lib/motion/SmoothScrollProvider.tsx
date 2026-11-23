"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollContextValue {
  /** Normalized scroll progress [0..1] updated by GSAP ScrollTrigger for R3F camera & parallax */
  progressRef: React.MutableRefObject<number>;
  /** Lock/unlock smooth scroll (locked while Intro Gate is closed) */
  setLocked: (locked: boolean) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useInvitationScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useInvitationScroll must be used inside SmoothScrollProvider");
  }
  return ctx;
}

interface SmoothScrollProviderProps {
  locked: boolean;
  reducedMotion: boolean;
  children: React.ReactNode;
}

/**
 * Single Lenis instance driven strictly by gsap.ticker:
 * - autoRaf: false
 * - lenis.on('scroll', ScrollTrigger.update)
 * - gsap.ticker.lagSmoothing(0)
 * - ScrollTrigger.config({ ignoreMobileResize: true })
 */
export function SmoothScrollProvider({
  locked,
  reducedMotion,
  children,
}: SmoothScrollProviderProps) {
  const progressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  const setLocked = (shouldLock: boolean) => {
    const lenis = lenisRef.current;
    if (shouldLock) {
      lenis?.stop();
      document.body.style.touchAction = "none";
    } else {
      document.body.style.touchAction = "";
      lenis?.start();
    }
  };

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const lenis = new Lenis({
      autoRaf: false,
      lerp: reducedMotion ? 1 : 0.09,
      smoothWheel: !reducedMotion,
      touchMultiplier: 1.0,
    });

    lenisRef.current = lenis;

    const onScroll = () => {
      ScrollTrigger.update();
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      progressRef.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Master scroll progress trigger
    const masterTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    if (locked) {
      lenis.stop();
      document.body.style.touchAction = "none";
    }

    return () => {
      masterTrigger.kill();
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      document.body.style.touchAction = "";
    };
  }, [reducedMotion]);

  useEffect(() => {
    setLocked(locked);
  }, [locked]);

  return (
    <ScrollContext.Provider value={{ progressRef, setLocked }}>
      {children}
    </ScrollContext.Provider>
  );
}
