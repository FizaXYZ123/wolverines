"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutMissionVision() {
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white flex justify-center py-12 sm:py-16 lg:py-24 overflow-hidden">
      <section
        ref={sectionRef}
        className="w-full max-w-[1480px] px-4 sm:px-6 lg:px-12 xl:px-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div
            className={`lg:col-span-6 xl:col-span-6 flex flex-col justify-center max-w-xl transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "opacity-100 translate-x-0 blur-0"
                : "opacity-0 -translate-x-12 sm:-translate-x-16 blur-[1px]"
            }`}
          >
            {/* Tag: ABOUT US */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <div
                className="w-[8px] sm:w-[10px] h-[30px] sm:h-[36px] flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
                }}
              />
              <h2
                className="text-[28px] sm:text-[34px] md:text-[38px] leading-none tracking-wide uppercase text-[#181818]"
                style={{
                  fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                  fontWeight: 400,
                }}
              >
                ABOUT US
              </h2>
            </div>

            {/* Paragraph 1: Mission / Story */}
            <p
              className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.75] sm:leading-[1.8] font-normal mb-8 sm:mb-10"
              style={{
                fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
              }}
            >
              Wolverines is a community-focused sports organization dedicated to
              nurturing athlete development and a love for field hockey. Our
              mission is to deliver quality training, foster personal growth, and
              create opportunities for players to improve, compete, and thrive.
              Through expert coaching and a positive environment, we help
              athletes reach their potential and enjoy every step of their hockey
              journey.
            </p>

            {/* Subhead: OUR VISION */}
            <h3
              className="text-[24px] sm:text-[28px] md:text-[32px] leading-tight tracking-wide uppercase text-[#181818] mb-3 sm:mb-4"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                fontWeight: 400,
              }}
            >
              OUR VISION
            </h3>

            {/* Paragraph 2: Vision */}
            <p
              className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.75] sm:leading-[1.8] font-normal"
              style={{
                fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
              }}
            >
              Our vision is to build a welcoming and dynamic field hockey
              community where everyone feels encouraged to grow and succeed. We
              aim to inspire athletes with a passion for the sport, support their
              development, and promote teamwork, respect, and a sense of
              belonging on and off the field. Our club champions skill,
              sportsmanship, and lifelong engagement with field hockey.
            </p>
          </div>

          {/* Right Column: Overlapping Images */}
          <div className="lg:col-span-6 xl:col-span-6 w-full flex justify-center lg:justify-end">
            {/* Image Composition Container */}
            <div className="relative w-full max-w-[490px] mb-16 sm:mb-20 lg:mb-22">
              {/* Main / Top Image: Team Photo in front of facility */}
              <div
                className={`relative w-full aspect-[16/10.5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-neutral-100 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible
                    ? "opacity-100 translate-x-0 scale-100 blur-0"
                    : "opacity-0 translate-x-12 sm:translate-x-16 scale-95 blur-[2px]"
                }`}
              >
                <Image
                  src="/images/about_team_group.png"
                  alt="Wolverines Field Hockey Team Group"
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 460px, 490px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>

              {/* Overlapping Centered Bottom Image: Sticks Huddle Close-up */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 -bottom-18 sm:-bottom-18 md:-bottom-20 w-[54%] sm:w-[48%] md:w-[46%] max-w-[260px] sm:max-w-[275px] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-2 border-white z-10 transition-all duration-[1000ms] delay-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${
                  isVisible
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-[0.82] translate-y-8"
                }`}
              >
                <Image
                  src="/images/about_sticks_huddle.png"
                  alt="Wolverines Field Hockey Sticks In A Circle"
                  fill
                  sizes="(max-width: 640px) 55vw, 275px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
