"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryItem } from "./galleryData";

interface CurvedGalleryHeroProps {
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

export default function CurvedGalleryHero({
  items,
  onOpenLightbox,
}: CurvedGalleryHeroProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">("left");
  const [speed, setSpeed] = useState<number>(42); // duration in seconds

  // Use the curated items (repeating 3 times for a completely seamless infinite loop)
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="relative w-full bg-white pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-16 overflow-hidden select-none">
      {/* Hidden SVG Definition for the Exact Curved Concave Ribbon Silhouette */}
      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <clipPath id="curved-ribbon-clip" clipPathUnits="objectBoundingBox">
            {/* 
              Top edge: Starts at (0, 0.04), dips down to (0.5, 0.22), rises to (1, 0.04).
              Bottom edge: Curves from (1, 0.96) up to (0.5, 0.78), down to (0, 0.96).
            */}
            <path d="M 0,0.04 C 0.28,0.22 0.72,0.22 1,0.04 L 1,0.96 C 0.72,0.78 0.28,0.78 0,0.96 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Hero Header matching user's design */}
      <div className="site-container text-center mb-6 sm:mb-8 lg:mb-10">
        <h1
          className="animate-gallery-title text-[52px] sm:text-[70px] md:text-[88px] lg:text-[104px] leading-none tracking-[0.06em] uppercase text-[#111111] font-normal"
          style={{ fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif' }}
        >
          GALLERY
        </h1>
        <p
          className="animate-gallery-sub text-neutral-700 text-center text-xs sm:text-sm md:text-base font-normal mt-2.5 sm:mt-3 max-w-xl mx-auto px-4 leading-relaxed"
          style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
        >
          &ldquo;Relive the action, the passion, and the glory through stunning visuals.&rdquo;
        </p>
      </div>

      {/* Curved 3D Scrolling Ribbon Showcase */}
      <div className="relative w-full overflow-hidden flex justify-center">
        <div
          className="animate-gallery-ribbon relative w-full max-w-[1580px] h-[190px] sm:h-[240px] md:h-[280px] lg:h-[310px] flex items-center overflow-hidden"
          style={{
            clipPath: "url(#curved-ribbon-clip)",
            WebkitClipPath: "url(#curved-ribbon-clip)",
          }}
        >
          {/* Inner Scrolling Track */}
          <div
            className={`flex items-center ${
              scrollDirection === "left" ? "animate-gallery-left" : "animate-gallery-right"
            } ${isPaused ? "animate-gallery-paused" : ""}`}
            style={{
              animationDuration: `${speed}s`,
            }}
          >
            {marqueeItems.map((item, index) => {
              const actualIndex = index % items.length;
              return (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => onOpenLightbox(actualIndex)}
                  className="relative flex-shrink-0 w-[135px] sm:w-[175px] md:w-[210px] lg:w-[235px] h-[190px] sm:h-[240px] md:h-[280px] lg:h-[310px] mr-2 sm:mr-2.5 bg-neutral-900 cursor-pointer overflow-hidden select-none"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 140px, (max-width: 1024px) 210px, 240px"
                    className="object-cover object-center"
                    priority={index < 8}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Interactive Controls Bar */}
      <div className="site-container mt-5 sm:mt-6 flex flex-wrap items-center justify-end gap-3 text-xs sm:text-sm text-neutral-600">
        {/* Right: Pause/Resume, Direction, Speed controls */}
        <div className="flex items-center gap-2">
          {/* Pause / Play Button */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              isPaused
                ? "bg-[#D32F2F] text-white border-[#D32F2F]"
                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-300"
            }`}
            title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {isPaused ? (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Resume</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                <span>Pause</span>
              </>
            )}
          </button>

          {/* Direction Toggle */}
          <button
            type="button"
            onClick={() => setScrollDirection(scrollDirection === "left" ? "right" : "left")}
            className="px-3 py-1.5 rounded-full border border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5"
            title="Change scroll direction"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                scrollDirection === "right" ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{scrollDirection === "left" ? "Scroll Left" : "Scroll Right"}</span>
          </button>

          {/* Speed Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-neutral-100 p-0.5 rounded-full border border-neutral-300 text-[11px]">
            <button
              type="button"
              onClick={() => setSpeed(55)}
              className={`px-2 py-1 rounded-full cursor-pointer transition-colors ${
                speed === 55 ? "bg-white text-[#D32F2F] shadow-xs font-semibold" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Slow
            </button>
            <button
              type="button"
              onClick={() => setSpeed(42)}
              className={`px-2 py-1 rounded-full cursor-pointer transition-colors ${
                speed === 42 ? "bg-white text-[#D32F2F] shadow-xs font-semibold" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setSpeed(28)}
              className={`px-2 py-1 rounded-full cursor-pointer transition-colors ${
                speed === 28 ? "bg-white text-[#D32F2F] shadow-xs font-semibold" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Fast
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
