"use client";

import React from "react";
import Image from "next/image";

export default function DonationHero() {
  return (
    <div className="w-full bg-white flex flex-col items-center select-none pt-0 pb-10 sm:pb-16">
      {/* Self-contained animations for Donation Hero */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes donationHeroImageFade {
              0% {
                opacity: 0;
                transform: scale(1.05);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes donationTextReveal {
              0% {
                opacity: 0;
                transform: translateY(36px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes donationIntroFade {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-donation-image {
              animation: donationHeroImageFade 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-donation-text {
              animation: donationTextReveal 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
            }
            .animate-donation-intro {
              animation: donationIntroFade 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
            }
          `,
        }}
      />

      {/* Constrained Hero Banner container (Sleek height, max-w-[1480px]) */}
      <div className="relative w-full max-w-[1480px] h-[180px] sm:h-[240px] md:h-[300px] lg:h-[360px] bg-white overflow-hidden">
        {/* LAYER 1: Top Slanted Section (Charity Image + White Outline Text) */}
        {/* Clipped above the slant line: (0, 75%) -> (100%, 48%) */}
        <div
          className="absolute inset-0 w-full h-full bg-[#111111] overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 48%, 0 75%)",
          }}
        >
          <div className="relative w-full h-full animate-donation-image">
            <Image
              src="/images/donation_hero_v2.jpg"
              alt="Support Wolverines Field Hockey Donation"
              fill
              priority
              className="object-cover object-[center_45%]"
              sizes="(max-width: 1480px) 100vw, 1480px"
            />
            {/* Subtle gradient overlay to ensure the white outline text has superb contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
          </div>

          {/* Upper Text: Transparent fill with crisp white stroke outline */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-3 sm:pb-6 md:pb-8 lg:pb-10 pointer-events-none animate-donation-text">
            <span
              className="text-[44px] sm:text-[68px] md:text-[96px] lg:text-[124px] font-normal uppercase tracking-wider leading-none select-none text-transparent block"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                WebkitTextStroke: "2px #ffffff",
              }}
            >
              DONATION
            </span>
          </div>
        </div>

        {/* LAYER 2: Bottom Slanted Section (White Background + Solid Black Text) */}
        {/* Clipped below the slant line: exact same boundary (0, 75%) -> (100%, 48%) */}
        <div
          className="absolute inset-0 w-full h-full bg-white overflow-hidden pointer-events-none"
          style={{
            clipPath: "polygon(0 75%, 100% 48%, 100% 100%, 0 100%)",
          }}
        >
          {/* Lower Text: Solid black fill at the exact identical pixel coordinates */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-3 sm:pb-6 md:pb-8 lg:pb-10 pointer-events-none animate-donation-text">
            <span
              aria-hidden="true"
              className="text-[44px] sm:text-[68px] md:text-[96px] lg:text-[124px] font-normal uppercase tracking-wider leading-none select-none text-[#111111] block"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
              }}
            >
              DONATION
            </span>
          </div>
        </div>
      </div>

      {/* Intro Paragraph matching user mockup - Aligned with Navbar Logo */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 animate-donation-intro">
        <p
          className="text-neutral-700 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-4xl"
          style={{
            fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
          }}
        >
          At Wolverines, we believe in creating opportunities for athletes of all ages and backgrounds to develop their skills, compete at higher levels, and foster a lifelong love for the game. But we can&apos;t do it alone. Your generous support ensures that young players get the training, equipment, and opportunities they need to succeed.
        </p>
      </div>
    </div>
  );
}
