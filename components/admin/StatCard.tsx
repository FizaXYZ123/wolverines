"use client";

import { LucideIcon } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  gradient?: string;
  trend?: string;
  trendUp?: boolean;
  isLoading?: boolean;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = "from-[#D32F2F] to-[#991b1b]",
  trend,
  trendUp,
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-[#141414] border border-white/10 p-5 sm:p-6 shadow-xl animate-pulse">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1 pr-4">
            <div className="h-3.5 w-24 bg-white/10 rounded-md" />
            <div className="h-8 w-28 bg-white/15 rounded-lg mt-2" />
            <div className="h-3 w-32 bg-white/5 rounded-md mt-1.5" />
          </div>
          <div className="h-12 w-12 rounded-2xl bg-white/10 shrink-0" />
        </div>
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="h-3 w-24 bg-white/10 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#141414] border border-white/10 p-5 sm:p-6 shadow-xl hover:border-white/20 transition-all duration-300 group">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-red-600/10 to-transparent blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {value}
          </h3>
          {subtitle && (
            <p className="mt-1 text-xs text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-red-950/40 shrink-0 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-xs">
          <span
            className={`font-semibold ${
              trendUp ? "text-emerald-400" : "text-neutral-400"
            }`}
          >
            {trend}
          </span>
        </div>
      )}
    </div>
  );
}
