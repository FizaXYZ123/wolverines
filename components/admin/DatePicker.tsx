"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, Check } from "lucide-react";

interface DatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  placement?: "top" | "bottom";
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Helper to format "YYYY-MM-DD" to "MMM DD, YYYY"
function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "Select date";
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return dateStr;
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// Helper to format Date obj to YYYY-MM-DD
function toDateString(year: number, monthIndex: number, day: number): string {
  const yStr = String(year);
  const mStr = String(monthIndex + 1).padStart(2, "0");
  const dStr = String(day).padStart(2, "0");
  return `${yStr}-${mStr}-${dStr}`;
}

export default function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Select date",
  placement = "bottom",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial view year and month
  const initialDate = value ? new Date(value + "T00:00:00") : new Date();
  const validInitial = isNaN(initialDate.getTime()) ? new Date() : initialDate;

  const [viewYear, setViewYear] = useState(validInitial.getFullYear());
  const [viewMonth, setViewMonth] = useState(validInitial.getMonth());

  // Sync view when value changes
  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (year: number, month: number, day: number) => {
    const formatted = toDateString(year, month, day);
    onChange(formatted);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const today = new Date();
    const formatted = toDateString(today.getFullYear(), today.getMonth(), today.getDate());
    onChange(formatted);
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setIsOpen(false);
  };

  // Generate calendar days
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  // Calendar cells
  const calendarCells = [];

  // Previous month padding days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonthIndex = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    calendarCells.push({
      day,
      month: prevMonthIndex,
      year: prevYear,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    calendarCells.push({
      day,
      month: viewMonth,
      year: viewYear,
      isCurrentMonth: true,
    });
  }

  // Next month padding days to complete 35 or 42 grid
  const totalCells = calendarCells.length <= 35 ? 35 : 42;
  const remaining = totalCells - calendarCells.length;
  for (let day = 1; day <= remaining; day++) {
    const nextMonthIndex = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    calendarCells.push({
      day,
      month: nextMonthIndex,
      year: nextYear,
      isCurrentMonth: false,
    });
  }

  const todayStr = toDateString(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const displayDateText = value ? formatDisplayDate(value) : placeholder;

  const verticalClass = placement === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5";

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border ${
          isOpen ? "border-[#D32F2F] ring-1 ring-[#D32F2F]" : "border-white/10 hover:border-white/20"
        } text-white text-sm flex items-center justify-between transition-all cursor-pointer group`}
      >
        <div className="flex items-center gap-2.5">
          <CalendarIcon className="h-4 w-4 text-[#D32F2F] shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium text-white text-sm">
            {displayDateText}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {/* Popover Calendar */}
      {isOpen && (
        <div
          className={`absolute ${verticalClass} left-0 z-50 w-72 rounded-2xl bg-[#161616] border border-white/15 p-3.5 shadow-2xl shadow-black/95 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header Navigation */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-xs font-bold text-white tracking-wide">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mt-2 mb-1 text-center">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="text-[10px] font-bold uppercase text-neutral-500 py-0.5">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarCells.map((cell, idx) => {
              const cellDateStr = toDateString(cell.year, cell.month, cell.day);
              const isSelected = value === cellDateStr;
              const isToday = todayStr === cellDateStr;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectDay(cell.year, cell.month, cell.day)}
                  className={`h-7 w-7 mx-auto rounded-lg text-xs font-medium transition-all flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? "bg-[#D32F2F] text-white font-bold shadow-md shadow-red-950"
                      : isToday
                      ? "border border-red-500/50 text-white font-semibold hover:bg-white/10"
                      : cell.isCurrentMonth
                      ? "text-neutral-200 hover:bg-white/10 hover:text-white"
                      : "text-neutral-600 hover:text-neutral-400 hover:bg-white/5"
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleSelectToday}
              className="text-[11px] font-semibold text-neutral-400 hover:text-[#D32F2F] transition-colors cursor-pointer px-1 py-0.5 rounded hover:bg-white/5"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
