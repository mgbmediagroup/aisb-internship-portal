import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, FileText, Rocket, ArrowDown } from "lucide-react";
import { prisma } from "@/lib/prisma";
import InternshipCard from "@/components/InternshipCard";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import Testimonials from "@/components/Testimonials";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredInternships = await prisma.internship.findMany({
    take: 6,
    include: { company: true },
    orderBy: { createdAt: "desc" },
  });

  const companies = await prisma.company.findMany({
    include: { _count: { select: { internships: true } } },
  });

  const totalInternships = await prisma.internship.count();
  const totalCompanies = await prisma.company.count();

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100vh] flex items-end overflow-hidden bg-accent-magenta">
        {/* Background hero image */}
        <Image
          src="/images/hero.jpg"
          alt="AISB students collaborating in a workshop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />

        {/* Large heading - left aligned, AISB editorial style */}
        <div className="relative z-10 w-full">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-8">
            {/* Hero text */}
            <div className="mb-12">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-[var(--font-heading)] italic leading-[0.95] tracking-tight max-w-3xl" style={{ color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                Find your
                <br />
                internship.
              </h1>
            </div>

            {/* Bottom bar: subtitle + CTA buttons */}
            <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-8">
              <p className="text-white/80 text-lg sm:text-xl max-w-md leading-relaxed font-light" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
                Connecting AISB students with real-world
                professional experiences across Budapest and beyond.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/internships"
                  className="inline-flex items-center justify-between gap-8 bg-accent-deep-purple/90 backdrop-blur-sm text-white font-medium text-lg px-8 py-4 rounded-full border border-white/10 hover:bg-accent-deep-purple transition-colors min-w-[240px]"
                >
                  Browse Internships
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/companies"
                  className="inline-flex items-center justify-between gap-8 bg-accent-deep-purple/90 backdrop-blur-sm text-white font-medium text-lg px-8 py-4 rounded-full border border-white/10 hover:bg-accent-deep-purple transition-colors min-w-[240px]"
                >
                  View Companies
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center pb-8">
            <ArrowDown className="w-6 h-6 text-white/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-light mb-3 block">
                How It Works
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight">
                Three simple
                <br />
                steps.
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                icon: Search,
                title: "Search",
                desc: "Browse opportunities by field, location, and duration to find your perfect match.",
                color: "bg-accent-lavender-light/50",
              },
              {
                icon: FileText,
                title: "Apply",
                desc: "Submit your application with CV and cover letter directly through the portal.",
                color: "bg-accent-soft-pink/20",
              },
              {
                icon: Rocket,
                title: "Start",
                desc: "Get connected with the company and begin your real-world professional experience.",
                color: "bg-accent-yellow/20",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className={`${item.color} rounded-3xl p-10 h-full mx-1`}>
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 text-primary-dark" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic mb-3">
                    {item.title}
                  </h3>
                  <div className="w-8 h-[3px] bg-primary-dark/15 rounded-full mb-4" />
                  <p className="text-neutral-mid text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED INTERNSHIPS ===== */}
      <section className="py-24 md:py-32 bg-bg-light">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-light mb-3 block">
                  Opportunities
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight">
                  Featured
                  <br />
                  Internships
                </h2>
              </div>
              <Link
                href="/internships"
                className="btn-black self-start sm:self-auto"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredInternships.map((internship, i) => (
              <AnimatedSection key={internship.id} delay={i * 0.08}>
                <InternshipCard
                  id={internship.id}
                  title={internship.title}
                  company={internship.company}
                  location={internship.location}
                  duration={internship.duration}
                  field={internship.field}
                  isPaid={internship.isPaid}
                  deadline={internship.deadline}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-20 bg-accent-magenta">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
            <Counter end={totalInternships} suffix="+" label="Internships Available" />
            <Counter end={totalCompanies} suffix="+" label="Partner Companies" />
            <Counter end={200} suffix="+" label="Students Placed" />
          </div>
        </div>
      </section>

      {/* ===== STUDENT TESTIMONIALS ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-light mb-3 block">
                Student Voices
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight">
                What our students
                <br />
                are saying.
              </h2>
            </div>
          </AnimatedSection>

          <Testimonials />
        </div>
      </section>

      {/* ===== AISB COMMUNITY CTA ===== */}
      <section className="py-24 md:py-32 bg-accent-lavender-light/30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-light mb-3 block">
                AISB Community
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight mb-6">
                Ready to start
                <br />
                your journey?
              </h2>
              <p className="text-neutral-mid text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Explore internship opportunities from our partner companies and take
                the first step toward your professional career.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/internships" className="btn-black text-lg">
                  Explore Internships
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/companies" className="btn-outline text-lg">
                  Meet Our Partners
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
