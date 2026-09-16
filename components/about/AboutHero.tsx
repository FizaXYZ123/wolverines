"use client";

import React from "react";

export default function AboutHero() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 text-center">
      <h1
        className="text-5xl sm:text-6xl lg:text-7xl font-normal text-white uppercase tracking-wide"
        style={{ fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif' }}
      >
        About The Wolverines
      </h1>
      <p className="text-neutral-300 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
        Empowering young field hockey athletes across Abbotsford and British Columbia with elite coaching, character development, and passion for the game.
      </p>
    </section>
  );
}
