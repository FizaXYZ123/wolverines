"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface EventPhoto {
  id: string;
  src: string;
  alt: string;
}

const eventPhotos: EventPhoto[] = [
  {
    id: "photo-boy-mic",
    src: "/images/event_boy_mic.png",
    alt: "Young club member speaking at microphone",
  },
  {
    id: "photo-mic-speech",
    src: "/images/event_mic_speech.jpg",
    alt: "Youth player speaking at ceremony",
  },
  {
    id: "photo-match-field",
    src: "/images/event_match_field.jpg",
    alt: "Full field hockey match in action",
  },
  {
    id: "photo-fence-battle",
    src: "/images/event_fence_battle.jpg",
    alt: "Junior players competing by the fence",
  },
  {
    id: "photo-kids-action",
    src: "/images/event_kids_action.jpg",
    alt: "Two young players with hockey sticks on turf",
  },
  {
    id: "photo-goal-shot",
    src: "/images/event_goal_shot.jpg",
    alt: "Striker taking a shot against goalkeeper",
  },
  {
    id: "photo-girls-tents",
    src: "/images/event_girls_tents.jpg",
    alt: "Girls running with ball during outdoor tournament",
  },
  {
    id: "photo-slide-blue",
    src: "/images/event_slide_blue.jpg",
    alt: "Player tackling with stick during competitive match",
  },
  {
    id: "photo-red-action",
    src: "/images/event_red_action.jpg",
    alt: "Player in red jersey in action on field",
  },
  {
    id: "photo-low-tackle",
    src: "/images/event_low_tackle.jpg",
    alt: "Player stretching low with stick on turf",
  },
  {
    id: "photo-indoor-drills",
    src: "/images/event_indoor_drills.jpg",
    alt: "Players performing indoor fitness drills",
  },
  {
    id: "photo-team-fitness",
    src: "/images/event_team_fitness.jpg",
    alt: "Team outdoor fitness conditioning",
  },
  {
    id: "photo-tournaments",
    src: "/images/expertise_tournaments.png",
    alt: "Team celebrating tournament victory",
  },
  {
    id: "photo-team-group",
    src: "/images/about_team_group.png",
    alt: "Wolverines team squad group photo",
  },
  {
    id: "photo-sticks-huddle",
    src: "/images/about_sticks_huddle.png",
    alt: "Team sticks huddle before the match",
  },
];

// Duplicate list for seamless infinite loop
const loopPhotos = [...eventPhotos, ...eventPhotos];

export default function EventsHero() {
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white flex flex-col items-center select-none">
      {/* Self-contained CSS for 100% butter-smooth, continuous infinite autoscroll without hover pause */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes eventInfiniteScroll {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .events-autoscroll-track {
              display: flex;
              width: max-content;
              animation: eventInfiniteScroll 40s linear infinite;
              will-change: transform;
            }
            /* Never pause on hover */
            .events-autoscroll-track:hover,
            .events-autoscroll-track *:hover {
              animation-play-state: running !important;
            }
          `,
        }}
      />

      {/* Top Hero Banner - Full-Bleed 100% Width */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden rounded-t-none rounded-b-[36px] sm:rounded-b-[48px] lg:rounded-b-[60px] bg-neutral-900 min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center justify-center"
      >
        {/* Background Video Container - Full Bleed */}
        <div className="absolute inset-0 w-full h-full bg-neutral-950">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-[center_35%]"
          >
            <source src="/videos/event-hero-section.mp4" type="video/mp4" />
          </video>
          {/* Subtle contrast overlay */}
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        </div>

        {/* Hero Content Container - Standard site-container */}
        <div
          className={`site-container relative z-10 py-14 sm:py-18 lg:py-20 flex flex-col items-center text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          {/* Main Title */}
          <h1
            className="text-[52px] sm:text-[68px] md:text-[84px] lg:text-[96px] font-normal leading-none tracking-wider text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] mb-3 sm:mb-4"
            style={{
              fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
              fontWeight: 400,
            }}
          >
            EVENTS
          </h1>

          {/* Subtitle Quote */}
          <p
            className="text-[15px] sm:text-[17px] md:text-[19px] text-white font-medium max-w-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            style={{
              fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
            }}
          >
            &ldquo;Unleash Your Passion for Hockey – Join Us for the Ultimate Tournament!&rdquo;
          </p>
        </div>
      </section>

      {/* Infinite Auto-Scrolling Photo Row - Full viewport width */}
      <div className="relative w-full overflow-hidden pt-8 sm:pt-10 pb-6 sm:pb-8">
        <div className="events-autoscroll-track gap-4 sm:gap-5 md:gap-6 py-2">
          {loopPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="relative flex-shrink-0 w-[210px] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[300px] sm:h-[340px] md:h-[370px] lg:h-[390px] rounded-2xl sm:rounded-[22px] overflow-hidden bg-neutral-100 shadow-md border border-neutral-200/50"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 210px, (max-width: 1024px) 260px, 280px"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
