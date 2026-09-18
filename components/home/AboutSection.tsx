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
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-neutral-900 py-16 lg:py-20 xl:py-24 select-none overflow-hidden"
    >
      <div className="site-container">
        {/* Section Tag Header: "ABOUT US" with Red Accent Bar */}
        <div
          className={`flex items-center gap-2.5 sm:gap-3 mb-8 sm:mb-10 lg:mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
            className="text-[28px] sm:text-[34px] md:text-[40px] font-normal leading-none tracking-wide uppercase text-[#181818]"
            style={{
              fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
              fontWeight: 400,
            }}
          >
            ABOUT US
          </h2>
        </div>

        {/* Content Grid: 12-Column Layout Filling Full 1280px Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Column 1: Big Typography (col-span-5) */}
          <div
            className={`lg:col-span-5 flex flex-col items-start transition-all duration-900 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <h3
              className="text-[48px] sm:text-[68px] md:text-[84px] lg:text-[76px] xl:text-[90px] font-bold leading-[0.92] tracking-tight uppercase text-[#181818]"
              style={{
                fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                fontWeight: 700,
              }}
            >
              STRONGER <br />
              <span className="text-[#DE2027]">TOGETHER</span> <br />
              ALWAYS
            </h3>
          </div>

          {/* Column 2: Large Action Player Cutout Image (col-span-3) */}
          <div
            className={`lg:col-span-3 flex justify-center items-center transition-all duration-1000 delay-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div
              className="relative w-[220px] sm:w-[260px] md:w-[280px] lg:w-full max-w-[320px] aspect-[74/79]"
            >
              <Image
                src="/images/hockey_player.png"
                alt="Wolverines Field Hockey Player In Action"
                fill
                priority
                className="object-contain drop-shadow-[-6px_14px_24px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>

          {/* Column 3: Narrative & CTA Button (col-span-4) */}
          <div
            className={`lg:col-span-4 flex flex-col items-start justify-center transition-all duration-900 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-neutral-700 text-sm sm:text-[15px] md:text-base leading-relaxed font-normal">
              Wolverines in Abbotsford, British Columbia, is committed to
              developing young athletes in the dynamic sport of field hockey.
              We offer expert coaching, inclusive training programs, and a
              supportive environment where players of all skill levels can
              grow, improve, and enjoy the game.
            </p>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal mt-3.5">
              Our mission is to nurture confidence, teamwork, and a lifelong passion for field hockey while providing opportunities to engage in community events and competitive play. At Wolverines, every athlete is guided to reach their full potential.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-[#D32F2F] font-semibold text-sm hover:text-red-700 hover:gap-2.5 transition-all duration-200 mt-6 group"
            >
              <span>Learn More</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">&gt;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
