"use client";

import React from "react";
import Image from "next/image";

export default function RegistrationHero() {
  return (
    <div className="w-full bg-white flex flex-col items-center select-none pt-0 pb-6 sm:pb-10">
      {/* Self-contained animations for Registration Hero */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes regHeroImageFade {
              0% {
                opacity: 0;
                transform: scale(1.04);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes regTextReveal {
              0% {
                opacity: 0;
                transform: translateY(32px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes regDescFade {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-reg-image {
              animation: regHeroImageFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-reg-text {
              animation: regTextReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
            }
            .animate-reg-desc {
              animation: regDescFade 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
            }
          `,
        }}
      />

      {/* Constrained Hero Banner container (max-w-[1480px]) */}
      <div className="relative w-full max-w-[1480px] h-[220px] sm:h-[280px] md:h-[350px] lg:h-[400px] bg-white overflow-hidden">
        {/* LAYER 1: Top Slanted Section (Turf Image + White Outline Text) */}
        {/* Clipped above the slant line: (0, 72%) -> (100%, 46%) */}
        <div
          className="absolute inset-0 w-full h-full bg-[#111111] overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 46%, 0 72%)",
          }}
        >
          <div className="relative w-full h-full animate-reg-image">
            <Image
              src="/images/registration_hero.jpg"
              alt="Join Wolverines Field Hockey Club Registration"
              fill
              priority
              className="object-cover object-[center_35%]"
              sizes="(max-width: 1480px) 100vw, 1480px"
            />
            {/* Subtle gradient overlay to ensure white outline text pop-out */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </div>

          {/* Upper Text: Transparent fill with crisp white stroke outline */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-8 sm:pb-6 md:pb-8 lg:pb-10 pointer-events-none animate-reg-text">
            <span
              className="text-[58px] sm:text-[82px] md:text-[116px] lg:text-[145px] font-normal uppercase tracking-wider leading-none select-none text-transparent block"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                WebkitTextStroke: "2.5px #ffffff",
              }}
            >
              JOIN US
            </span>
          </div>
        </div>

        {/* LAYER 2: Bottom Slanted Section (White Background + Solid Black Text + Description) */}
        {/* Clipped below the slant line: exact same boundary (0, 72%) -> (100%, 46%) */}
        <div
          className="absolute inset-0 w-full h-full bg-white overflow-hidden pointer-events-none"
          style={{
            clipPath: "polygon(0 72%, 100% 46%, 100% 100%, 0 100%)",
          }}
        >
          {/* Lower Text: Solid black fill at the exact identical pixel coordinates */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-8 sm:pb-6 md:pb-8 lg:pb-10 pointer-events-none animate-reg-text">
            <span
              aria-hidden="true"
              className="text-[58px] sm:text-[82px] md:text-[116px] lg:text-[145px] font-normal uppercase tracking-wider leading-none select-none text-[#111111] block"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
              }}
            >
              JOIN US
            </span>
          </div>

          {/* Right-Side Intro Paragraph positioned under the slant cut */}
          <div className="hidden sm:flex absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-end justify-end pb-4 sm:pb-6 md:pb-8 pointer-events-auto animate-reg-desc">
            <p
              className="text-neutral-700 text-xs sm:text-sm md:text-base lg:text-[16px] leading-relaxed font-normal max-w-sm md:max-w-md text-left"
              style={{
                fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
              }}
            >
              Fill out the enquiry form and share your questions with us. Our team will contact you soon and provide the information you need about the club, training, and programs.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Description (visible on mobile below banner) */}
      <div className="sm:hidden w-full max-w-7xl mx-auto px-4 pt-4 animate-reg-desc">
        <p
          className="text-neutral-700 text-sm leading-relaxed font-normal"
          style={{
            fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
          }}
        >
          Fill out the enquiry form and share your questions with us. Our team will contact you soon and provide the information you need about the club, training, and programs.
        </p>
      </div>
    </div>
  );
}
