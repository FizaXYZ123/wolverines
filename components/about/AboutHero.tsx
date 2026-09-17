"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function AboutHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on mount
    const timer = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-white flex justify-center">
      <section className="relative w-full max-w-[1480px] h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] min-h-[460px] lg:min-h-[680px] overflow-hidden select-none flex items-center bg-neutral-900 shadow-2xl">
        {/* 1. Abbotsford Hockey Field Background Image */}
        <div
          className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 scale-105" : "opacity-60 scale-110"
          }`}
        >
          <Image
            src="/images/about_hero_bg.jpg"
            alt="The Wolverines Abbotsford Field Hockey Club Ground"
            fill
            priority
            className="object-cover object-[center_35%] filter blur-[2px]"
          />
          {/* Subtle mobile readability vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent lg:hidden pointer-events-none" />
        </div>

        {/* 2. Left Dark Stripe - Fixed & Static (No animation) */}
        <div
          className="hidden lg:block absolute pointer-events-none z-10"
          style={{
            width: "49.339px",
            height: "1097.778px",
            backgroundColor: "#18181A",
            transform: "rotate(35.362deg)",
            transformOrigin: "center center",
            top: "calc(50% - (1097.778px / 2))",
            right: "505px",
          }}
        />

        {/* 3. Center Red Stripe - Fixed & Static (No animation) */}
        <div
          className="hidden lg:block absolute pointer-events-none z-10"
          style={{
            width: "96.738px",
            height: "1070.68px",
            backgroundColor: "#DE2027",
            transform: "rotate(35.362deg)",
            transformOrigin: "center center",
            top: "calc(50% - (1070.68px / 2))",
            right: "320px",
          }}
        />

        {/* 4. Action Hockey Player Cutout - Placed at bottom-0 on mobile, centered on desktop */}
        <div
          className={`absolute bottom-0 top-auto lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto pointer-events-none z-20 flex items-end lg:items-center justify-end transition-all duration-1000 delay-450 ease-[cubic-bezier(0.16,1,0.3,1)] right-[-10px] sm:right-2 md:right-6 lg:right-[79px] ${
            isLoaded ? "opacity-95 lg:opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-16 lg:translate-x-24 scale-95"
          }`}
        >
          <div
            className="relative w-[280px] sm:w-[340px] md:w-[400px] lg:w-[463.7px] h-[298px] sm:h-[362px] md:h-[426px] lg:h-[495px]"
            style={{
              aspectRatio: "74 / 79",
            }}
          >
            <Image
              src="/images/hockey_player.png"
              alt="Field Hockey Player in Action"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[-8px_16px_28px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* 5. Grid Container matching Navbar max-w-7xl so 'ABOUT US' aligns directly with Navbar Logo */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full flex flex-col justify-start pt-10 sm:pt-14 md:pt-16 lg:pt-0 lg:justify-center pointer-events-none">
          <div className="max-w-[340px] sm:max-w-md lg:max-w-xl text-left pointer-events-auto">
            {/* Main Title: ABOUT US - Up top on mobile, centered on desktop */}
            <h1
              className={`text-[52px] sm:text-[72px] md:text-[96px] lg:text-[124px] xl:text-[138px] font-normal leading-[0.88] tracking-normal text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] transition-all duration-900 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-14"
              }`}
              style={{ fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif' }}
            >
              ABOUT US
            </h1>

            {/* Subtitle Quote - Right below Title on mobile */}
            <p
              className={`mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-white/95 text-xs sm:text-base md:text-[19px] lg:text-[20px] leading-snug sm:leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] transition-all duration-900 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-lg ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
            >
              &ldquo;Empowering future champions with expert coaching and a passion for the game.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
