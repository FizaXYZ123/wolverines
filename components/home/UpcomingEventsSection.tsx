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
    <section
      ref={sectionRef}
      className="relative w-full bg-[#181818] text-white py-16 lg:py-20 select-none overflow-hidden"
    >
      <div className="site-container">
        {/* Top Header Area: Title & View All Events Button on Clean Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 lg:mb-14 gap-6">
          <div className="flex flex-col items-start max-w-2xl">
            {/* Section Tag with Red Accent Bar */}
            <div
              className={`flex items-center gap-2.5 sm:gap-3 mb-3 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
              }`}
            >
              <div
                className="w-[10px] sm:w-[12px] md:w-[14px] h-[34px] sm:h-[40px] md:h-[44px] flex-shrink-0"
                style={{
                  background: "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
                }}
              />
              <h2
                className="text-[28px] sm:text-[34px] md:text-[40px] font-normal leading-none tracking-wide uppercase text-white"
                style={{
                  fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                  fontWeight: 400,
                }}
              >
                UPCOMING EVENTS
              </h2>
            </div>

            {/* Subtitle Description */}
            <p
              className={`text-neutral-300 text-sm sm:text-base font-normal leading-relaxed transition-all duration-800 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              Beyond hockey, we bring together various sports enthusiasts by hosting tournaments,
              training camps, and sports festivals. Check out our upcoming events and get involved.
            </p>
          </div>

          {/* View All Events Button */}
          <div
            className={`transition-all duration-800 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] self-start md:self-end flex-shrink-0 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-md border border-[#D32F2F] text-[#D32F2F] text-sm font-medium hover:bg-[#D32F2F] hover:text-white transition-all duration-200 active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
            >
              View all events
            </Link>
          </div>
        </div>

        {/* Featured Event Showcase: Balanced 6-col / 6-col Grid Filling 1280px */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Event Details (col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Number Index */}
            <div
              className={`transition-all duration-800 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-10 scale-90"
              }`}
            >
              <span
                className="text-3xl sm:text-4xl lg:text-[44px] text-white/80 font-light tracking-wide inline-block leading-none"
                style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
              >
                01
              </span>
            </div>

            {/* Event Name */}
            <div
              className={`transition-all duration-900 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] mt-2 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
              }`}
            >
              <h3
                className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-[#D32F2F] leading-snug"
                style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
              >
                U18 Female &amp; Male National Championships
              </h3>
            </div>

            {/* Metadata (Location & Date) */}
            <div
              className={`flex flex-col gap-2.5 mt-4 text-neutral-300 text-sm sm:text-[15px] transition-all duration-900 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              {/* Location */}
              <div className="flex items-center gap-2.5">
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
              <div className="flex items-center gap-2.5">
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

            {/* Description Paragraph */}
            <div
              className={`transition-all duration-900 delay-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-normal mt-5">
                Experience the thrill of high-level competition as the Wolverines Field Hockey Club competes in
                top-tier tournaments and championships. These events bring together the best teams, pushing
                athletes to showcase their skills, determination, and teamwork on a grand stage.
              </p>
            </div>
          </div>

          {/* Right Column: Featured Event Image (col-span-6) - Properly Sized */}
          <div
            className={`lg:col-span-6 w-full transition-all duration-1000 delay-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-16 scale-95"
            }`}
          >
            <div className="group relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/upcoming_event_1.jpg"
                alt="Wolverines Field Hockey U18 National Championships Match"
                fill
                priority
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
