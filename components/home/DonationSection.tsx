"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const donationFeatures = [
  "Sponsor an athlete",
  "Donate equipment",
  "Contribute to facility improvements",
];

export default function DonationSection() {
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
        className="relative w-full max-w-[1480px] bg-white text-neutral-900 py-6 sm:py-8 lg:py-11 select-none overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Featured Event / Crowd Photo (Slides in from LEFT) */}
            <div
              className={`lg:col-span-6 xl:col-span-6 w-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 -translate-x-16 sm:-translate-x-24 scale-95"
              }`}
            >
              <div className="group relative w-full h-[280px] sm:h-[380px] md:h-[440px] lg:h-[460px] rounded-2xl sm:rounded-[24px] overflow-hidden">
                <Image
                  src="/images/donation.jpg"
                  alt="Wolverines Field Hockey Supporters and Young Athletes"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column: Donation Information & Features */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start">
              {/* Section Tag with Red Accent Bar (From TOP) */}
              <div
                className={`flex items-center gap-2.5 sm:gap-3 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
                  className="text-[28px] sm:text-[34px] md:text-[40px] font-normal leading-[34px] sm:leading-[40px] md:leading-[48px] tracking-wide uppercase text-[#181818]"
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                    fontWeight: 400,
                  }}
                >
                  DONATION
                </h2>
              </div>

              {/* Description Text (From RIGHT) */}
              <div
                className={`transition-all duration-800 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                }`}
              >
                <p className="text-neutral-700 text-sm sm:text-[15px] md:text-base font-normal leading-relaxed mt-4 sm:mt-5 max-w-xl">
                  Your support makes a meaningful difference for young athletes at
                  Wolverines. Donations allow us to improve training programs,
                  provide high-quality equipment, support travel to tournaments, and
                  offer scholarships to deserving players. Every contribution helps
                  nurture talent, build confidence, and create opportunities for growth,
                  while strengthening both our club and the wider community.
                </p>
              </div>

              {/* 3 Feature Bullets (From RIGHT with stagger) */}
              <ul
                className={`mt-6 sm:mt-7 space-y-3 sm:space-y-3.5 transition-all duration-900 delay-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-14"
                }`}
              >
                {donationFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-neutral-900 text-sm sm:text-[15px] font-medium">
                    {/* 3D Isometric Cube Icon Matching Figma Design */}
                    <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#181818]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        {/* Top Face (open outline) */}
                        <path
                          d="M12 2.5L20 7L12 11.5L4 7L12 2.5Z"
                          stroke="currentColor"
                          strokeLinejoin="round"
                        />
                        {/* Left Face (solid fill) */}
                        <path
                          d="M4 7L12 11.5V21.5L4 17V7Z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinejoin="round"
                        />
                        {/* Right Face (solid fill) */}
                        <path
                          d="M12 11.5L20 7V17L12 21.5V11.5Z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button: "Donate now" (From BOTTOM) */}
              <div
                className={`mt-7 sm:mt-8 transition-all duration-900 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Link
                  href="/donation"
                  className="inline-flex items-center justify-center px-7 sm:px-8 py-3 rounded-md bg-[#D32F2F] text-white text-sm sm:text-[15px] font-medium hover:bg-red-700 transition-all duration-200 shadow-none active:scale-[0.98]"
                  style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                >
                  Donate now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
