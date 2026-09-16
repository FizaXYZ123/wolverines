"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UpcomingEventsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white flex justify-center">
      <section
        ref={sectionRef}
        className="relative w-full max-w-[1480px] bg-[#181818] text-white py-14 sm:py-18 lg:py-20 select-none overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Header Area: Title from TOP, Subtitle from LEFT, Button from BOTTOM */}
        <div className="flex flex-col items-start">
          {/* 1. TOP ENTRANCE: Section Tag with Red Accent Bar */}
          <div
            className={`flex items-center gap-2.5 sm:gap-3 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <div
              className="w-[10px] sm:w-[12px] md:w-[14px] h-[34px] sm:h-[40px] md:h-[44px] flex-shrink-0"
              style={{
                background: "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
              }}
            />
            <h2
              className="text-[28px] sm:text-[34px] md:text-[40px] font-normal leading-[34px] sm:leading-[40px] md:leading-[48px] tracking-wide uppercase text-white"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                fontWeight: 400,
              }}
            >
              UPCOMING EVENTS
            </h2>
          </div>

          {/* 2. LEFT ENTRANCE: Subtitle Description Paragraph */}
          <div
            className={`transition-all duration-800 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <p className="text-neutral-300 text-sm sm:text-[15px] md:text-base font-normal leading-relaxed max-w-3xl mt-4">
              Beyond hockey, we bring together various sports enthusiasts by hosting tournaments,
              training camps, and sports festivals. Check out our upcoming events and get involved.
            </p>
          </div>

          {/* 3. BOTTOM ENTRANCE: "View all events" Red Outline Button */}
          <div
            className={`mt-5 sm:mt-6 transition-all duration-800 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-md border border-[#D32F2F] text-[#D32F2F] text-xs sm:text-sm font-medium hover:bg-[#D32F2F] hover:text-white transition-all duration-200 active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
            >
              View all events
            </Link>
          </div>
        </div>

        {/* Featured Event Showcase: 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-10 sm:mt-14 pt-4">
          {/* Left Column: Event Details from LEFT & BOTTOM */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* 4. LEFT ENTRANCE: Number Index */}
            <div
              className={`transition-all duration-800 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-10 scale-90"
              }`}
            >
              <span
                className="text-2xl sm:text-3xl lg:text-[34px] text-white/90 font-light tracking-wide inline-block"
                style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
              >
                01
              </span>
            </div>

            {/* 5. LEFT ENTRANCE: Event Name */}
            <div
              className={`transition-all duration-900 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
              }`}
            >
              <h3
                className="text-lg sm:text-xl md:text-[22px] font-semibold text-[#D32F2F] leading-snug mt-2"
                style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
              >
                U18 Female &amp; Male National Championships
              </h3>
            </div>

            {/* 6. LEFT ENTRANCE: Metadata (Location & Date) */}
            <div
              className={`flex flex-col gap-2 mt-3.5 text-neutral-300 text-xs sm:text-[13px] md:text-sm transition-all duration-900 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-14"
              }`}
            >
              {/* Location */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-neutral-400 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Tamanawis Park 12601 64 Ave, Surrey</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-neutral-400 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>March 27, 2025 - March 30, 2025</span>
              </div>
            </div>

            {/* 7. BOTTOM ENTRANCE: Description Paragraph */}
            <div
              className={`transition-all duration-900 delay-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <p className="text-neutral-400 text-xs sm:text-sm md:text-[14px] leading-relaxed font-normal mt-4 max-w-lg">
                Experience the thrill of high-level competition as the Wolverines Field Hockey Club competes in
                top-tier tournaments and championships. These events bring together the best teams, pushing
                athletes to showcase their skills, determination, and teamwork on a grand stage.
              </p>
            </div>
          </div>

          {/* 8. RIGHT ENTRANCE: Featured Event Image */}
          <div
            className={`lg:col-span-7 w-full transition-all duration-1000 delay-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-20 sm:translate-x-32 scale-95"
            }`}
          >
            <div className="group relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[430px] rounded-2xl sm:rounded-[24px] overflow-hidden border border-white/5">
              <Image
                src="/images/upcoming_event_1.jpg"
                alt="Wolverines Field Hockey U18 National Championships Match"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
