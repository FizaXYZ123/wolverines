import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";
import SponsorsSection from "@/components/home/SponsorsSection";
import DonationSection from "@/components/home/DonationSection";
import TeamsSection from "@/components/home/TeamsSection";
import HockeyInsightsSection from "@/components/home/HockeyInsightsSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] bg-white text-neutral-900">
      {/* Home Hero Section */}
      <HeroSection />

      {/* Home About Us Section with Staggered Typography & Action Player */}
      <AboutSection />

      {/* Home Upcoming Events Section */}
      <UpcomingEventsSection />

      {/* Home Sponsors Section */}
      <SponsorsSection />

      {/* Home Donation Section */}
      <DonationSection />

      {/* Home Hockey Field Team Section */}
      <TeamsSection />

      {/* Home Latest Hockey Insights Section */}
      <HockeyInsightsSection />
    </div>
  );
}
