"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Blogs", href: "/blogs" },
  { label: "Donation", href: "/donation" },
  { label: "Gallery", href: "/gallery" },
  { label: "Registration", href: "/registration" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d0d0d] border-b border-[#222222]/80 select-none shadow-md">
      <div className="site-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group transition-transform duration-200 hover:scale-[1.02]">
              <Image
                src="/images/logo.png"
                alt="The Wolverines Field Hockey Club Abbotsford Logo"
                width={130}
                height={55}
                className="h-14 w-auto object-contain brightness-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.08)]"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative transition-colors duration-200 font-normal tracking-wide text-[16px] leading-[24px] ${
                    isActive
                      ? "text-[#D32F2F] font-medium"
                      : "text-white/90 hover:text-[#D32F2F]"
                  }`}
                  style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Contact Us CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2 rounded-md border-2 border-[#D32F2F] text-[#D32F2F] text-[16px] leading-[24px] font-normal transition-all duration-200 hover:bg-[#D32F2F] hover:text-white active:scale-95 shadow-sm"
              style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
            >
              Contact us
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800/80 focus:outline-none transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-[#0f0f0f] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-[16px] leading-[24px] transition-colors ${
                    isActive
                      ? "text-[#D32F2F] font-semibold bg-neutral-900"
                      : "text-gray-200 hover:text-[#D32F2F] hover:bg-neutral-900/60"
                  }`}
                  style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-md border-2 border-[#D32F2F] text-[#D32F2F] font-medium text-[16px] leading-[24px] hover:bg-[#D32F2F] hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
