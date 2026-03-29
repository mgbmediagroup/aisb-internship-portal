"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/internships", label: "Internships" },
  { href: "/companies", label: "Companies" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-border/50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col items-center gap-0.5 text-primary-dark"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <>
                  <div className="w-7 h-[3px] bg-primary-dark rounded-full" />
                  <div className="w-7 h-[3px] bg-primary-dark rounded-full" />
                  <div className="w-7 h-[3px] bg-primary-dark rounded-full" />
                </>
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                Menu
              </span>
            </button>

            <Link href="/" className="flex items-center">
              <Image
                src="/logos/aisb-logo.webp"
                alt="AISB - American International School of Budapest"
                width={200}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary-dark text-[15px] font-medium hover:text-accent-pink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA + Icons */}
          <div className="flex items-center gap-4">
            <Link href="/internships" className="btn-pink hidden sm:inline-flex">
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/internships"
              className="flex flex-col items-center text-primary-dark hover:text-accent-pink transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
                Search
              </span>
            </Link>

          </div>
        </div>
      </div>

      {/* Menu overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] z-40 transition-all duration-500",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-primary-dark/95 backdrop-blur-xl" />

        <div className="relative z-10 h-full flex flex-col justify-center max-w-[1440px] mx-auto px-10 lg:px-20">
          <div className="space-y-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center gap-6 py-4 transition-all duration-300",
                  mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                )}
                style={{ transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms" }}
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-white/20 text-sm font-mono w-8">
                  0{i + 1}
                </span>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[var(--font-heading)] italic group-hover:text-accent-pink transition-colors">
                  {link.label}
                </span>
                <ArrowRight className="w-6 h-6 text-white/0 group-hover:text-accent-pink group-hover:translate-x-2 transition-all" />
              </Link>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start gap-6">
            <Link
              href="/internships"
              className="inline-flex items-center gap-3 bg-accent-pink hover:bg-accent-pink-dark text-white font-medium text-lg px-8 py-4 rounded-full transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Browse Internships
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/30 text-sm max-w-xs leading-relaxed">
              Connecting AISB students with real-world professional experiences across Budapest.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
