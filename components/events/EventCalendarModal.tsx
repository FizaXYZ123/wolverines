"use client";

import React, { useState, useEffect } from "react";
import {
  allCalendarEvents,
  getEventsForDate,
  CalendarEventItem,
} from "./calendarEventsData";

interface EventCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MONTH_NAMES = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function EventCalendarModal({
  isOpen,
  onClose,
}: EventCalendarModalProps) {
  // Default to October 2026 as shown in the mockup
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // 9 = October (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number | null>(5); // Default selected to Oct 5
  const [activeEvents, setActiveEvents] = useState<CalendarEventItem[]>([]);

  // Update active events when year, month or selectedDay changes
  useEffect(() => {
    if (selectedDay !== null) {
      const events = getEventsForDate(currentYear, currentMonth, selectedDay);
      setActiveEvents(events);
    } else {
      setActiveEvents([]);
    }
  }, [currentYear, currentMonth, selectedDay]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
    setSelectedDay(null);
  };

  // Calendar calculations
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const emptyPrefixSlots = Array.from({ length: firstDayOfWeek });
  const daySlots = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200 select-none"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-[420px] sm:max-w-[440px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 flex flex-col transition-all transform duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark Top Header Bar */}
        <div className="bg-[#181818] px-6 py-4 sm:py-5 flex items-center justify-between text-white border-b border-neutral-800">
          <div>
            <h3
              className="text-2xl sm:text-[26px] font-black uppercase tracking-wider leading-none text-white"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
              }}
            >
              EVENT CALENDAR
            </h3>
            <p className="text-xs text-neutral-400 font-medium tracking-normal mt-1">
              Upcoming Events &amp; Matches
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Calendar"
            className="w-9 h-9 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition border border-neutral-700 active:scale-95 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* White Calendar Area */}
        <div className="p-5 sm:p-6 bg-white">
          {/* Month / Year Navigator */}
          <div className="flex items-center justify-between mb-5">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 transition shadow-xs cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <h4
              className="text-lg sm:text-xl font-black text-neutral-900 tracking-wider uppercase"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
              }}
            >
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h4>

            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 transition shadow-xs cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="text-[11px] sm:text-xs font-bold text-neutral-500 tracking-wider py-1"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
            {/* Empty slots before day 1 */}
            {emptyPrefixSlots.map((_, i) => (
              <div key={`empty-${i}`} className="h-10 sm:h-11" />
            ))}

            {/* Days in Month */}
            {daySlots.map((day) => {
              const dayEvents = getEventsForDate(
                currentYear,
                currentMonth,
                day
              );
              const hasMatch = dayEvents.length > 0;
              const isSelected = selectedDay === day;

              if (hasMatch) {
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    aria-label={`${MONTH_NAMES[currentMonth]} ${day}: ${dayEvents.length} event(s)`}
                    className={`h-10 sm:h-11 rounded-xl flex flex-col items-center justify-center transition-all duration-150 cursor-pointer relative border ${
                      isSelected
                        ? "border-[#DE2027] bg-[#FEE8E9] shadow-sm ring-2 ring-[#DE2027]/20"
                        : "border-[#FCA5A5] bg-[#FFF1F2] hover:bg-[#FEE8E9]"
                    }`}
                  >
                    <span className="text-[13px] sm:text-[14px] font-bold text-[#DE2027] leading-tight">
                      {day}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DE2027] mt-0.5 shrink-0" />
                  </button>
                );
              }

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`h-10 sm:h-11 rounded-xl flex flex-col items-center justify-center transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-neutral-100 text-neutral-900 font-bold border border-neutral-300"
                      : "text-neutral-800 hover:bg-neutral-50 font-medium"
                  }`}
                >
                  <span className="text-[13px] sm:text-[14px] leading-tight">
                    {day}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Info Card / Details */}
        <div className="bg-neutral-50 border-t border-neutral-100 px-5 sm:px-6 py-4">
          {selectedDay !== null && activeEvents.length > 0 ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DE2027] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#DE2027] animate-pulse" />
                  Match / Practice Scheduled
                </span>
                <span className="text-xs text-neutral-500 font-semibold">
                  {MONTH_NAMES[currentMonth].slice(0, 3)} {selectedDay},{" "}
                  {currentYear}
                </span>
              </div>

              {activeEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-xs flex flex-col gap-1.5"
                >
                  <h5 className="text-sm font-bold text-neutral-900 leading-snug">
                    {evt.title}
                  </h5>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600">
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5 text-[#DE2027]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {evt.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5 text-[#DE2027]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {evt.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : selectedDay !== null ? (
            <div className="text-center py-2 text-xs text-neutral-500">
              No matches scheduled on {MONTH_NAMES[currentMonth].slice(0, 3)}{" "}
              {selectedDay}, {currentYear}. Check dates with the{" "}
              <span className="text-[#DE2027] font-semibold">red dot</span>.
            </div>
          ) : (
            <div className="text-center py-2 text-xs text-neutral-500">
              Click any date with a{" "}
              <span className="text-[#DE2027] font-semibold">red dot</span> to
              view match details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
