"use client";

import React, { useState, useRef, useEffect } from "react";
import { Clock, ChevronDown, Check } from "lucide-react";

interface TimePickerProps {
  value: string; // e.g. "09:00:00", "09:00", "13:02:00", "15:00"
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  placement?: "top" | "bottom";
  align?: "left" | "right";
}

const HOURS_12 = [
  "12",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
];
const MINUTES = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

// Helper: parse time string (24h or 12h) to { hour12, minute, period }
function parseTimeTo12h(timeStr: string) {
  if (!timeStr) {
    return { hour12: "09", minute: "00", period: "AM" };
  }

  const parts = timeStr.split(":");
  let h = parseInt(parts[0] || "9", 10);
  let m = parseInt(parts[1] || "0", 10);

  if (isNaN(h)) h = 9;
  if (isNaN(m)) m = 0;

  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const hour12 = h12 < 10 ? `0${h12}` : `${h12}`;
  const minute = m < 10 ? `0${m}` : `${m}`;

  return { hour12, minute, period };
}

// Helper: convert 12h to HH:mm:ss (24-hour string for backend)
function to24hString(hour12: string, minute: string, period: string): string {
  let h = parseInt(hour12, 10);
  if (isNaN(h)) h = 9;

  if (period === "AM") {
    if (h === 12) h = 0;
  } else {
    if (h !== 12) h += 12;
  }

  const hStr = h < 10 ? `0${h}` : `${h}`;
  const mStr = minute.padStart(2, "0");
  return `${hStr}:${mStr}:00`;
}

export default function TimePicker({
  value,
  onChange,
  label,
  placement = "top",
  align = "left",
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { hour12, minute, period } = parseTimeTo12h(value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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

  const handleHourChange = (newHour: string) => {
    const next24 = to24hString(newHour, minute, period);
    onChange(next24);
  };

  const handleMinuteChange = (newMinute: string) => {
    const next24 = to24hString(hour12, newMinute, period);
    onChange(next24);
  };

  const handlePeriodChange = (newPeriod: string) => {
    const next24 = to24hString(hour12, minute, newPeriod);
    onChange(next24);
  };

  // Formatted display with capital AM / PM and NO (24h) text: e.g. "01:02 PM"
  const displayTime = `${hour12}:${minute} ${period}`;

  // Positioning classes
  const verticalClass =
    placement === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5";
  const horizontalClass = align === "right" ? "right-0" : "left-0";

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
          isOpen
            ? "border-[#D32F2F] ring-1 ring-[#D32F2F]"
            : "border-white/10 hover:border-white/20"
        } text-white text-sm flex items-center justify-between transition-all cursor-pointer group`}
      >
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#D32F2F] shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-semibold tracking-wide text-white text-sm">
            {displayTime}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {/* Compact 12-hour Popover */}
      {isOpen && (
        <div
          className={`absolute ${verticalClass} ${horizontalClass} z-50 w-60 rounded-2xl bg-[#161616] border border-white/15 p-3 shadow-2xl shadow-black/95 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-[11px] text-neutral-400 font-medium">
              Select Time
            </span>
            <span className="text-xs font-bold text-white px-2 py-0.5 rounded bg-white/10 font-mono">
              {displayTime}
            </span>
          </div>

          {/* 3 Columns: Hour (12-11), Min (00-55), AM/PM */}
          <div className="grid grid-cols-3 gap-1.5 mt-2 text-center">
            {/* Hours Column */}
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400 mb-1">
                Hour
              </div>
              <div className="max-h-32 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
                {HOURS_12.map((h) => {
                  const isSelected = h === hour12;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleHourChange(h)}
                      className={`w-full py-1 rounded-md text-xs font-semibold font-mono transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#D32F2F] text-white shadow-sm"
                          : "text-neutral-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minutes Column */}
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400 mb-1">
                Min
              </div>
              <div className="max-h-32 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
                {MINUTES.map((m) => {
                  const isSelected = m === minute;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleMinuteChange(m)}
                      className={`w-full py-1 rounded-md text-xs font-semibold font-mono transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#D32F2F] text-white shadow-sm"
                          : "text-neutral-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Period Column (Capital AM / PM) */}
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400 mb-1">
                Period
              </div>
              <div className="space-y-1.5 pt-0.5">
                {["AM", "PM"].map((p) => {
                  const isSelected = p === period;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePeriodChange(p)}
                      className={`w-full py-2 rounded-md text-xs font-bold font-mono transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#D32F2F] text-white shadow-sm"
                          : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/5"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Done Button */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-1.5 rounded-lg bg-[#D32F2F]/20 hover:bg-[#D32F2F] text-red-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border border-red-500/30"
            >
              <Check className="h-3.5 w-3.5" />
              Set Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
