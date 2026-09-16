"use client";

import React from "react";

export interface GradientDividerProps {
  /**
   * Colors list for the animated gradient.
   * Aap yahan koi bhi colors pass kar sakte ho:
   * e.g., ["#D32F2F", "#ff6b35", "#fbbf24", "#ea580c"]
   */
  colors?: string[];
  /** Height of the line (e.g. "2px", "3px", or number in px). Default is "2.5px" */
  height?: string | number;
  /** Animation speed in seconds (default: 4) */
  speed?: number;
  /** Ambient soft neon glow effect (default: true) */
  glow?: boolean;
  /** Left and right side fade-out percentage (default: 15 for 15%) */
  fadePercent?: number;
  /** Optional extra CSS classes */
  className?: string;
}

export default function GradientDivider({
  colors = ["#D32F2F", "#ff6b35", "#fbbf24", "#ea580c", "#D32F2F"],
  height = "1px",
  speed = 4,
  glow = true,
  fadePercent = 15,
  className = "",
}: GradientDividerProps) {
  // Make seamless looping gradient from user-defined colors
  const gradientStops =
    colors.length === 1
      ? `${colors[0]}, ${colors[0]}`
      : [...colors, colors[0]].join(", ");

  const gradientAnimation: React.CSSProperties = {
    background: `linear-gradient(90deg, ${gradientStops})`,
    backgroundSize: "300% 300%",
    animation: `gradient-flow ${speed}s ease-in-out infinite`,
  };

  const containerMask: React.CSSProperties = {
    WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${fadePercent}%, black ${100 - fadePercent}%, transparent 100%)`,
    maskImage: `linear-gradient(to right, transparent 0%, black ${fadePercent}%, black ${100 - fadePercent}%, transparent 100%)`,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      className={`relative w-full ${className}`}
      style={containerMask}
    >
      {/* Ambient glowing shadow behind line */}
      {glow && (
        <div
          className="absolute inset-0 h-full w-full opacity-80 blur-[3px]"
          style={gradientAnimation}
        />
      )}
      {/* Crisp foreground gradient line */}
      <div className="relative h-full w-full" style={gradientAnimation} />
    </div>
  );
}
