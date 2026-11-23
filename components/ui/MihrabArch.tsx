import React from "react";

interface MihrabArchProps {
  className?: string;
  strokeOpacity?: number;
  withInnerStroke?: boolean;
}

/**
 * Hand-built SVG Mihrab / Ogee Arch frame inspired by the Save the Date card.
 * Crisp at every resolution and animatable via stroke/scale transforms.
 */
export function MihrabArch({
  className = "",
  strokeOpacity = 0.72,
  withInnerStroke = true,
}: MihrabArchProps) {
  const outerPath =
    "M 16 740 L 16 250 C 16 182 54 148 92 122 C 138 92 178 58 200 18 C 222 58 262 92 308 122 C 346 148 384 182 384 250 L 384 740";
  const innerPath =
    "M 26 740 L 26 254 C 26 190 62 158 98 134 C 142 104 180 72 200 34 C 220 72 258 104 302 134 C 338 158 374 190 374 254 L 374 740";

  return (
    <svg
      viewBox="0 0 400 740"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="mihrabGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D7BE82" stopOpacity={strokeOpacity} />
          <stop offset="50%" stopColor="#B8964E" stopOpacity={strokeOpacity} />
          <stop offset="100%" stopColor="#9A7A3A" stopOpacity={strokeOpacity * 0.65} />
        </linearGradient>
      </defs>
      <path
        d={outerPath}
        stroke="url(#mihrabGold)"
        strokeWidth="1.35"
        vectorEffect="non-scaling-stroke"
      />
      {withInnerStroke && (
        <path
          d={innerPath}
          stroke="url(#mihrabGold)"
          strokeWidth="0.75"
          strokeOpacity="0.65"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
