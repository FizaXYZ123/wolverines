"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PhoneCountryInput from "@/components/ui/PhoneCountryInput";

const PROGRAMS = [
  {
    id: "youth-academy",
    label: "Youth Development Academy (U11 - U15)",
    sub: "Fundamental technical skills, stickwork & athletic conditioning",
  },
  {
    id: "elite-squad",
    label: "Elite Tournament Team (U16 - U18)",
    sub: "High-performance championship preparation & tactical development",
  },
  {
    id: "beginner-camp",
    label: "Junior Beginners Training Camp",
    sub: "Fun, introductory field hockey drills & matchplay fundamentals",
  },
  {
    id: "goalkeeper",
    label: "Goalkeeper Specialized Clinic",
    sub: "Kick control, reaction drills, diving & penalty corner defense",
  },
  {
    id: "adult-recreation",
    label: "Adult & Senior League Practice",
    sub: "Weekly scrimmages, fitness sessions & community master tournaments",
  },
];

const AGE_GROUPS = ["Under 11", "Under 13", "Under 15", "Under 18", "Adult / Open"];

export default function RegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ageGroup, setAgeGroup] = useState(AGE_GROUPS[1]);
  const [selectedProgram, setSelectedProgram] = useState(PROGRAMS[0].id);
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const programDropdownRef = useRef<HTMLDivElement>(null);
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const ageDropdownRef = useRef<HTMLDivElement>(null);
  const [experienceLevel, setExperienceLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        programDropdownRef.current &&
        !programDropdownRef.current.contains(e.target as Node)
      ) {
        setIsProgramOpen(false);
      }
      if (
        ageDropdownRef.current &&
        !ageDropdownRef.current.contains(e.target as Node)
      ) {
        setIsAgeOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsProgramOpen(false);
        setIsAgeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section className="w-full bg-white select-none py-10 sm:py-16">
      {/* Self-contained animations for Registration Form */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes regFormFadeIn {
              0% {
                opacity: 0;
                transform: translateY(24px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes regDropdownOpen {
              0% {
                opacity: 0;
                transform: translateY(-8px) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .animate-reg-form {
              animation: regFormFadeIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
            }
            .animate-reg-dropdown {
              animation: regDropdownOpen 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Official Brand Red Gradient Bar */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <div
            className="w-[8px] sm:w-[10px] h-[30px] sm:h-[36px] flex-shrink-0"
            style={{
              background:
                "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
            }}
          />
          <h2
            className="text-2xl sm:text-3xl lg:text-[34px] font-normal uppercase text-neutral-900 tracking-wide leading-none"
            style={{
              fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
            }}
          >
            PLAYER ENQUIRY &amp; REGISTRATION
          </h2>
        </div>

        {isSubmitted ? (
          /* Thank You Screen */
          <div className="bg-neutral-50 rounded-2xl p-8 sm:p-12 border border-neutral-200 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              ✓
            </div>
            <h3
              className="text-3xl sm:text-4xl font-normal uppercase text-neutral-900 mb-3"
              style={{
                fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
              }}
            >
              ENQUIRY SUBMITTED SUCCESSFULLY!
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
              Thank you, <strong className="text-neutral-900 font-bold">{fullName}</strong>. Our coaching coordinators will review your details and contact you at{" "}
              <strong className="text-neutral-900 font-bold">{email || phoneNumber}</strong> shortly with session dates and registration paperwork.
            </p>
            <div className="bg-white p-4 rounded-xl border border-neutral-200 text-left text-xs sm:text-sm text-neutral-600 mb-6 space-y-1.5">
              <p>
                <strong>Reference ID:</strong> WLV-REG-{Math.floor(100000 + Math.random() * 900000)}
              </p>
              <p>
                <strong>Program:</strong> {PROGRAMS.find((p) => p.id === selectedProgram)?.label}
              </p>
              <p>
                <strong>Age Category:</strong> {ageGroup}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFullName("");
                setEmail("");
                setPhoneNumber("");
                setMessage("");
              }}
              className="px-8 py-3 rounded-lg bg-[#DE2027] hover:bg-[#c41920] text-white font-bold text-sm tracking-wide shadow-sm transition"
            >
              Submit Another Registration
            </button>
          </div>
        ) : (
          /* The Registration Form */
          <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl animate-reg-form">
            {/* ROW 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">
                  Full Name <span className="text-[#DE2027]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Player / Guardian Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">
                  Email Address <span className="text-[#DE2027]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition"
                />
              </div>
            </div>

            {/* ROW 2: Contact Number & Age Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">
                  Contact Number <span className="text-[#DE2027]">*</span>
                </label>
                <PhoneCountryInput
                  required
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  defaultCountryCode="CA"
                  placeholder="604-555-0199"
                />
              </div>

              {/* Age Category with Custom Wolverines Hockey Background Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">
                  Age Category <span className="text-[#DE2027]">*</span>
                </label>
                <div className="relative" ref={ageDropdownRef}>
                  {/* Custom Trigger Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAgeOpen((prev) => !prev);
                      setIsProgramOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded border transition cursor-pointer text-left bg-white ${
                      isAgeOpen
                        ? "border-neutral-900 ring-2 ring-neutral-900/10"
                        : "border-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-[#DE2027] flex-shrink-0" />
                      <span className="text-sm font-medium text-neutral-900 truncate">
                        {ageGroup || "Select Age Category"}
                      </span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-neutral-500 flex-shrink-0 ml-2 transition-transform duration-200 ${
                        isAgeOpen ? "rotate-180 text-[#DE2027]" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Popup with Wolverines Field Hockey Background Image */}
                  {isAgeOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 z-40 rounded-xl overflow-hidden border border-neutral-700/80 shadow-2xl animate-reg-dropdown">
                      {/* Background: Field Hockey Stick with WOLVERINES branding & Red Jersey on Turf */}
                      <div className="absolute inset-0 z-0 pointer-events-none">
                        <Image
                          src="/images/hockey_age_wolverines_bg.jpg"
                          alt="Wolverines Field Hockey background"
                          fill
                          className="object-cover object-center"
                        />
                        {/* Minor subtle overlay so hockey image & Wolverines text are clearly visible */}
                        <div className="absolute inset-0 bg-black/25" />
                      </div>

                      {/* Dropdown Options List - Transparent items with only tick indicator */}
                      <div className="relative z-10 p-3 space-y-1 max-h-[340px] overflow-y-auto">
                        {AGE_GROUPS.map((ag) => {
                          const isSelected = ageGroup === ag;
                          return (
                            <button
                              key={ag}
                              type="button"
                              onClick={() => {
                                setAgeGroup(ag);
                                setIsAgeOpen(false);
                              }}
                              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-colors duration-150 cursor-pointer bg-transparent hover:bg-white/10"
                            >
                              <span
                                className={`text-sm tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${
                                  isSelected
                                    ? "text-white font-bold"
                                    : "text-white/95 font-medium hover:text-white"
                                }`}
                              >
                                {ag}
                              </span>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-[#DE2027] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-md ml-3">
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ROW 3: Program Selection with Custom Hockey Background Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-neutral-800 mb-2">
                Select Training Program <span className="text-[#DE2027]">*</span>
              </label>
              <div className="relative" ref={programDropdownRef}>
                {/* Custom Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsProgramOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded border transition cursor-pointer text-left bg-white ${
                    isProgramOpen
                      ? "border-neutral-900 ring-2 ring-neutral-900/10"
                      : "border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#DE2027] flex-shrink-0" />
                    <span className="text-sm font-medium text-neutral-900 truncate">
                      {PROGRAMS.find((p) => p.id === selectedProgram)?.label || "Select Training Program"}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-neutral-500 flex-shrink-0 ml-2 transition-transform duration-200 ${
                      isProgramOpen ? "rotate-180 text-[#DE2027]" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Popup with Field Hockey Background Image */}
                {isProgramOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-40 rounded-xl overflow-hidden border border-neutral-700/80 shadow-2xl animate-reg-dropdown">
                    {/* Background: Field Hockey Stick & Ball on Green Turf under Stadium Lights */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      <Image
                        src="/images/hockey_dropdown_bg.jpg"
                        alt="Field Hockey background"
                        fill
                        className="object-cover object-center"
                      />
                      {/* Minor subtle overlay so the hockey turf, stick and ball are clearly visible */}
                      <div className="absolute inset-0 bg-black/25" />
                    </div>

                    {/* Dropdown Options List - Transparent items with only tick indicator */}
                    <div className="relative z-10 p-3 space-y-1 max-h-[340px] overflow-y-auto">
                      {PROGRAMS.map((prog) => {
                        const isSelected = selectedProgram === prog.id;
                        return (
                          <button
                            key={prog.id}
                            type="button"
                            onClick={() => {
                              setSelectedProgram(prog.id);
                              setIsProgramOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-colors duration-150 cursor-pointer bg-transparent hover:bg-white/10"
                          >
                            <span
                              className={`text-sm tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${
                                isSelected
                                  ? "text-white font-bold"
                                  : "text-white/95 font-medium hover:text-white"
                              }`}
                            >
                              {prog.label}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#DE2027] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-md ml-3">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ROW 4: Experience Level Radio Buttons */}
            <div>
              <label className="block text-sm font-semibold text-neutral-800 mb-2.5">
                Player Hockey Experience <span className="text-[#DE2027]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "beginner", label: "Beginner / New to Sport" },
                  { id: "intermediate", label: "Intermediate (1-3 yrs)" },
                  { id: "advanced", label: "Advanced / Competitive" },
                ].map((exp) => (
                  <label
                    key={exp.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition ${
                      experienceLevel === exp.id
                        ? "border-[#DE2027] bg-[#DE2027]/5 text-neutral-900 font-medium"
                        : "border-neutral-300 hover:bg-neutral-50 text-neutral-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      checked={experienceLevel === exp.id}
                      onChange={() => setExperienceLevel(exp.id as any)}
                      className="w-4 h-4 text-[#DE2027] accent-[#DE2027] cursor-pointer"
                    />
                    <span className="text-sm">{exp.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ROW 5: Questions / Message */}
            <div>
              <label className="block text-sm font-semibold text-neutral-800 mb-2">
                Questions or Special Requirements (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Share any questions about schedules, equipment requirements, or financial assistance..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition resize-y"
              />
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="px-10 py-3 rounded bg-[#DE2027] hover:bg-[#c41920] active:bg-[#a8141a] text-white font-bold text-sm tracking-wide shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? "Submitting..." : "Submit Enquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
