"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Coach {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
}

const coaches: Coach[] = [
  {
    id: "jaswed-singh",
    name: "JASWED SINGH",
    role: "Former Indian National Team Player",
    imageSrc: "/images/coach_jaswed_clean.png",
  },
  {
    id: "jagdish-singh-gill",
    name: "JAGDISH SINGH GILL",
    role: "Olympian",
    imageSrc: "/images/coach_jagdish.png",
  },
  {
    id: "gurwinder-grewal",
    name: "GURWINDER GREWAL",
    role: "Secretary",
    imageSrc: "/images/coach_gurwinder.png",
  },
];

export default function AboutCoaches() {
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
      className="w-full bg-white py-14 sm:py-18 lg:py-20 overflow-hidden select-none"
    >
      <div className="site-container">
        {/* Section Header */}
        <div
          className={`flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Tag with Red Gradient Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div
              className="w-[8px] sm:w-[10px] h-[28px] sm:h-[34px] flex-shrink-0"
              style={{
                background:
                  "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
              }}
            />
            <h2
              className="text-[32px] sm:text-[38px] md:text-[44px] leading-none tracking-wide uppercase text-[#181818]"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                fontWeight: 400,
              }}
            >
              TRAINERS COACHES
            </h2>
          </div>

          {/* Subtitle Quote */}
          <p
            className="text-[14px] sm:text-[16px] md:text-[17px] text-neutral-500 font-normal max-w-2xl px-4 leading-relaxed"
            style={{
              fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
            }}
          >
            &ldquo;Experienced coaches dedicated to developing talent and passion for the game.&rdquo;
          </p>
        </div>

        {/* 3 Coach Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 xl:gap-10 max-w-6xl mx-auto">
          {coaches.map((coach, index) => {
            const delays = ["delay-100", "delay-200", "delay-300"];

            return (
              <div
                key={coach.id}
                className={`relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 p-6 sm:p-7 pb-8 items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 ease-out ${delays[index]} ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                {/* Coach Portrait Frame */}
                <div className="relative w-full h-[260px] sm:h-[280px] flex items-end justify-center overflow-visible">
                  <div className="relative w-[220px] sm:w-[240px] h-[260px] sm:h-[280px]">
                    <Image
                      src={coach.imageSrc}
                      alt={coach.name}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 300px"
                      className="object-contain object-bottom"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Grey Gradient Divider Line Attached Directly Where Image Ends */}
                <div className="w-full max-w-[260px] h-[1.5px] bg-gradient-to-r from-transparent via-neutral-300 to-transparent mt-0 mb-4 sm:mb-4.5" />

                {/* Coach Name */}
                <h3
                  className="text-[22px] sm:text-[24px] md:text-[26px] leading-tight tracking-wide text-[#181818] uppercase text-center"
                  style={{
                    fontFamily:
                      'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {coach.name}
                </h3>

                {/* Coach Role */}
                <p
                  className="text-[13px] sm:text-[14px] text-[#DE2027] font-semibold tracking-wide  mt-1 text-center"
                  style={{
                    fontFamily:
                      'var(--font-open-sans), "Open Sans", sans-serif',
                  }}
                >
                  {coach.role}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
