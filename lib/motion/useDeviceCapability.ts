"use client";

import { useEffect, useState } from "react";

export interface DeviceCapability {
  /** True if the device supports WebGL and is not detected as low-end */
  use3D: boolean;
  /** True if the user prefers reduced motion */
  reducedMotion: boolean;
  /** True once client checks have completed */
  ready: boolean;
}

/**
 * Detects low-end mobile devices, missing WebGL support, and prefers-reduced-motion
 * so the invitation gracefully falls back to a lightweight 2D parallax mode.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    use3D: false,
    reducedMotion: false,
    ready: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const reducedMotion = mq.matches;
      let hasWebGL = false;
      try {
        const canvas = document.createElement("canvas");
        hasWebGL = !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl2") || canvas.getContext("webgl"))
        );
      } catch {
        hasWebGL = false;
      }

      const nav = navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean };
      };
      const cores = nav.hardwareConcurrency ?? 4;
      const memory = nav.deviceMemory ?? 4;
      const saveData = nav.connection?.saveData ?? false;

      const isLowEnd = cores <= 2 || memory <= 2 || saveData;

      setCapability({
        use3D: hasWebGL && !isLowEnd && !reducedMotion,
        reducedMotion,
        ready: true,
      });
    };

    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);

  return capability;
}
