"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface TournamentEvent {
  id: string;
  name: string;
  category: string;
  location: string;
  dateRange: string;
  dayBadge: string;
  monthBadge: string;
  image: string;
  description: string;
  divisions: string[];
  entryFee: string;
  scheduleHighlights: string[];
  registrationDeadline: string;
}

const tournamentEvents: TournamentEvent[] = [
  {
    id: "event-1",
    name: "WOLVERINES SPRING INVITATIONAL",
    category: "TOURNAMENT",
    location: "Abbotsford Senior Turf Field, BC",
    dateRange: "March 27, 2026 - March 30, 2026",
    dayBadge: "27",
    monthBadge: "MAR",
    image: "/images/event_red_action.jpg",
    description:
      "Kick off the spring season with elite club teams from across British Columbia. High-intensity matches, player scouting, and championship trophies.",
    divisions: ["U14 Co-ed", "U16 Boys & Girls", "U18 Elite", "Senior Premier"],
    entryFee: "$350 per team / $45 individual",
    scheduleHighlights: [
      "March 27: Pool play & opening ceremony (5:00 PM - 9:00 PM)",
      "March 28: Round-robin qualifiers (9:00 AM - 6:00 PM)",
      "March 29: Quarter-finals & Semi-finals (10:00 AM - 5:00 PM)",
      "March 30: Grand Finals & Trophy Presentation (1:00 PM - 5:00 PM)",
    ],
    registrationDeadline: "March 20, 2026",
  },
  {
    id: "event-2",
    name: "FRASER VALLEY YOUTH CHAMPIONSHIP",
    category: "YOUTH LEAGUE",
    location: "Haida Field Turf, Abbotsford, BC",
    dateRange: "April 10, 2026 - April 13, 2026",
    dayBadge: "10",
    monthBadge: "APR",
    image: "/images/event_match_field.jpg",
    description:
      "A premier grassroots championship spotlighting rising junior talent. Focus on sportsmanship, tactical skill building, and fun competitive games.",
    divisions: ["U10 Fundamentals", "U12 Junior Stars", "U14 Rising Champions"],
    entryFee: "$280 per team / $35 individual",
    scheduleHighlights: [
      "April 10: Skills clinic & check-in",
      "April 11: Junior divisional games",
      "April 12: Playoff brackets",
      "April 13: Championship finals & medals",
    ],
    registrationDeadline: "April 2, 2026",
  },
  {
    id: "event-3",
    name: "PACIFIC NORTHWEST CUP",
    category: "CHAMPIONSHIP",
    location: "Burnaby Lake Sports Complex, BC",
    dateRange: "May 1, 2026 - May 4, 2026",
    dayBadge: "01",
    monthBadge: "MAY",
    image: "/images/event_girls_tents.jpg",
    description:
      "Top regional field hockey powerhouses collide in a prestigious 4-day festival of competition, collegiate scouts, and international rules play.",
    divisions: ["U18 Boys", "U18 Girls", "Open Men", "Open Women"],
    entryFee: "$450 per team",
    scheduleHighlights: [
      "May 1: Showcase round matches",
      "May 2: International rules group stage",
      "May 3: Medal round qualifiers",
      "May 4: Gold & Bronze medal clashes",
    ],
    registrationDeadline: "April 22, 2026",
  },
  {
    id: "event-4",
    name: "ALL-STARS SUMMER CLASSIC",
    category: "TOURNAMENT",
    location: "UBC Wright Field, Vancouver, BC",
    dateRange: "June 12, 2026 - June 15, 2026",
    dayBadge: "12",
    monthBadge: "JUN",
    image: "/images/event_slide_blue.jpg",
    description:
      "Summer's premier showcase bringing together Vancouver & Fraser Valley's finest field hockey athletes for fast-paced, high-scoring turf action.",
    divisions: ["U16 Elite", "U18 Showcase", "Masters 35+"],
    entryFee: "$380 per team",
    scheduleHighlights: [
      "June 12: Evening opening fixtures",
      "June 13: Full-day pool games",
      "June 14: Knockout stages",
      "June 15: Summer Classic Champion Crowning",
    ],
    registrationDeadline: "June 3, 2026",
  },
  {
    id: "event-5",
    name: "WOLVERINES JUNIOR GOLD CUP",
    category: "JUNIOR TOURNAMENT",
    location: "Abbotsford Exhibition Park, BC",
    dateRange: "July 3, 2026 - July 6, 2026",
    dayBadge: "03",
    monthBadge: "JUL",
    image: "/images/event_goal_shot.jpg",
    description:
      "Celebrating youth field hockey with competitive brackets, live music, community barbecue, and awards for Best Goalkeeper, Top Scorer & Fair Play.",
    divisions: ["U12 Boys", "U12 Girls", "U14 Boys", "U14 Girls"],
    entryFee: "$300 per team",
    scheduleHighlights: [
      "July 3: Player orientation & group matches",
      "July 4: Mid-tournament shoot-out contest",
      "July 5: Semi-finals",
      "July 6: Gold Cup Finals & Community BBQ",
    ],
    registrationDeadline: "June 25, 2026",
  },
  {
    id: "event-6",
    name: "INDEPENDENCE 7V7 SHOOTOUT",
    category: "FESTIVAL",
    location: "Tamanawis Park, Surrey, BC",
    dateRange: "July 17, 2026 - July 19, 2026",
    dayBadge: "17",
    monthBadge: "JUL",
    image: "/images/event_kids_action.jpg",
    description:
      "Rapid-fire 7-a-side field hockey tournament on half-turfs. High tempo, non-stop shots on goal, and exciting penalty shootout tiebreakers.",
    divisions: ["Mixed Open", "U16 Mixed", "Recreational Adults"],
    entryFee: "$220 per team",
    scheduleHighlights: [
      "July 17: Twilight 7v7 rounds",
      "July 18: Non-stop bracket battles",
      "July 19: Sudden-death shootout finals",
    ],
    registrationDeadline: "July 10, 2026",
  },
  {
    id: "event-7",
    name: "BC PROVINCIAL TROPHY SERIES",
    category: "PROVINCIAL CUP",
    location: "Rutledge Field, West Vancouver, BC",
    dateRange: "August 7, 2026 - August 10, 2026",
    dayBadge: "07",
    monthBadge: "AUG",
    image: "/images/event_fence_battle.jpg",
    description:
      "The pinnacle of provincial field hockey. Teams compete across 4 days for ranking points, provincial titles, and selection into Team BC squads.",
    divisions: ["U16 Provincial", "U18 Provincial", "Senior Premier"],
    entryFee: "$480 per team",
    scheduleHighlights: [
      "August 7: Technical briefing & matches",
      "August 8: Championship pool games",
      "August 9: Cross-over eliminations",
      "August 10: Provincial Championship final",
    ],
    registrationDeadline: "July 28, 2026",
  },
  {
    id: "event-8",
    name: "CANADIAN HERITAGE HOCKEY DERBY",
    category: "INVITATIONAL",
    location: "Victoria Field Hockey Turf, BC",
    dateRange: "August 28, 2026 - August 31, 2026",
    dayBadge: "28",
    monthBadge: "AUG",
    image: "/images/event_team_fitness.jpg",
    description:
      "A storied long-weekend invitational honoring British Columbia's deep field hockey roots. Includes alumni games, youth showcases, and food trucks.",
    divisions: ["Alumni Masters", "Competitive Men", "Competitive Women"],
    entryFee: "$360 per team",
    scheduleHighlights: [
      "August 28: Opening alumni match",
      "August 29: Tournament group stage",
      "August 30: Derby semi-finals",
      "August 31: Final trophy presentation",
    ],
    registrationDeadline: "August 18, 2026",
  },
  {
    id: "event-9",
    name: "AUTUMN CHAMPIONS LEAGUE",
    category: "PREMIER LEAGUE",
    location: "Abbotsford Senior Turf Field, BC",
    dateRange: "September 18, 2026 - September 21, 2026",
    dayBadge: "18",
    monthBadge: "SEP",
    image: "/images/expertise_tournaments.png",
    description:
      "Fall kick-off championship where top clubs test their newly assembled squads before regular season league play begins.",
    divisions: ["U14", "U16", "U18", "Senior Men"],
    entryFee: "$340 per team",
    scheduleHighlights: [
      "Sept 18: Friday evening warm-up fixtures",
      "Sept 19: League stage matches",
      "Sept 20: Elimination battles",
      "Sept 21: Championship match",
    ],
    registrationDeadline: "September 9, 2026",
  },
  {
    id: "event-10",
    name: "WOLVERINES WINTER FROST SHOWCASE",
    category: "WINTER TOURNAMENT",
    location: "Haida Indoor Sports Arena, Abbotsford, BC",
    dateRange: "December 4, 2026 - December 7, 2026",
    dayBadge: "04",
    monthBadge: "DEC",
    image: "/images/event_low_tackle.jpg",
    description:
      "Indoor field hockey at its highest level. Sideboards, lightning-fast passing, and tight stick handling inside our temperature-controlled arena.",
    divisions: ["Junior Indoor", "Senior Men Indoor", "Senior Women Indoor"],
    entryFee: "$320 per team",
    scheduleHighlights: [
      "Dec 4: Board rules orientation & games",
      "Dec 5: Indoor league rounds",
      "Dec 6: Playoff knockouts",
      "Dec 7: Frost Cup Championship",
    ],
    registrationDeadline: "November 25, 2026",
  },
];

export default function UpcomingTournamentsList() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedEvent, setSelectedEvent] = useState<TournamentEvent | null>(null);

  const displayedEvents = tournamentEvents.slice(0, visibleCount);
  const hasMore = visibleCount < tournamentEvents.length;

  const handleShowMore = () => {
    setVisibleCount(tournamentEvents.length);
  };

  return (
    <section className="w-full py-14 sm:py-20 lg:py-18 select-none">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
            <div
              className="w-[8px] sm:w-[10px] h-[30px] sm:h-[36px] flex-shrink-0"
              style={{
                background:
                  "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
              }}
            />
            <h2
              className="text-3xl sm:text-4xl lg:text-[44px] tracking-wide font-normal uppercase text-neutral-900"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
              }}
            >
              UPCOMING TOURNAMENTS & EVENTS
            </h2>
          </div>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            Register your team or join as an individual player for high-energy field hockey tournaments across British Columbia.
          </p>
        </div>

        {/* List of Tournament Cards */}
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
          {displayedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center group"
            >
              {/* Left Column: Event Details */}
              <div className="lg:col-span-7 flex flex-col items-start justify-center order-2 lg:order-1">
                {/* Event Name with Vertical Red Gradient Accent */}
                <div className="flex items-start gap-3 sm:gap-3.5 mb-1">
                  <div
                    className="w-[8px] sm:w-[10px] h-[28px] sm:h-[34px] lg:h-[38px] flex-shrink-0 mt-0.5"
                    style={{
                      background:
                        "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
                    }}
                  />
                  <h3
                    className="text-2xl sm:text-3xl lg:text-[34px] font-normal leading-none tracking-wide text-neutral-900 uppercase"
                    style={{
                      fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                    }}
                  >
                    {event.name}
                  </h3>
                </div>

                {/* Subtitle / Category */}
                <p
                  className="text-neutral-500 text-base sm:text-lg uppercase tracking-wider font-normal mb-5 ml-[19px] sm:ml-[23px]"
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                  }}
                >
                  {event.category}
                </p>

                {/* Location Row */}
                <div className="flex items-center gap-2.5 text-[14px] sm:text-[15px] text-neutral-700 mb-2.5 ml-[19px] sm:ml-[23px]">
                  <svg
                    className="w-4 h-4 text-[#D32F2F] shrink-0"
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
                  <span className="font-normal">{event.location}</span>
                </div>

                {/* Date Row */}
                <div className="flex items-center gap-2.5 text-[14px] sm:text-[15px] text-neutral-700 mb-6 sm:mb-8 ml-[19px] sm:ml-[23px]">
                  <svg
                    className="w-4 h-4 text-[#D32F2F] shrink-0"
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
                  <span className="font-normal">{event.dateRange}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 ml-[19px] sm:ml-[23px]">
                  <Link
                    href={`/registration?event=${encodeURIComponent(event.name)}`}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-lg bg-[#D32F2F] text-white font-medium text-sm hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                    style={{
                      fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                    }}
                  >
                    Register Now
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-neutral-600 hover:text-neutral-900 font-medium text-sm hover:bg-neutral-100/80 transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Right Column: Event Image with Ribbon Bookmark Date Badge */}
              <div className="lg:col-span-5 relative w-full order-1 lg:order-2">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  {/* Bookmark Ribbon Badge at top-left with V-notch */}
                  <div
                    className="absolute top-0 left-5 sm:left-6 z-20 w-12 sm:w-14 h-16 sm:h-18 bg-[#D32F2F] text-white flex flex-col items-center justify-start pt-1.5 sm:pt-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)",
                    }}
                  >
                    <span
                      className="text-xl sm:text-2xl font-bold leading-none tracking-tight"
                      style={{
                        fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                      }}
                    >
                      {event.dayBadge}
                    </span>
                    <span
                      className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mt-0.5"
                      style={{
                        fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                      }}
                    >
                      {event.monthBadge}
                    </span>
                  </div>

                  {/* Photo with zoom on hover */}
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Show More" Button - Reveals All 10 Events */}
        {hasMore && (
          <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={handleShowMore}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#D32F2F] text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
              style={{
                fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
              }}
            >
              <span>Show More Tournaments ({tournamentEvents.length - visibleCount} More)</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <p className="text-xs text-neutral-400 mt-2">
              Viewing {displayedEvents.length} of {tournamentEvents.length} scheduled events
            </p>
          </div>
        )}
      </div>

      {/* Interactive "View Details" Event Screen / Modal Drawer */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-neutral-200 p-6 sm:p-8 lg:p-10">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors z-20"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Event Image Banner */}
            <div className="relative w-full h-[220px] sm:h-[280px] rounded-2xl overflow-hidden mb-6 shadow-md">
              <div
                className="absolute top-0 left-6 z-20 w-14 h-18 bg-[#D32F2F] text-white flex flex-col items-center justify-start pt-2 drop-shadow-md"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)",
                }}
              >
                <span
                  className="text-2xl font-bold leading-none tracking-tight"
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                  }}
                >
                  {selectedEvent.dayBadge}
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase mt-0.5">
                  {selectedEvent.monthBadge}
                </span>
              </div>
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.name}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="inline-block px-2.5 py-1 rounded bg-[#D32F2F] text-xs font-semibold uppercase tracking-wide mb-1.5">
                  {selectedEvent.category}
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-normal leading-tight uppercase"
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                  }}
                >
                  {selectedEvent.name}
                </h3>
              </div>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium">VENUE</p>
                  <p className="text-sm font-semibold text-neutral-800">
                    {selectedEvent.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium">DATES</p>
                  <p className="text-sm font-semibold text-neutral-800">
                    {selectedEvent.dateRange}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4
                className="text-lg font-bold text-neutral-900 uppercase tracking-wide mb-2"
                style={{
                  fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                }}
              >
                About This Event
              </h4>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Divisions & Entry Fee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h4
                  className="text-lg font-bold text-neutral-900 uppercase tracking-wide mb-2"
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                  }}
                >
                  Age Divisions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.divisions.map((div, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-neutral-100 text-neutral-800 text-xs font-medium"
                    >
                      {div}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4
                  className="text-lg font-bold text-neutral-900 uppercase tracking-wide mb-2"
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                  }}
                >
                  Entry Fee & Deadline
                </h4>
                <p className="text-sm font-semibold text-[#D32F2F]">
                  {selectedEvent.entryFee}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Registration Closes: {selectedEvent.registrationDeadline}
                </p>
              </div>
            </div>

            {/* Schedule Highlights */}
            <div className="mb-8">
              <h4
                className="text-lg font-bold text-neutral-900 uppercase tracking-wide mb-2"
                style={{
                  fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                }}
              >
                Schedule Outline
              </h4>
              <ul className="space-y-2">
                {selectedEvent.scheduleHighlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition"
              >
                Close
              </button>

              <Link
                href={`/registration?event=${encodeURIComponent(selectedEvent.name)}`}
                className="px-8 py-3 rounded-lg bg-[#D32F2F] text-white text-sm font-medium hover:bg-red-700 transition shadow-md hover:shadow-lg"
              >
                Register for {selectedEvent.name} &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
