"use client";

import { invitation } from "@/data/invitation";

/**
 * WhatsApp / Instagram in-app browser safe audio controller.
 * Must be triggered from a user gesture (the Intro Gate tap).
 * Tries to play /public/audio/nikkah-theme.mp3; if the placeholder file is not yet added,
 * gracefully falls back to a warm, serene Web Audio ambient pad so the experience
 * and mute toggle work immediately out of the box.
 */
class InvitationAudioController {
  private audioEl: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying = false;
  private isMuted = false;
  private usingFallback = false;
  private listeners = new Set<() => void>();

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
    };
  }

  async startFromUserGesture() {
    if (this.isPlaying) return;

    try {
      const el = new Audio(invitation.audio.src);
      el.loop = true;
      el.volume = invitation.audio.volume;
      el.preload = "auto";

      const startOffset = invitation.audio.startOffsetSeconds ?? 0;
      const seekToStart = () => {
        if (startOffset > 0 && el.currentTime < startOffset) {
          try {
            el.currentTime = startOffset;
          } catch {
            // Ignore if browser isn't ready to seek yet
          }
        }
      };

      el.addEventListener("loadedmetadata", seekToStart, { once: true });
      await el.play();
      seekToStart();
      this.audioEl = el;
      this.usingFallback = false;
      this.isPlaying = true;
      this.isMuted = false;
      this.notify();
    } catch {
      // Fallback: gentle warm golden-hour ambient drone via Web Audio API
      this.startAmbientFallback();
    }
  }

  private startAmbientFallback() {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 2.4);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(520, ctx.currentTime);

      filter.connect(master);
      master.connect(ctx.destination);

      // Soft warm D-major9 chord frequencies (D3, A3, E4, F#4)
      const freqs = [146.83, 220.0, 329.63, 369.99];
      const oscs = freqs.map((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(idx === 0 ? 0.45 : 0.18, ctx.currentTime);
        osc.connect(gain);
        gain.connect(filter);
        osc.start();
        return osc;
      });

      this.audioCtx = ctx;
      this.masterGain = master;
      this.oscillators = oscs;
      this.usingFallback = true;
      this.isPlaying = true;
      this.isMuted = false;
      this.notify();
    } catch {
      // Ignore if audio context is unavailable
    }
  }

  toggleMute() {
    if (!this.isPlaying) {
      void this.startFromUserGesture();
      return;
    }

    this.isMuted = !this.isMuted;

    if (!this.usingFallback && this.audioEl) {
      this.audioEl.muted = this.isMuted;
    } else if (this.usingFallback && this.audioCtx && this.masterGain) {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0.0001 : 0.045,
        now,
        0.18
      );
    }

    this.notify();
  }
}

export const invitationAudio = new InvitationAudioController();
