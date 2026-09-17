"use client";

import React, { useState } from "react";
import PhoneCountryInput from "@/components/ui/PhoneCountryInput";

export default function DonationForm() {
  // Form fields state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactCountryCode, setContactCountryCode] = useState("+1");
  const [contactNumber, setContactNumber] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [acknowledgement, setAcknowledgement] = useState<"public" | "anonymous">("public");

  // Payment details
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("Canada");

  // Save for faster checkout (Link)
  const [linkCountryCode, setLinkCountryCode] = useState("+1");
  const [linkMobile, setLinkMobile] = useState("");
  const [linkName, setLinkName] = useState("");
  const [linkEmail, setLinkEmail] = useState("");

  // Submission state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert("Please enter your name.");
      return;
    }
    const amountNum = parseFloat(donationAmount);
    if (isNaN(amountNum) || amountNum < 1) {
      alert("Please enter a valid donation amount.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const formatCardNumber = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    return raw.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      return `${raw.slice(0, 2)} / ${raw.slice(2)}`;
    }
    return raw;
  };

  return (
    <section className="w-full bg-white select-none py-10 sm:py-14">
      {/* Self-contained animations for Donation Form */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes donationFormFadeIn {
              0% {
                opacity: 0;
                transform: translateY(24px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-donation-form {
              animation: donationFormFadeIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
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
            BASIC DETAILS
          </h2>
        </div>

        {isSubmitted ? (
          /* Thank You State */
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
              THANK YOU FOR YOUR DONATION!
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
              Your contribution of{" "}
              <strong className="text-neutral-900 font-bold">
                ${parseFloat(donationAmount || "100").toFixed(2)} CAD
              </strong>{" "}
              helps Wolverines Field Hockey Club empower youth athletes across Abbotsford and British Columbia.
            </p>
            <div className="bg-white p-4 rounded-xl border border-neutral-200 text-left text-xs sm:text-sm text-neutral-600 mb-6 space-y-1.5">
              <p>
                <strong>Confirmation ID:</strong> WLV-DON-{Math.floor(100000 + Math.random() * 900000)}
              </p>
              <p>
                <strong>Donor Name:</strong> {acknowledgement === "anonymous" ? "Anonymous Supporter" : fullName}
              </p>
              <p>
                <strong>Receipt Sent To:</strong> {email || linkEmail || "Your provided email"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setDonationAmount("");
                setFullName("");
                setCardNumber("");
                setCvc("");
                setExpiryDate("");
              }}
              className="px-8 py-3 rounded-lg bg-[#DE2027] hover:bg-[#c41920] text-white font-bold text-sm tracking-wide shadow-sm transition"
            >
              Make Another Donation
            </button>
          </div>
        ) : (
          /* The Form matching user screenshot exactly */
          <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl animate-donation-form">
            {/* ROW 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">
                  Name <span className="text-[#DE2027]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Please enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition"
                />
              </div>
            </div>

            {/* ROW 2: Contact Number & Donation Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">
                  Contact Number <span className="text-[#DE2027]">*</span>
                </label>
                <PhoneCountryInput
                  required
                  value={contactNumber}
                  onChange={setContactNumber}
                  defaultCountryCode="CA"
                  placeholder="506-234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">
                  Donation Amount <span className="text-[#DE2027]">*</span>
                </label>
                <div className="relative flex items-center rounded border border-neutral-300 bg-white focus-within:border-neutral-500 transition">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    placeholder="Minimum donation $100"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full pl-4 pr-14 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none"
                  />
                  <span className="absolute right-3.5 text-xs font-semibold text-neutral-500 tracking-wider">
                    CAD
                  </span>
                </div>
              </div>
            </div>

            {/* Permission to Acknowledge Donation Publicly */}
            <div className="pt-2">
              <label className="block text-sm font-semibold text-neutral-800 mb-3">
                Permission to Acknowledge Donation Publicly <span className="text-[#DE2027]">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <input
                    type="radio"
                    name="acknowledgement"
                    checked={acknowledgement === "public"}
                    onChange={() => setAcknowledgement("public")}
                    className="w-4 h-4 text-[#DE2027] border-neutral-300 focus:ring-0 accent-[#DE2027] cursor-pointer"
                  />
                  <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
                    Yes you may acknowledge my donation.
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <input
                    type="radio"
                    name="acknowledgement"
                    checked={acknowledgement === "anonymous"}
                    onChange={() => setAcknowledgement("anonymous")}
                    className="w-4 h-4 text-[#DE2027] border-neutral-300 focus:ring-0 accent-[#DE2027] cursor-pointer"
                  />
                  <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
                    Please keep my donation anonymous.
                  </span>
                </label>
              </div>
            </div>

            {/* Credit / Debit Card Section */}
            <div className="pt-4 space-y-4">
              <h3 className="text-base font-semibold text-neutral-900">
                Credit / Debit Card <span className="text-[#DE2027]">*</span>
              </h3>

              {/* Card Number, Expiry, CVC in 3 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {/* Card Number (6 cols) */}
                <div className="sm:col-span-6">
                  <label className="block text-xs text-neutral-500 mb-1">
                    Card number
                  </label>
                  <div className="relative flex items-center rounded border border-neutral-300 bg-white focus-within:border-neutral-500 transition">
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="1234 1234 1234 1234"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className="w-full pl-3.5 pr-28 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none"
                    />
                    {/* Card Brand Icons */}
                    <div className="absolute right-2.5 flex items-center gap-1.5 select-none pointer-events-none">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1A1F71] text-white tracking-tighter">
                        VISA
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EB001B] text-white tracking-tighter">
                        MC
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#006FCF] text-white tracking-tighter">
                        AMEX
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FF5F00] text-white tracking-tighter">
                        DISC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expiry Date (3 cols) */}
                <div className="sm:col-span-3">
                  <label className="block text-xs text-neutral-500 mb-1">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={7}
                    placeholder="MM / YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition"
                  />
                </div>

                {/* Security Code (3 cols) */}
                <div className="sm:col-span-3">
                  <label className="block text-xs text-neutral-500 mb-1">
                    Security code
                  </label>
                  <div className="relative flex items-center rounded border border-neutral-300 bg-white focus-within:border-neutral-500 transition">
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className="w-full pl-3.5 pr-9 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none"
                    />
                    <svg
                      className="absolute right-2.5 w-4 h-4 text-neutral-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.5" />
                      <path d="M2 10h20" strokeWidth="1.5" />
                      <circle cx="17" cy="15" r="1" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Country / Territory Dropdown */}
              <div>
                <label className="block text-xs text-neutral-500 mb-1">
                  Country/Territory
                </label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 rounded border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:border-neutral-500 transition cursor-pointer"
                  >
                    <option value="Canada">Canada</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="New Zealand">New Zealand</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional "Save my information for faster checkout" (Link box) */}
            <div className="rounded-lg border border-neutral-300 p-4 sm:p-5 bg-white space-y-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
                  Optional
                </span>
                <h4 className="text-sm font-semibold text-neutral-900 mt-2">
                  Save my information for faster checkout
                </h4>
              </div>

              {/* Mobile Number inside Link box */}
              <div>
                <label className="block text-xs text-neutral-500 mb-1">
                  Mobile number
                </label>
                <PhoneCountryInput
                  value={linkMobile}
                  onChange={setLinkMobile}
                  defaultCountryCode="IN"
                  placeholder="081234 56789"
                />
              </div>

              {/* Full Name inside Link box */}
              <div>
                <label className="block text-xs text-neutral-500 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="First and last name"
                  value={linkName}
                  onChange={(e) => setLinkName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition"
                />
              </div>

              {/* Link Terms Notice */}
              <div className="pt-1 flex items-start gap-1.5 text-xs text-neutral-500 leading-relaxed">
                <span className="text-neutral-400 shrink-0 text-sm">ⓘ</span>
                <p>
                  <strong className="font-bold text-neutral-700">link</strong> • By providing phone number and email, you agree to create an account subject to Link&apos;s{" "}
                  <a href="#" className="underline hover:text-neutral-800">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-neutral-800">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Email Field below the optional Link box */}
            <div>
              <label className="block text-xs text-neutral-500 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={linkEmail}
                onChange={(e) => setLinkEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition"
              />
            </div>

            {/* Donate Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="px-10 py-3 rounded bg-[#DE2027] hover:bg-[#c41920] active:bg-[#a8141a] text-white font-bold text-sm tracking-wide shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Donate"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
