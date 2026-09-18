"use client";

import React, { useState } from "react";
import EventCalendarModal from "./EventCalendarModal";

interface ScheduleItem {
  id: string;
  date: string;
  location: string;
  time: string;
}

const scheduleData: ScheduleItem[] = [
  {
    id: "schedule-1",
    date: "SEPTEMBER 14, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-2",
    date: "SEPTEMBER 21, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-3",
    date: "SEPTEMBER 23, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-4",
    date: "SEPTEMBER 28, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-5",
    date: "SEPTEMBER 30, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-6",
    date: "OCTOBER 5, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-7",
    date: "OCTOBER 8, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-8",
    date: "OCTOBER 12, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-9",
    date: "OCTOBER 19, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-10",
    date: "OCTOBER 26, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-11",
    date: "NOVEMBER 2, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-12",
    date: "NOVEMBER 5, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-13",
    date: "NOVEMBER 9, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-14",
    date: "NOVEMBER 12, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-15",
    date: "NOVEMBER 16, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-16",
    date: "NOVEMBER 19, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-17",
    date: "NOVEMBER 23, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
  {
    id: "schedule-18",
    date: "NOVEMBER 30, 2026",
    location: "32470 Haida Dr. Abbotsford",
    time: "05:00 PM to 07:00 PM",
  },
];

export default function IndoorPracticeSchedule() {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 select-none relative">
      <div className="site-container">
        {/* Section Heading & Event Calendar Button - Cleanly aligned together */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-8 sm:h-10 bg-[#DE2027] rounded-full shrink-0" />
            <h2
              className="text-[#DE2027] text-3xl sm:text-4xl lg:text-[44px] tracking-wide font-normal uppercase leading-none"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
              }}
            >
              INDOOR PRACTICE SCHEDULE
            </h2>
          </div>

          {/* Event Calendar Button */}
          <button
            type="button"
            onClick={() => setIsCalendarOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#DE2027] hover:bg-[#C11B22] text-white font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
          >
            <span className="text-lg">📅</span>
            <span>Event Calendar</span>
          </button>
        </div>

        {/* 3-Column Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {scheduleData.map((item) => (
            <div
              key={item.id}
              className="border border-[#DE2027] rounded-2xl p-5 sm:p-6 bg-white hover:shadow-md transition-shadow duration-200 flex flex-col justify-center"
            >
              {/* Date Header */}
              <h3
                className="text-[15px] sm:text-[16px] font-bold text-[#1a1a1a] uppercase tracking-wide mb-3"
                style={{
                  fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                }}
              >
                {item.date}
              </h3>

              {/* Location Row */}
              <div className="flex items-center gap-2.5 text-[13px] sm:text-[14px] text-neutral-600 mb-2">
                <svg
                  className="w-4 h-4 text-[#DE2027] shrink-0"
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
                <span className="leading-none">{item.location}</span>
              </div>

              {/* Time Row */}
              <div className="flex items-center gap-2.5 text-[13px] sm:text-[14px] text-neutral-600">
                <svg
                  className="w-4 h-4 text-[#DE2027] shrink-0"
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
                <span className="leading-none">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Calendar Modal */}
      <EventCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </section>
  );
}
