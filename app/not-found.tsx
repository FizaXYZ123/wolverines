import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | The Wolverines Field Hockey Club",
  description: "The page you are looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] flex items-center justify-center bg-white text-neutral-900 py-10 sm:py-14 lg:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="site-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ─── LEFT COLUMN: 404 TEXT & ACTION BUTTON (CENTERED ON MOBILE, LEFT ON DESKTOP) ─── */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left z-10">
            {/* Top Red Gradient Bar + PAGE NOT FOUND */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3 select-none">
              <div
                className="w-[8px] sm:w-[10px] md:w-[12px] h-[30px] sm:h-[36px] md:h-[40px] flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
                }}
              />
              <span
                className="text-[26px] sm:text-[32px] md:text-[36px] leading-none tracking-wide uppercase text-[#181818]"
                style={{
                  fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                  fontWeight: 400,
                }}
              >
                PAGE NOT FOUND
              </span>
            </div>

            {/* Giant 404 (Spacious & Khula with tracking) */}
            <h1
              className="text-[110px] sm:text-[150px] lg:text-[185px] font-black leading-none tracking-[0.12em] text-[#111111] select-none my-1"
              style={{ fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif' }}
            >
              404
            </h1>

            {/* OOPS! */}
            <h2
              className="text-[36px] sm:text-[46px] lg:text-[52px] font-black uppercase text-[#111111] leading-none mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
            >
              OOPS!
            </h2>

            {/* Subtitle */}
            <p
              className="text-neutral-500 text-sm sm:text-base max-w-md mb-8 leading-relaxed font-normal mx-auto lg:mx-0"
              style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            {/* Go Back Home Button */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#DE2027] hover:bg-[#b8181e] text-white text-sm font-semibold rounded-[6px] shadow-lg shadow-[#DE2027]/25 transition-all duration-200 cursor-pointer group"
              style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
            >
              <span>Go Back Home</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* ─── RIGHT COLUMN: HOCKEY PLAYERS PHOTOREALISTIC IMAGE ─── */}
          <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end mt-4 lg:mt-0 w-full">
            <div className="relative w-full max-w-[540px] lg:max-w-[620px] transition-transform duration-500 hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/404-hockey-player.jpg"
                alt="Hockey Players 404"
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
