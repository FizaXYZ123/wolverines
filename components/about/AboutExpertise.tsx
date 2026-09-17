"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ExpertiseItemProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ExpertiseRow({
  imageSrc,
  imageAlt,
  imagePosition,
  title,
  description,
  icon,
}: ExpertiseItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isLeftImage = imagePosition === "left";

  return (
    <div
      ref={rowRef}
      className="group relative flex flex-col lg:flex-row items-center justify-center w-full"
    >
      {/* Image Container (740px x 400px on desktop) with Cinematic Entrance */}
      <div
        className={`w-full max-w-[740px] lg:w-[740px] flex-shrink-0 ${
          isLeftImage ? "lg:order-1" : "lg:order-2"
        } transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isVisible
            ? "opacity-100 translate-x-0 scale-100 blur-0"
            : isLeftImage
            ? "opacity-0 -translate-x-20 sm:-translate-x-32 scale-[0.92] blur-[2px]"
            : "opacity-0 translate-x-20 sm:translate-x-32 scale-[0.92] blur-[2px]"
        }`}
      >
        <div className="relative w-full h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] lg:w-[740px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-neutral-100/80 group/img">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 740px"
            className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Subtle ambient gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
      </div>

      {/* Floating Info Card with Counter-Directional Entrance & Stagger */}
      <div
        className={`w-[92%] sm:w-[88%] lg:w-[480px] xl:w-[500px] relative z-10 -mt-10 sm:-mt-14 lg:mt-0 flex-shrink-0 ${
          isLeftImage
            ? "lg:order-2 lg:-ml-24 xl:-ml-28"
            : "lg:order-1 lg:-mr-24 xl:-mr-28"
        } transition-all duration-[1100ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isVisible
            ? "opacity-100 translate-x-0 scale-100 blur-0"
            : isLeftImage
            ? "opacity-0 translate-x-16 sm:translate-x-28 scale-[0.94] blur-[2px]"
            : "opacity-0 -translate-x-16 sm:-translate-x-28 scale-[0.94] blur-[2px]"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-[0_14px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_22px_50px_rgba(222,32,39,0.12),0_12px_30px_rgba(0,0,0,0.06)] border border-neutral-100/90 hover:border-red-100 hover:-translate-y-1.5 transition-all duration-500">
          {/* Header with Custom SVG Icon and Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div
              className={`flex items-center justify-center flex-shrink-0 transition-all duration-700 delay-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isVisible
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 -rotate-45 opacity-0"
              }`}
            >
              {icon}
            </div>
            <h3
              className={`text-[20px] sm:text-[23px] md:text-[25px] leading-tight tracking-wide uppercase text-[#181818] transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                fontWeight: 400,
              }}
            >
              {title}
            </h3>
          </div>

          {/* Description */}
          <p
            className={`text-[14px] sm:text-[15px] text-neutral-600 leading-[1.75] font-normal transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
            style={{
              fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutExpertise() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white flex justify-center py-12 sm:py-16 lg:py-24 overflow-hidden">
      <section className="w-full max-w-[1480px] px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Section Tag Header */}
        <div
          ref={headerRef}
          className={`flex items-center gap-2.5 sm:gap-3 mb-10 sm:mb-14 lg:mb-16 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
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
            OUR EXPERTISE
          </h2>
        </div>

        {/* 3 Alternating Expertise Items */}
        <div className="flex flex-col space-y-16 sm:space-y-20 lg:space-y-24">
          {/* Item 1: Image Left, Card Right */}
          <ExpertiseRow
            id="tournaments"
            imageSrc="/images/expertise_tournaments.png"
            imageAlt="Competitive Tournaments and Events"
            imagePosition="left"
            title="COMPETITIVE TOURNAMENTS & EVENTS"
            description="We organize a variety of hockey events, from local matches to large-scale tournaments, allowing players to test their abilities in a competitive setting. These events not only boost confidence but also offer exposure to professional scouts and teams."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M20 0V3.75H25C24.9658 6.76719 24.4918 8.89498 23.5779 10.1334L23.4375 10.3125C22.7027 11.1942 21.4485 11.8209 19.6749 12.1927C18.8552 14.8769 16.5705 16.9221 13.7527 17.3958C13.7506 17.4305 13.7497 17.4652 13.75 17.5C13.75 20.2614 15.9885 22.5 18.75 22.5V25H6.24996V22.5C9.01143 22.5 11.25 20.2614 11.25 17.5L11.2473 17.3958C8.42947 16.9221 6.14484 14.8769 5.32553 12.1924C3.55143 11.8209 2.29723 11.1942 1.56246 10.3125C0.55668 9.10551 0.0358594 6.91801 0 3.75H4.99998V0H20ZM17.5 2.49996H7.5V9.99996C7.5 12.6778 9.60492 14.8638 12.2504 14.9938L12.5 15C15.2614 15 17.5 12.7614 17.5 9.99996V2.49996ZM12.5 3.75L13.7644 6.75996L16.875 7.09688L14.5431 9.28436L15.2037 12.5L12.5 10.8462L9.79623 12.5L10.4569 9.27996L8.12496 7.09248L11.2356 6.75562L12.5 3.75ZM4.99998 6.24996H2.67246L2.69965 6.42996C2.8599 7.45605 3.10588 8.18408 3.40131 8.6049L3.48305 8.71201C3.71367 8.98881 4.14721 9.24949 4.78951 9.46846L4.99998 9.53496V6.24996ZM22.3275 6.24996H20V9.53496L20.2105 9.46846C20.8528 9.24949 21.2863 8.98881 21.5169 8.71201L21.5987 8.6049C21.8941 8.18408 22.1401 7.45605 22.3004 6.42996L22.3275 6.24996Z"
                  fill="#DE2027"
                />
              </svg>
            }
          />

          {/* Item 2: Card Left, Image Right */}
          <ExpertiseRow
            id="academy"
            imageSrc="/images/expertise_academy.jpg"
            imageAlt="Academy Registration For Aspiring Players"
            imagePosition="right"
            title="ACADEMY REGISTRATION FOR ASPIRING PLAYERS"
            description="Looking to enroll in a professional hockey academy? Our registration process is open to players who are passionate about the sport. We provide structured development programs, training camps, and mentorship to help students grow in the game."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
              >
                <path
                  d="M14.3688 0.083398C14.2532 0.0284639 14.1272 0 13.9996 0C13.872 0 13.746 0.0284639 13.6303 0.083398L0.504929 6.33353C0.350369 6.40715 0.220263 6.52525 0.130613 6.67332C0.0409623 6.82139 -0.00432333 6.99296 0.000325112 7.16694C0.00497355 7.34093 0.0593534 7.50973 0.156777 7.6526C0.2542 7.79546 0.390419 7.90615 0.548681 7.97107L13.6741 13.3283C13.883 13.4138 14.1162 13.4138 14.3251 13.3283L24.4999 9.17823V19.6427C24.0358 19.6427 23.5906 19.8309 23.2624 20.1658C22.9342 20.5007 22.7498 20.9549 22.7498 21.4285V25H28V21.4285C28 20.9549 27.8156 20.5007 27.4874 20.1658C27.1592 19.8309 26.7141 19.6427 26.2499 19.6427V8.46215L27.4505 7.97107C27.6087 7.90615 27.745 7.79546 27.8424 7.6526C27.9398 7.50973 27.9942 7.34093 27.9988 7.16694C28.0035 6.99296 27.9582 6.82139 27.8686 6.67332C27.7789 6.52525 27.6488 6.40715 27.4942 6.33353L14.3688 0.083398ZM13.9996 11.5354L3.07576 7.07998L13.9996 1.87808L24.9234 7.07998L13.9996 11.5354Z"
                  fill="#DE2027"
                />
                <path
                  d="M7.30737 12.5573C7.19469 12.514 7.07447 12.4949 6.95422 12.5012C6.83397 12.5074 6.71629 12.539 6.60853 12.5938C6.50077 12.6486 6.40526 12.7255 6.32796 12.8197C6.25067 12.9139 6.19326 13.0234 6.15933 13.1413L5.28431 16.177C5.22302 16.3902 5.24177 16.6189 5.33691 16.8187C5.43205 17.0185 5.59674 17.1749 5.79882 17.2574L13.6741 20.4718C13.883 20.5572 14.1161 20.5572 14.3251 20.4718L22.2003 17.2574C22.4024 17.1749 22.5671 17.0185 22.6622 16.8187C22.7574 16.6189 22.7761 16.3902 22.7148 16.177L21.8398 13.1413C21.8059 13.0234 21.7485 12.9139 21.6712 12.8197C21.5939 12.7255 21.4984 12.6486 21.3906 12.5938C21.2829 12.539 21.1652 12.5074 21.0449 12.5012C20.9247 12.4949 20.8044 12.514 20.6918 12.5573L13.9996 15.1181L7.30737 12.5573ZM7.18836 15.902L7.57338 14.5663L13.6916 16.9074C13.8901 16.9836 14.109 16.9836 14.3076 16.9074L20.4258 14.5663L20.8108 15.902L13.9996 18.6789L7.18836 15.902Z"
                  fill="#DE2027"
                />
              </svg>
            }
          />

          {/* Item 3: Image Left, Card Right */}
          <ExpertiseRow
            id="community"
            imageSrc="/images/expertise_community.jpg"
            imageAlt="Community and Donations"
            imagePosition="left"
            title="COMMUNITY & DONATIONS"
            description="Hockey is a team sport, and our academy thrives with community support. Your donations help improve facilities, provide better equipment and offer scholarships to talented players in need. Every contribution shapes the future of our athletes."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="25"
                viewBox="0 0 40 25"
                fill="none"
              >
                <path
                  d="M17.0125 0.038884L13.8188 3.35052C12.8625 3.6227 11.975 4.12172 11.225 4.80867L9.5625 6.34459C8.925 6.93433 8.09375 7.25837 7.2375 7.25837H6V15.5536C7.275 15.5925 8.4875 16.1304 9.39375 17.0701L11.6187 19.3773L12.0562 19.8309L13.7437 21.5807C14.1312 21.9825 14.7688 21.9825 15.1562 21.5807C15.2625 21.4705 15.3438 21.3409 15.3875 21.2048C15.5625 20.7058 15.9688 20.3299 16.4688 20.2133C16.9688 20.0966 17.4938 20.2521 17.8563 20.6345L18.5312 21.3215C19.2563 22.0732 20.4312 22.0732 21.15 21.3215C21.4875 20.9715 21.6688 20.5243 21.6875 20.0642C21.7125 19.4939 22.0375 18.9884 22.5375 18.7421C23.0375 18.4959 23.6187 18.5477 24.0625 18.8782C24.65 19.3124 25.4688 19.2541 25.9937 18.7097C26.5812 18.1006 26.5812 17.1155 25.9937 16.5128L21.2563 11.6004L19.0187 13.7391C17.3125 15.3722 14.6938 15.3981 12.9563 13.7974C10.975 11.9698 10.9312 8.78133 12.8562 6.89545L17.2375 2.60524C18.95 0.933219 21.2125 0 23.5688 0C25.825 0 28.0063 0.861931 29.6875 2.41082L31.5688 4.14764H39C39.55 4.14764 40 4.61425 40 5.18455V18.6644C40 19.8115 39.1063 20.7382 38 20.7382H36C35.2625 20.7382 34.6125 20.3234 34.2687 19.7013H28.9625C28.75 20.1355 28.4688 20.5503 28.1187 20.9132C27.05 22.0214 25.5688 22.4556 24.1812 22.2158C23.9562 22.6889 23.65 23.1296 23.2687 23.5249C21.5625 25.2941 18.8937 25.4691 16.9937 24.0498C15.425 25.3978 13.0875 25.3136 11.6187 23.7841L9.9375 22.0343L9.5 21.5807L7.275 19.2736C6.93125 18.9171 6.48125 18.7097 6 18.6709C6 19.8115 5.1 20.7382 4 20.7382H2C0.89375 20.7382 0 19.8115 0 18.6644V5.18455C0 4.61425 0.45 4.14764 1 4.14764H7.2375C7.3625 4.14764 7.48125 4.10227 7.56875 4.01803L9.225 2.48858C10.9688 0.887854 13.2125 0 15.5437 0H16.1875C16.4625 0 16.7438 0.0129613 17.0125 0.038884ZM34 16.5906V7.25837H31C30.6313 7.25837 30.275 7.11579 30.0063 6.86305L27.7 4.73738C26.5625 3.68751 25.0938 3.11073 23.5688 3.11073C21.9813 3.11073 20.4562 3.73936 19.3 4.867L14.9187 9.15721C14.275 9.79232 14.2875 10.8616 14.95 11.4708C15.5312 12.0087 16.4125 11.9958 16.9813 11.4514L21.475 7.1482C22.0813 6.56494 23.0312 6.60382 23.5938 7.23893C24.1562 7.87403 24.1187 8.85262 23.5063 9.43588L23.4562 9.48773L28.1063 14.3094C28.7313 14.9574 29.1375 15.7545 29.3188 16.5841H33.9938L34 16.5906ZM4 17.6275C4 17.3525 3.89464 17.0887 3.70711 16.8943C3.51957 16.6998 3.26522 16.5906 3 16.5906C2.73478 16.5906 2.48043 16.6998 2.29289 16.8943C2.10536 17.0887 2 17.3525 2 17.6275C2 17.9025 2.10536 18.1662 2.29289 18.3607C2.48043 18.5551 2.73478 18.6644 3 18.6644C3.26522 18.6644 3.51957 18.5551 3.70711 18.3607C3.89464 18.1662 4 17.9025 4 17.6275ZM37 18.6644C37.2652 18.6644 37.5196 18.5551 37.7071 18.3607C37.8946 18.1662 38 17.9025 38 17.6275C38 17.3525 37.8946 17.0887 37.7071 16.8943C37.5196 16.6998 37.2652 16.5906 37 16.5906C36.7348 16.5906 36.4804 16.6998 36.2929 16.8943C36.1054 17.0887 36 17.3525 36 17.6275C36 17.9025 36.1054 18.1662 36.2929 18.3607C36.4804 18.5551 36.7348 18.6644 37 18.6644Z"
                  fill="#DE2027"
                />
              </svg>
            }
          />
        </div>
      </section>
    </div>
  );
}
