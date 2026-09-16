"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
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
        className="relative w-full max-w-[1480px] bg-white text-neutral-900 py-8 sm:py-12 lg:py-12 select-none overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Tag: "ABOUT US" with Red Accent Bar */}
          <div
            className={`flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
              ABOUT US
            </h2>
          </div>

          {/* Main Content Area */}
          <div className="relative">
            {/* Action Player Cutout Image - Slides in from the RIGHT */}
            <div
              className={`relative lg:absolute lg:right-0 xl:right-4 lg:-top-4 xl:-top-8 w-full lg:w-auto flex justify-center lg:justify-end mb-6 lg:mb-0 pointer-events-none z-10 transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-20 sm:translate-x-32 scale-95"
              }`}
            >
              <div
                className="relative w-[230px] sm:w-[265px] md:w-[290px] lg:w-[305px] xl:w-[318.5px] h-[245px] sm:h-[282px] md:h-[310px] lg:h-[325px] xl:h-[340px]"
                style={{ aspectRatio: "74 / 79" }}
              >
                <Image
                  src="/images/hockey_player.png"
                  alt="Wolverines Field Hockey Player In Action"
                  fill
                  priority
                  className="object-contain object-bottom lg:object-right-top"
                />
              </div>
            </div>

            {/* Staggered Typography: STRONGER / TOGETHER / ALWAYS */}
            <div className="relative z-0">
              {/* 1st Line: STRONGER - Slides in from LEFT */}
              <div
                className={`transition-all duration-900 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16 sm:-translate-x-24"
                }`}
              >
                <h2
                  className="text-[44px] sm:text-[68px] md:text-[92px] lg:text-[112px] xl:text-[132px] font-bold leading-tight xl:leading-[140px] tracking-tight uppercase text-[#181818]"
                  style={{
                    fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  STRONGER
                </h2>
              </div>

              {/* 2nd Line: TOGETHER - Slides in from LEFT (Staggered Indented) */}
              <div
                className={`transition-all duration-900 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-24 sm:-translate-x-32"
                }`}
              >
                <h2
                  className="text-[44px] sm:text-[68px] md:text-[92px] lg:text-[112px] xl:text-[132px] font-normal leading-tight xl:leading-[140px] tracking-tight uppercase text-[#181818] ml-4 sm:ml-12 md:ml-20 lg:ml-32 xl:ml-40 my-1 sm:my-2"
                  style={{
                    fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                    fontWeight: 400,
                  }}
                >
                  TOGETHER
                </h2>
              </div>

              {/* 3rd Row: ALWAYS on Left + Paragraph Description on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-1 sm:mt-2">
                {/* ALWAYS - Slides in from LEFT / BOTTOM */}
                <div
                  className={`lg:col-span-6 xl:col-span-6 transition-all duration-900 delay-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-16 translate-y-6"
                  }`}
                >
                  <h2
                    className="text-[44px] sm:text-[68px] md:text-[92px] lg:text-[112px] xl:text-[132px] font-bold leading-tight xl:leading-[140px] tracking-tight uppercase text-[#181818]"
                    style={{
                      fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                      fontWeight: 700,
                    }}
                  >
                    ALWAYS
                  </h2>
                </div>

                {/* Description & Learn More Link - Floats in from BOTTOM */}
                <div
                  className={`lg:col-span-6 xl:col-span-6 flex flex-col items-start pt-2 sm:pt-4 lg:pt-6 max-w-xl transition-all duration-1000 delay-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                >
                  <p className="text-neutral-700 text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal">
                    Wolverines in Abbotsford, British Columbia, is committed to
                    developing young athletes in the dynamic sport of field hockey.
                    We offer expert coaching, inclusive training programs, and a
                    supportive environment where players of all skill levels can
                    grow, improve, and enjoy the game. Our mission is to nurture
                    confidence, teamwork, and a lifelong passion for field hockey
                    while providing opportunities to engage in community events and
                    competitive play. At Wolverines, every athlete is guided to
                    reach their full potential and love the sport.
                  </p>

                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-[#D32F2F] font-semibold text-xs sm:text-sm hover:text-red-700 hover:gap-2 transition-all duration-200 mt-4 group"
                  >
                    <span>Learn More</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">&gt;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
