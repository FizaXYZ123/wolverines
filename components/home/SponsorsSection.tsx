"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Sponsor {
  name: string;
  logo: string;
  width: number;
  height: number;
  className?: string;
}

const sponsors: Sponsor[] = [
  {
    name: "GNS Freight",
    logo: "/images/sponsors/gns_freight.png",
    width: 220,
    height: 55,
    className: "max-h-12 sm:max-h-14 w-auto object-contain",
  },
  {
    name: "Khalsa Diwan Society, Abbotsford",
    logo: "/images/sponsors/khalsa_diwan.jpg",
    width: 120,
    height: 120,
    className: "max-h-20 sm:max-h-24 lg:max-h-28 w-auto object-contain rounded-full",
  },
  {
    name: "Naad Arts Centre",
    logo: "/images/sponsors/naad_arts.png",
    width: 110,
    height: 120,
    className: "max-h-20 sm:max-h-24 lg:max-h-28 w-auto object-contain",
  },
  {
    name: "X Studio",
    logo: "/images/sponsors/x_studio.png",
    width: 140,
    height: 110,
    className: "max-h-18 sm:max-h-22 lg:max-h-24 w-auto object-contain",
  },
  {
    name: "Fourteen Electrical Ltd.",
    logo: "/images/sponsors/fourteen_electrical.png",
    width: 190,
    height: 65,
    className: "max-h-12 sm:max-h-14 w-auto object-contain",
  },
  {
    name: "Truck & Trailer Repair Certified Mechanics",
    logo: "/images/sponsors/truck_trailer_repair.png",
    width: 140,
    height: 140,
    className: "max-h-20 sm:max-h-24 lg:max-h-28 w-auto object-contain",
  },
];

export default function SponsorsSection() {
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
        className="relative w-full max-w-[1480px] bg-white text-neutral-900 py-10 sm:py-14 lg:py-15 select-none overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Top Header Area */}
          <div className="flex flex-col items-start">
            {/* Section Tag with Red Accent Bar */}
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
                SUPPORTING THE FUTURE OF HOCKEY
              </h2>
            </div>

            {/* Subtitle Description Paragraph */}
            <div
              className={`transition-all duration-800 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <p className="text-neutral-700 text-sm sm:text-[15px] md:text-base font-normal leading-relaxed max-w-4xl mt-4">
                We are grateful to our sponsors whose generous support helps us provide quality training,
                equipment, and opportunities for growth. Their contribution plays a vital role in
                developing future players and strengthening our local field hockey community.
              </p>
            </div>
          </div>

          {/* Infinite Auto-Scrolling Sponsors Marquee */}
          <div className="relative w-full overflow-hidden mt-12 sm:mt-16 pt-4 marquee-mask">
            <div className="flex items-center gap-12 sm:gap-16 lg:gap-24 animate-marquee py-3">
              {/* Double set of sponsors for seamless 360 loop */}
              {[...sponsors, ...sponsors].map((sponsor, idx) => (
                <div
                  key={`${sponsor.name}-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center h-20 sm:h-24 lg:h-28 px-4 transition-transform duration-300 hover:scale-110 select-none cursor-pointer"
                >
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} Logo`}
                    width={sponsor.width}
                    height={sponsor.height}
                    className={sponsor.className}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
