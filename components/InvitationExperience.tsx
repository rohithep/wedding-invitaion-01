"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { SmoothScrollProvider } from "@/lib/motion/SmoothScrollProvider";
import { useDeviceCapability } from "@/lib/motion/useDeviceCapability";
import { invitationAudio } from "@/lib/audio";
import { InvitationCanvas } from "@/components/three/InvitationCanvas";
import { PersistentLayer } from "@/components/scenes/PersistentLayer";
import { IntroGate } from "@/components/scenes/IntroGate";
import { HeroScene } from "@/components/scenes/HeroScene";
import { BlessingScene } from "@/components/scenes/BlessingScene";
import { CoupleScene } from "@/components/scenes/CoupleScene";
import { EventDetailsScene } from "@/components/scenes/EventDetailsScene";
import { VenueScene } from "@/components/scenes/VenueScene";
import { ScheduleScene } from "@/components/scenes/ScheduleScene";
import { GalleryScene } from "@/components/scenes/GalleryScene";
import { ClosingScene } from "@/components/scenes/ClosingScene";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { PetalTransitionLayer } from "@/components/ui/PetalTransitionLayer";

export function InvitationExperience() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [gateFullyOpen, setGateFullyOpen] = useState(false);
  const { use3D, reducedMotion } = useDeviceCapability();

  const handleStartAudio = () => {
    void invitationAudio.startFromUserGesture();

    // Silently pre-decode key full-bleed backdrops while the door video plays
    // so there is zero 1-frame decode stutter when scrolling on mobile phones
    const toDecode = [
      "/assets/photo/hero-archway.webp",
      "/assets/photo/closing-alcove.webp",
      "/assets/mosque-silhouette.webp",
      "/assets/photo/petals-transition.webp",
      "/assets/photo/petals-transition-soft.webp",
    ];
    toDecode.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      void img.decode?.().catch(() => {});
    });
  };

  const handleRevealHero = () => {
    setHeroRevealed(true);
  };

  const handleCompleteOpen = () => {
    setHeroRevealed(true);
    setGateFullyOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider
        locked={!gateFullyOpen}
        reducedMotion={reducedMotion}
      >
        {/* Fixed continuous photorealistic plaster & silk backdrop, shadows, drapery & persistent lantern */}
        <PersistentLayer reducedMotion={reducedMotion} />

        {/* Fixed 3D R3F canvas (DPR <= 2) with automatic 2D low-end fallback */}
        <InvitationCanvas use3D={use3D} reducedMotion={reducedMotion} />

        {/* Transparent PNG floating rose petals & baby's-breath transition layer */}
        <PetalTransitionLayer reducedMotion={reducedMotion} />

        {/* Scene 1: Photorealistic Video Door-Opening Intro Gate */}
        <IntroGate
          isOpen={gateFullyOpen}
          onStartAudio={handleStartAudio}
          onRevealHero={handleRevealHero}
          onCompleteOpen={handleCompleteOpen}
        />

        {/* Always-visible floating mute/unmute button once opened */}
        <MusicToggle visible={heroRevealed} />

        {/* Continuous scroll-driven narrative (Scenes 2–9 with seamless overlaps) */}
        <main className="relative z-10 w-full">
          <HeroScene gateOpened={heroRevealed} reducedMotion={reducedMotion} />
          <BlessingScene />
          <CoupleScene reducedMotion={reducedMotion} />
          <EventDetailsScene />
          <VenueScene reducedMotion={reducedMotion} />
          <ScheduleScene reducedMotion={reducedMotion} />
          <GalleryScene />
          <ClosingScene />
        </main>
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
