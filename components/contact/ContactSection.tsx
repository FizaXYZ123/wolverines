"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  COUNTRIES,
  CountryItem,
  getCountryPhoneRule,
} from "@/components/ui/PhoneCountryInput";
import { API_ENDPOINTS } from "@/constants/endpoints";
import Toast, { ToastType } from "@/components/ui/Toast";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(() => {
    return COUNTRIES.find((c) => c.code === "CA") || COUNTRIES[0];
  });
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countrySearchInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  // Close country dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    }
    if (isCountryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => {
        countrySearchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentPhoneRule = getCountryPhoneRule(selectedCountry.code);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    const truncated = digitsOnly.slice(0, currentPhoneRule.maxLength);
    setFormData((prev) => ({ ...prev, contactNumber: truncated }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    const input = e.currentTarget;
    const hasSelection =
      (input.selectionEnd ?? 0) - (input.selectionStart ?? 0) > 0;
    if (!hasSelection && formData.contactNumber.length >= currentPhoneRule.maxLength) {
      e.preventDefault();
    }
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const digitsOnly = pastedText.replace(/\D/g, "");
    const truncated = digitsOnly.slice(0, currentPhoneRule.maxLength);
    setFormData((prev) => ({ ...prev, contactNumber: truncated }));
  };

  const handleSelectCountry = (country: CountryItem) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setCountrySearchQuery("");
    const newRule = getCountryPhoneRule(country.code);
    if (formData.contactNumber.length > newRule.maxLength) {
      setFormData((prev) => ({
        ...prev,
        contactNumber: prev.contactNumber.slice(0, newRule.maxLength),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setToast({ message: "Please enter your name.", type: "error" });
      return;
    }
    if (!formData.email.trim()) {
      setToast({ message: "Please enter your email address.", type: "error" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setToast({ message: "Invalid email address format.", type: "error" });
      return;
    }
    if (!formData.contactNumber.trim()) {
      setToast({ message: "Please enter your contact number.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        countryCode: selectedCountry.dial,
        contactNumber: formData.contactNumber.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim() || undefined,
      };

      const res = await fetch(API_ENDPOINTS.CONTACT_US, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setToast({
          message: result.error || result.message || "Failed to submit contact inquiry",
          type: "error",
        });
        return;
      }

      setToast({
        message: result.message || "Your message has been sent successfully",
        type: "success",
      });
      setSubmitted(true);
      setFormData({ fullName: "", email: "", contactNumber: "", message: "" });
    } catch {
      setToast({
        message: "Network error. Please check your connection and try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={sectionRef} className="relative w-full bg-white overflow-hidden select-none">
      {/* ─── RED ANGLED HEADER BANNER WITH WORLD MAP ─── */}
      <div
        className="absolute top-0 left-0 w-full bg-[#D21E26] overflow-hidden pointer-events-none h-[200px] sm:h-[280px] lg:h-[520px]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 88%)",
        }}
      >
        {/* Centered container so map stays aligned with CONTACT US on all screen sizes */}
        <div className="site-container relative h-full">
          <div className="relative w-full h-full">
            <img
              src="/images/contact-world-map.png?v=2"
              alt="World Map"
              className="w-full h-full object-cover object-left-top mix-blend-screen opacity-90 brightness-110 contrast-125"
            />
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT CONTAINER (GRID) ─── */}
      <div className="relative z-10 site-container pt-4 sm:pt-8 lg:pt-14 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Map viewing space on top + CONTACT US info below */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Top spacer to show world map clearly in the red banner */}
            <div className="h-[150px] sm:h-[230px] lg:h-[350px] w-full pointer-events-none" />

            {/* CONTACT US Details Section */}
            <div
              className={`pt-6 sm:pt-10 lg:pt-14 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {/* Heading */}
              <h1
                className="text-[34px] sm:text-[40px] uppercase text-neutral-900 tracking-normal leading-none mb-2"
                style={{ fontFamily: 'var(--font-bebas-neue), "Bebas Neue", var(--font-open-sans), "Open Sans", sans-serif' }}
              >
                CONTACT US
              </h1>

              {/* Subtitle */}
              <p
                className="text-neutral-500 text-sm sm:text-base mb-8 sm:mb-10 font-normal"
                style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
              >
                We&apos;re here to help you.
              </p>

              {/* Info Rows */}
              <div className="flex flex-col gap-6 sm:gap-7">
                {/* CALL */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10">
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 43 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-9 h-9 sm:w-10 sm:h-10"
                    >
                      <path
                        d="M30.1041 0L32.0361 0.522C34.3988 1.16136 36.5526 2.40899 38.2826 4.14047C40.0127 5.87196 41.2586 8.02677 41.8961 10.39L42.4161 12.32L38.5561 13.362L38.0341 11.432C37.5786 9.74395 36.6884 8.20482 35.4524 6.96814C34.2165 5.73147 32.6779 4.84046 30.9901 4.384L29.0601 3.86L30.1041 0ZM5.78788e-05 0.426H17.1601L20.1341 13.806L16.4141 17.526C18.6013 20.93 21.4955 23.8235 24.9001 26.01L28.6201 22.292L42.0001 25.266V42.426H40.0001C32.3007 42.4391 24.7629 40.2188 18.3001 36.034C13.5345 32.9499 9.47614 28.8916 6.39206 24.126C2.2073 17.6632 -0.0130701 10.1253 5.78788e-05 2.426V0.426ZM4.05406 4.426C4.39108 10.6658 6.35551 16.7088 9.75206 21.954C12.5287 26.2439 16.1821 29.8974 20.4721 32.674C25.7173 36.0705 31.7602 38.035 38.0001 38.372V28.474L29.8941 26.674L25.5461 31.024L24.2201 30.27C19.1853 27.4089 15.0171 23.2407 12.1561 18.206L11.4021 16.88L15.7521 12.532L13.9521 4.426H4.05406ZM28.2761 6.756L30.2081 7.278C31.3894 7.59768 32.4663 8.2215 33.3314 9.08724C34.1964 9.95298 34.8193 11.0304 35.1381 12.212L35.6581 14.142L31.7981 15.184L31.2761 13.254C31.1393 12.7476 30.8721 12.2858 30.5012 11.9149C30.1302 11.544 29.6685 11.2768 29.1621 11.14L27.2321 10.618L28.2761 6.756Z"
                        fill="#DE2027"
                      />
                    </svg>
                  </div>
                  <div>
                    <span
                      className="block text-[11px] font-bold tracking-widest uppercase text-neutral-900 mb-0.5"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    >
                      CALL
                    </span>
                    <a
                      href="tel:+16047101373"
                      className="text-sm sm:text-base text-neutral-700 hover:text-[#DE2027] transition-colors font-medium"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    >
                      +1 604-710-1373
                    </a>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-9 h-9 sm:w-10 sm:h-10"
                    >
                      <path
                        d="M24 6.00005C20.287 6.00005 16.726 7.47504 14.1005 10.1006C11.475 12.7261 10 16.287 10 20C10 25.724 13.564 31.246 17.476 35.524C19.4763 37.7033 21.6589 39.7079 24 41.516C24.3493 41.248 24.7593 40.9214 25.23 40.536C27.1096 38.9926 28.8786 37.3191 30.524 35.528C34.436 31.246 38 25.726 38 20C38 16.287 36.525 12.7261 33.8995 10.1006C31.274 7.47504 27.713 6.00005 24 6.00005ZM24 46.428L22.866 45.648L22.86 45.644L22.848 45.634L22.808 45.606L22.658 45.5L22.118 45.106C19.3817 43.0496 16.8398 40.7466 14.524 38.226C10.436 33.75 6 27.272 6 19.998C6 15.2241 7.89642 10.6458 11.2721 7.27012C14.6477 3.89447 19.2261 1.99805 24 1.99805C28.7739 1.99805 33.3523 3.89447 36.7279 7.27012C40.1036 10.6458 42 15.2241 42 19.998C42 27.272 37.564 33.752 33.476 38.222C31.1609 40.7425 28.6196 43.0455 25.884 45.102C25.6561 45.2723 25.4261 45.4396 25.194 45.604L25.152 45.632L25.14 45.642L25.136 45.644L24 46.428ZM24 16C22.9391 16 21.9217 16.4215 21.1716 17.1716C20.4214 17.9218 20 18.9392 20 20C20 21.0609 20.4214 22.0783 21.1716 22.8285C21.9217 23.5786 22.9391 24 24 24C25.0609 24 26.0783 23.5786 26.8284 22.8285C27.5786 22.0783 28 21.0609 28 20C28 18.9392 27.5786 17.9218 26.8284 17.1716C26.0783 16.4215 25.0609 16 24 16ZM16 20C16 17.8783 16.8429 15.8435 18.3431 14.3432C19.8434 12.8429 21.8783 12 24 12C26.1217 12 28.1566 12.8429 29.6569 14.3432C31.1571 15.8435 32 17.8783 32 20C32 22.1218 31.1571 24.1566 29.6569 25.6569C28.1566 27.1572 26.1217 28 24 28C21.8783 28 19.8434 27.1572 18.3431 25.6569C16.8429 24.1566 16 22.1218 16 20Z"
                        fill="#DE2027"
                      />
                    </svg>
                  </div>
                  <div>
                    <span
                      className="block text-[11px] font-bold tracking-widest uppercase text-neutral-900 mb-0.5"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    >
                      ADDRESS
                    </span>
                    <p
                      className="text-sm sm:text-base text-neutral-700 font-medium"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    >
                      Abbotsford B.C, Canada
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-9 h-9 sm:w-10 sm:h-10"
                    >
                      <path
                        d="M6 12L22 22L38 12V18H42V8C42 5.8 40.2 4 38 4H6C3.8 4 2.02 5.8 2.02 8L2 32C2 34.2 3.8 36 6 36H26V32H6V12ZM38 8L22 18L6 8H38Z"
                        fill="#DE2027"
                      />
                      <path
                        d="M42 28V36C42 38.2 40.2 40 38 40C35.8 40 34 38.2 34 36V27C34 26.44 34.44 26 35 26C35.56 26 36 26.44 36 27V36H40V27C40 25.6739 39.4732 24.4021 38.5355 23.4645C37.5979 22.5268 36.3261 22 35 22C33.6739 22 32.4021 22.5268 31.4645 23.4645C30.5268 24.4021 30 25.6739 30 27V36C30 40.42 33.58 44 38 44C42.42 44 46 40.42 46 36V28H42Z"
                        fill="#DE2027"
                      />
                    </svg>
                  </div>
                  <div>
                    <span
                      className="block text-[11px] font-bold tracking-widest uppercase text-neutral-900 mb-0.5"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    >
                      EMAIL
                    </span>
                    <a
                      href="mailto:support@thewolverines.ca"
                      className="text-sm sm:text-base text-neutral-700 hover:text-[#DE2027] transition-colors font-medium"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    >
                      support@thewolverines.ca
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: "LET'S TALK" Dark Form Card */}
          <div
            className={`lg:col-span-5 pt-4 lg:pt-8 transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-full bg-[#161616] text-white p-5 sm:p-8 lg:p-11 shadow-2xl rounded-[8px]">
              <h2
                className="text-[34px] sm:text-[40px] uppercase text-white tracking-normal leading-none mb-2"
                style={{ fontFamily: 'var(--font-bebas-neue), "Bebas Neue", var(--font-open-sans), "Open Sans", sans-serif' }}
              >
                LET&apos;S TALK
              </h2>
              <p
                className="text-sm text-neutral-400 mb-8 font-normal"
                style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
              >
                Feel free to drop us a line below
              </p>

              {submitted ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#D21E26]/20 border border-[#D21E26] flex items-center justify-center text-[#D21E26] mb-4">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-bold text-white uppercase mb-2"
                    style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                  >
                    Thank You!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-sm mb-6 leading-relaxed">
                    Your message has been received. Our team will get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 border border-white/40 hover:border-white text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      id="contact-name"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-white text-white placeholder-neutral-400 py-3 text-sm focus:outline-none transition-colors"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-white text-white placeholder-neutral-400 py-3 text-sm focus:outline-none transition-colors"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    />
                  </div>

                  {/* Phone with Country Dropdown */}
                  <div className="relative" ref={countryDropdownRef}>
                    <div className="flex items-center gap-2.5 border-b border-neutral-700 focus-within:border-white transition-colors py-2.5">
                      {/* Country Flag + Dial code button */}
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 hover:opacity-85 transition-opacity cursor-pointer flex-shrink-0 select-none"
                      >
                        <img
                          src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                          alt={selectedCountry.name}
                          className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm border border-neutral-700 flex-shrink-0"
                          loading="lazy"
                        />
                        <span className="text-neutral-400 text-[9px] select-none">
                          {isCountryDropdownOpen ? "▲" : "▼"}
                        </span>
                        <span className="text-sm text-neutral-300 font-medium select-none flex-shrink-0">
                          {selectedCountry.dial}
                        </span>
                      </button>

                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name="contactNumber"
                        id="contact-phone"
                        value={formData.contactNumber}
                        onChange={handlePhoneChange}
                        onKeyDown={handlePhoneKeyDown}
                        onPaste={handlePhonePaste}
                        maxLength={currentPhoneRule.maxLength}
                        placeholder={currentPhoneRule.placeholder}
                        className="flex-1 bg-transparent border-none text-white placeholder-neutral-400 py-1 text-sm focus:outline-none font-mono"
                        style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                      />
                    </div>

                    {/* Country Selection Dropdown */}
                    {isCountryDropdownOpen && (
                      <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-48px)] bg-[#202020] border border-neutral-700 rounded-[8px] shadow-2xl z-50 overflow-hidden text-white">
                        {/* Search Input Bar */}
                        <div className="p-2.5 border-b border-neutral-700/80 bg-[#191919]">
                          <input
                            ref={countrySearchInputRef}
                            type="text"
                            placeholder="Search country or code..."
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs sm:text-sm text-white placeholder-neutral-500 bg-[#262626] border border-neutral-700 rounded focus:outline-none focus:border-white transition-colors"
                            style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                          />
                        </div>

                        {/* Scrollable list of countries */}
                        <div className="max-h-56 overflow-y-auto divide-y divide-neutral-800/60">
                          {(() => {
                            const q = countrySearchQuery.toLowerCase().trim();
                            const filtered = COUNTRIES.filter((c) => {
                              if (!q) return true;
                              return (
                                c.name.toLowerCase().includes(q) ||
                                c.dial.toLowerCase().includes(q) ||
                                c.code.toLowerCase().includes(q)
                              );
                            });

                            if (filtered.length === 0) {
                              return (
                                <div className="px-4 py-4 text-xs text-neutral-400 text-center">
                                  No countries found
                                </div>
                              );
                            }

                            return filtered.map((country) => (
                              <button
                                key={`${country.code}-${country.dial}`}
                                type="button"
                                onClick={() => handleSelectCountry(country)}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs sm:text-sm hover:bg-[#2c2c2c] transition cursor-pointer ${
                                  selectedCountry.code === country.code
                                    ? "bg-[#282828] font-semibold text-white"
                                    : "text-neutral-300"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                  <img
                                    src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                    alt={country.name}
                                    className="w-5 h-3.5 object-cover rounded-[2px] shadow-xs shrink-0 border border-neutral-700"
                                    loading="lazy"
                                  />
                                  <span className="truncate text-xs sm:text-sm">
                                    {country.name}
                                  </span>
                                </div>
                                <span className="text-xs text-neutral-400 font-mono flex-shrink-0">
                                  {country.dial}
                                </span>
                              </button>
                            ));
                          })()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      id="contact-message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      rows={3}
                      className="w-full bg-transparent border-0 border-b border-neutral-700 focus:border-white text-white placeholder-neutral-400 py-3 text-sm focus:outline-none transition-colors resize-none"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    />
                  </div>

                  {/* Submit Button (Right Aligned) */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      id="contact-submit"
                      disabled={isSubmitting}
                      className="px-8 py-2.5 border border-neutral-400 hover:border-white text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-200 cursor-pointer rounded-[6px] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Clean White Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
