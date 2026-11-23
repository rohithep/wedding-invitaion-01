"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MOTION_EASE_CUBIC } from "@/lib/motion/tokens";

interface IntroGateProps {
  isOpen: boolean;
  onStartAudio: () => void;
  onRevealHero: () => void;
  onCompleteOpen: () => void;
}

/**
 * Scene 1: Pure Video Intro Gate (Mobile, iOS Safari, Android & ngrok hardened)
 * - Uses clean <source type="video/mp4"> (no #t= fragment that breaks mobile Range requests)
 * - Calls video.play() synchronously inside the tap gesture on a real <button>
 * - Smoothly cross-dissolves 2.7s before the end into the Hero sanctuary
 */
export function IntroGate({
  isOpen,
  onStartAudio,
  onRevealHero,
  onCompleteOpen,
}: IntroGateProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeTriggeredRef = useRef(false);
  const [phase, setPhase] = useState<"idle" | "playing" | "fading">("idle");

  // Ensure mobile WebViews (iOS Safari / WhatsApp / Instagram) have inline attributes set on DOM node
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");
    video.muted = true;
  }, []);

  const triggerSmoothExit = () => {
    if (fadeTriggeredRef.current) return;
    fadeTriggeredRef.current = true;
    setPhase("fading");
    onRevealHero();

    window.setTimeout(() => {
      onCompleteOpen();
    }, 2050);
  };

  const handlePress = () => {
    if (phase !== "idle" || isOpen) return;

    const video = videoRef.current;
    if (!video) {
      onStartAudio();
      triggerSmoothExit();
      return;
    }

    setPhase("playing");

    // Keep video muted and call play() SYNCHRONOUSLY inside user gesture (critical for iOS/Android)
    video.muted = true;
    const playPromise = video.play();

    // Start background music right after initiating video playback
    onStartAudio();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If mobile hadn't buffered metadata yet (e.g. slow ngrok tunnel), load and retry once
        video.load();
        video.muted = true;
        const retry = video.play();
        if (retry !== undefined) {
          retry.catch(() => {
            // Only skip if the device truly cannot play the video
            triggerSmoothExit();
          });
        }
      });
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || fadeTriggeredRef.current) return;
    const remaining = video.duration - video.currentTime;
    if (remaining <= 2.7) {
      triggerSmoothExit();
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          key="intro-gate-video"
          aria-label="Open Nikkah Invitation"
          initial={{ opacity: 1 }}
          animate={
            phase === "fading"
              ? { opacity: 0, scale: 1.06, filter: "blur(6px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          exit={{
            opacity: 0,
            transition: { duration: 0.25, ease: "linear" },
          }}
          transition={{ duration: 1.9, ease: MOTION_EASE_CUBIC }}
          className={`fixed inset-0 z-50 flex h-dvh w-full items-center justify-center overflow-hidden bg-[#efe3ce] select-none ${
            phase === "fading" ? "pointer-events-none" : ""
          }`}
        >
          {/* Ambient blurred backdrop on wide desktop viewports */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 scale-110 opacity-50 blur-2xl"
          >
            <Image
              src="/assets/photo/sunlit-plaster-bg.webp"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Real <button> ensures reliable mobile tap synthesis even when scroll is locked */}
          <button
            type="button"
            disabled={phase !== "idle"}
            aria-label="Tap to open Lubaiba and Raees Nikkah invitation"
            onClick={handlePress}
            className={`relative block h-dvh w-full max-w-[540px] touch-manipulation overflow-hidden border-0 bg-transparent p-0 shadow-[0_30px_90px_rgba(20,14,6,0.68)] focus:outline-none sm:aspect-[9/16] sm:h-[96dvh] sm:w-auto ${
              phase === "idle" ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <video
              ref={videoRef}
              poster="/assets/video/door-frame0.jpg"
              playsInline
              muted
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload noplaybackrate"
              onTimeUpdate={handleTimeUpdate}
              onEnded={triggerSmoothExit}
              className="pointer-events-none h-full w-full object-cover"
            >
              <source src="/assets/video/door-opening.mp4" type="video/mp4" />
            </video>
          </button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
