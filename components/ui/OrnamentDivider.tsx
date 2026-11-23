import React from "react";

interface OrnamentDividerProps {
  variant?: "diamond" | "heart";
  className?: string;
}

/**
 * Thin antique-gold hairline dividers with a 4-petal diamond or delicate vine-heart
 * ornament matching the reference Save the Date card.
 */
export function OrnamentDivider({
  variant = "diamond",
  className = "",
}: OrnamentDividerProps) {
  if (variant === "heart") {
    return (
      <div
        className={`flex items-center justify-center gap-3 ${className}`}
        aria-hidden="true"
      >
        <svg
          width="88"
          height="14"
          viewBox="0 0 88 14"
          fill="none"
          className="text-[var(--color-gold)]"
        >
          <path
            d="M2 7 C 18 13, 36 1, 56 7 C 68 10, 78 6, 86 7"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
        <svg
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          className="shrink-0 text-[var(--color-olive)]"
        >
          <path
            d="M7 12.2 C6.7 12.2 1.2 8.4 1.2 4.3 C1.2 2.2 2.8 0.8 4.6 0.8 C5.7 0.8 6.5 1.4 7 2.2 C7.5 1.4 8.3 0.8 9.4 0.8 C11.2 0.8 12.8 2.2 12.8 4.3 C12.8 8.4 7.3 12.2 7 12.2 Z"
            fill="currentColor"
          />
        </svg>
        <svg
          width="88"
          height="14"
          viewBox="0 0 88 14"
          fill="none"
          className="text-[var(--color-gold)]"
        >
          <path
            d="M2 7 C 10 6, 20 10, 32 7 C 52 1, 70 13, 86 7"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center gap-3.5 ${className}`}
      aria-hidden="true"
    >
      <span className="h-[1px] w-16 sm:w-20 bg-gradient-to-r from-transparent to-[var(--color-gold)]/80" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 text-[var(--color-olive)]"
      >
        {/* 4-petal diamond rosette matching the card */}
        <path d="M8 1.2 L9.7 5.6 L8 7.1 L6.3 5.6 Z" fill="currentColor" opacity="0.85" />
        <path d="M8 14.8 L9.7 10.4 L8 8.9 L6.3 10.4 Z" fill="currentColor" opacity="0.85" />
        <path d="M1.2 8 L5.6 6.3 L7.1 8 L5.6 9.7 Z" fill="currentColor" opacity="0.85" />
        <path d="M14.8 8 L10.4 6.3 L8.9 8 L10.4 9.7 Z" fill="currentColor" opacity="0.85" />
        <circle cx="8" cy="8" r="1.15" fill="var(--color-gold)" />
      </svg>
      <span className="h-[1px] w-16 sm:w-20 bg-gradient-to-l from-transparent to-[var(--color-gold)]/80" />
    </div>
  );
}
