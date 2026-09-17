import React from "react";
import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import AboutExpertise from "@/components/about/AboutExpertise";
import AboutCoaches from "@/components/about/AboutCoaches";
import WhyChooseUs from "@/components/about/WhyChooseUs";

export const metadata: Metadata = {
  title: "About Us | The Wolverines Field Hockey Club",
  description:
    "Empowering future champions with expert coaching and a passion for the game at The Wolverines Field Hockey Club.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] bg-white text-neutral-900">
      {/* About Hero Section */}
      <AboutHero />

      {/* About Mission & Vision Section */}
      <AboutMissionVision />

      {/* About Expertise Section */}
      <AboutExpertise />

      {/* Trainers & Coaches Section */}
      <AboutCoaches />

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
}




