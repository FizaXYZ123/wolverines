"use client";

import React, { useEffect, useState } from "react";

export type ToastType = "error" | "success" | "info" | "warning";

export interface ToastProps {
  type?: ToastType;
  title?: string;
  message: string;
  onClose: () => void;
  duration?: number; // duration in ms
}

export default function Toast({
  type = "error",
  title,
  message,
  onClose,
  duration = 4500,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsVisible(true), 20);

    const dismissTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(dismissTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      className={`fixed top-6 right-4 sm:right-6 z-[99999] max-w-sm w-[calc(100vw-32px)] transition-all duration-250 ease-out transform ${
        isVisible && !isLeaving
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-3"
      }`}
    >
      {/* Simple, Pure White, Clean Card */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-xl p-4 flex items-start gap-3 select-none">
        {/* Simple Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {isSuccess ? (
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-red-50 text-[#DE2027] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          )}
        </div>

        {/* Clear Message */}
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-0.5">
              {title}
            </h5>
          )}
          <p className="text-sm font-medium text-neutral-800 leading-snug break-words">
            {message}
          </p>
        </div>

        {/* Simple Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded transition cursor-pointer flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
