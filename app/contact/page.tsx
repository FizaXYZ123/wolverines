import React from "react";
import type { Metadata } from "next";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | The Wolverines Field Hockey Club",
  description:
    "Get in touch with The Wolverines Field Hockey Club in Abbotsford, BC. Call +1 604-710-1373 or send us a message.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-80px)] bg-white text-neutral-900">
      <ContactSection />
    </main>
  );
}
