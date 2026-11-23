"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { invitationAudio } from "@/lib/audio";
import { MOTION_EASE_CUBIC } from "@/lib/motion/tokens";

interface MusicToggleProps {
  visible: boolean;
}

export function MusicToggle({ visible }: MusicToggleProps) {
  const [state, setState] = useState(() => invitationAudio.getState());

  useEffect(() => {
    return invitationAudio.subscribe(() => {
      setState(invitationAudio.getState());
    });
  }, []);

  const isAudible = state.isPlaying && !state.isMuted;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => invitationAudio.toggleMute()}
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.45, ease: MOTION_EASE_CUBIC }}
          aria-label={isAudible ? "Mute background music" : "Unmute background music"}
          title={isAudible ? "Mute music" : "Play music"}
          className="fixed right-4 bottom-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)]/55 bg-[var(--color-ivory-light)]/85 text-[var(--color-olive)] shadow-[0_6px_24px_rgba(79,81,39,0.14)] backdrop-blur-md transition-colors hover:border-[var(--color-gold)] sm:right-6 sm:bottom-6"
        >
          {isAudible ? (
            <Volume2 className="h-4 w-4 text-[var(--color-olive)]" strokeWidth={1.6} />
          ) : (
            <VolumeX className="h-4 w-4 text-[var(--color-olive-muted)]" strokeWidth={1.6} />
          )}
          {isAudible && (
            <span
              className="pointer-events-none absolute inset-0 rounded-full border border-[var(--color-gold)]/45 animate-ping"
              style={{ animationDuration: "2.8s" }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
