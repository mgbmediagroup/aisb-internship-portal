import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] italic text-white leading-tight">
              Ready to find your
              <br />
              internship?
            </h2>
          </div>
          <Link
            href="/internships"
            className="inline-flex items-center gap-3 bg-white text-primary-dark font-medium text-lg px-8 py-4 rounded-full hover:bg-bg-light transition-colors"
          >
            Browse Internships
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Info */}
          <div>
            <div className="mb-5">
              <Image
                src="/logos/aisb-logo.webp"
                alt="AISB"
                width={180}
                height={40}
                className="h-10 w-auto mb-2 brightness-0 invert"
              />
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Internship Portal
              </p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Connecting AISB students with real-world professional experiences
              across Budapest and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/70">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/internships", label: "Browse Internships" },
                { href: "/companies", label: "Partner Companies" },
                { href: "/admin", label: "Admin Portal" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/70">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/30" />
                <span>Nagykovácsi út 12,<br/>Budapest 1121, Hungary</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/50 text-sm">
                <Phone className="w-4 h-4 shrink-0 text-white/30" />
                <span>+36 26 556 000</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/50 text-sm">
                <Mail className="w-4 h-4 shrink-0 text-white/30" />
                <span>internships@aisb.hu</span>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/70">
              About AISB
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              The American International School of Budapest has been providing
              world-class education since 1973, preparing students for success in
              an ever-changing global landscape.
            </p>
            <a
              href="https://www.aisb.hu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent-pink text-sm mt-4 hover:text-accent-rose transition-colors"
            >
              Visit aisb.hu
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-8">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} AISB Internship Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
