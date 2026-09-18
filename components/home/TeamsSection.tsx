"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Team {
  name: string;
  logo: string;
  width: number;
  height: number;
  className?: string;
}

const teams: Team[] = [
  {
    name: "Gobind Sarvar Field Hockey Club",
    logo: "/images/teams/gobind_sarvar.png",
    width: 110,
    height: 110,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain",
  },
  {
    name: "Elite Field Hockey",
    logo: "/images/teams/elite.png",
    width: 100,
    height: 110,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain",
  },
  {
    name: "Dashmesh Field Hockey Club",
    logo: "/images/teams/dashmesh.jpg",
    width: 120,
    height: 120,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain",
  },
  {
    name: "Chilliwack Field Hockey Club",
    logo: "/images/teams/chilliwack.png",
    width: 115,
    height: 115,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain rounded-full",
  },
  {
    name: "West Vancouver Field Hockey Club (WVFHC)",
    logo: "/images/teams/wvfhc.png",
    width: 110,
    height: 115,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain",
  },
  {
    name: "Eagle Field Hockey Club",
    logo: "/images/teams/eagle_hockey.png",
    width: 115,
    height: 115,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain",
  },
  {
    name: "HC Club Since 1932",
    logo: "/images/teams/hc_club_1932.png",
    width: 115,
    height: 115,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain",
  },
  {
    name: "United Hawks Sports Club Calgary",
    logo: "/images/teams/united_hawks.jpg",
    width: 115,
    height: 115,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain rounded-full",
  },
  {
    name: "Lions Field Hockey Club 50",
    logo: "/images/teams/field_hockey_club_50.png",
    width: 115,
    height: 115,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain",
  },
  {
    name: "Panthers Field Hockey",
    logo: "/images/teams/panthers.png",
    width: 115,
    height: 115,
    className: "max-h-16 sm:max-h-20 lg:max-h-24 w-auto object-contain",
  },
];

export default function TeamsSection() {
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
      className="relative w-full bg-white text-neutral-900 py-16 lg:py-20 select-none overflow-hidden"
    >
      <div className="site-container relative">
          {/* Section Tag with Red Accent Bar */}
          <div
            className={`flex items-center justify-center gap-2.5 sm:gap-3 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
              className="text-[32px] sm:text-[36px] md:text-[40px] font-normal leading-[40px] sm:leading-[44px] md:leading-[48px] uppercase text-[#181818]"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                fontWeight: 400,
                color: "#181818",
              }}
            >
              HOCKEY FIELD TEAM
            </h2>
          </div>

          {/* Infinite Auto-Scrolling Teams Marquee Carousel */}
          <div className="relative w-full overflow-hidden mt-8 sm:mt-12 pt-3 marquee-mask">
            <div className="flex items-center gap-10 sm:gap-14 lg:gap-20 animate-marquee py-3">
              {/* Double set of teams for seamless infinite loop */}
              {[...teams, ...teams].map((team, idx) => (
                <div
                  key={`${team.name}-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center h-16 sm:h-20 w-28 sm:w-36 px-2 transition-transform duration-300 hover:scale-105 select-none cursor-pointer"
                  title={team.name}
                >
                  <Image
                    src={team.logo}
                    alt={`${team.name} Logo`}
                    width={team.width}
                    height={team.height}
                    className={`max-h-full max-w-full object-contain ${
                      team.name.includes("Chilliwack") || team.name.includes("United Hawks")
                        ? "rounded-full"
                        : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
