import React from "react";
import type { Metadata } from "next";
import DonationHero from "@/components/donation/DonationHero";
import DonationForm from "@/components/donation/DonationForm";

export const metadata: Metadata = {
  title: "Donation | The Wolverines Field Hockey Club",
  description:
    "Support youth field hockey in Abbotsford and British Columbia. Your generous donation provides equipment, turf access, and scholarships for young athletes.",
};

export default function DonationPage() {
  return (
    <main className="w-full min-h-[calc(100vh-80px)] bg-white text-neutral-900 select-none">
      {/* Hero Section with Slanted Cut & DONATION Typography */}
      <DonationHero />

      {/* Interactive Donation Form & Community Impact Section */}
      <DonationForm />
    </main>
  );
}
