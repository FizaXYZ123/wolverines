import React from "react";
import type { Metadata } from "next";
import GalleryView from "@/components/gallery/GalleryView";

export const metadata: Metadata = {
  title: "Gallery | The Wolverines Field Hockey Club Abbotsford",
  description:
    "Relive the action, the passion, and the glory through stunning visuals. Browse match highlights, training clinics, tournaments, and community moments.",
};

export default function GalleryPage() {
  return <GalleryView />;
}
