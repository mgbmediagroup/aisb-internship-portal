import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Briefcase,
  Calendar,
  ArrowLeft,
  ExternalLink,
  Building2,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { formatDate, daysUntil } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const internship = await prisma.internship.findUnique({
    where: { id },
    include: {
      company: {
        include: { _count: { select: { internships: true } } },
      },
    },
  });

  if (!internship) notFound();

  const days = internship.deadline ? daysUntil(internship.deadline) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 md:py-20">
          <Link
            href="/internships"
            className="inline-flex items-center gap-1.5 text-neutral-light hover:text-primary-dark text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Internships
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-light mb-3 block">
                {internship.company.name}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight">
                {internship.title}
              </h1>
            </div>

            <Link
              href={`/apply/${internship.id}`}
              className="btn-pink text-lg shrink-0 self-start lg:self-auto"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: MapPin, text: internship.location },
                { icon: Clock, text: internship.duration },
                { icon: Briefcase, text: internship.field },
                { icon: DollarSign, text: internship.isPaid ? "Paid" : "Unpaid" },
              ].map((tag) => (
                <span
                  key={tag.text}
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-bg-light text-neutral-dark font-medium"
                >
                  <tag.icon className="w-4 h-4 text-neutral-light" />
                  {tag.text}
                </span>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic mb-4">
                Description
              </h2>
              <div className="w-10 h-[3px] bg-primary-dark/15 rounded-full mb-6" />
              <div className="text-neutral-dark leading-relaxed text-[15px] whitespace-pre-line">
                {internship.description}
              </div>
            </div>

            {/* Requirements */}
            {internship.requirements && (
              <div>
                <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic mb-4">
                  Requirements
                </h2>
                <div className="w-10 h-[3px] bg-primary-dark/15 rounded-full mb-6" />
                <div className="text-neutral-dark leading-relaxed text-[15px] whitespace-pre-line">
                  {internship.requirements}
                </div>
              </div>
            )}

            {/* How to Apply */}
            <div className="bg-accent-lavender-light/30 rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic mb-4">
                How to Apply
              </h2>
              <div className="w-10 h-[3px] bg-primary-dark/15 rounded-full mb-6" />
              <p className="text-neutral-dark leading-relaxed text-[15px] mb-8">
                Submit your application through our portal. You&apos;ll need to provide
                your personal information, upload your CV (PDF format), and write a
                brief cover letter explaining your interest in this position.
              </p>
              <Link href={`/apply/${internship.id}`} className="btn-black">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deadline */}
            {internship.deadline && (
              <div className="bg-bg-light rounded-3xl p-7">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-neutral-light" />
                  <h3 className="font-bold text-primary-dark font-[var(--font-heading)] italic">
                    Deadline
                  </h3>
                </div>
                <p className="text-primary-dark font-medium text-lg">
                  {formatDate(internship.deadline)}
                </p>
                {days !== null && days > 0 && (
                  <p className={`text-sm mt-1 ${days <= 7 ? "text-accent-pink font-semibold" : "text-neutral-light"}`}>
                    {days} days remaining
                  </p>
                )}
                {days !== null && days <= 0 && (
                  <p className="text-sm mt-1 text-accent-pink font-semibold">
                    Deadline has passed
                  </p>
                )}
              </div>
            )}

            {/* Company Card */}
            <div className="bg-accent-lavender-light/30 rounded-3xl p-7">
              <div className="flex items-center gap-3 mb-5">
                {internship.company.logo ? (
                  <Image
                    src={internship.company.logo}
                    alt={internship.company.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-dark font-bold text-lg font-[var(--font-heading)] shadow-sm">
                    {internship.company.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-primary-dark font-[var(--font-heading)]">
                    {internship.company.name}
                  </h3>
                  <p className="text-xs text-neutral-light uppercase tracking-wider font-medium">
                    {internship.company.industry}
                  </p>
                </div>
              </div>

              {internship.company.description && (
                <p className="text-sm text-neutral-mid leading-relaxed mb-5 line-clamp-4">
                  {internship.company.description}
                </p>
              )}

              <div className="space-y-3">
                <Link
                  href={`/companies/${internship.company.id}`}
                  className="flex items-center gap-2 text-sm text-primary-dark font-medium hover:text-accent-pink transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  View company ({internship.company._count.internships} openings)
                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                </Link>
                {internship.company.website && (
                  <a
                    href={internship.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary-dark font-medium hover:text-accent-pink transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit website
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </a>
                )}
              </div>
            </div>

            {/* Apply CTA */}
            <div className="bg-primary-dark rounded-3xl p-8 text-center">
              <h3 className="text-white font-bold text-xl font-[var(--font-heading)] italic mb-2">
                Interested?
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Submit your application today
              </p>
              <Link
                href={`/apply/${internship.id}`}
                className="inline-flex items-center gap-2 bg-white text-primary-dark font-medium px-7 py-3 rounded-full hover:bg-bg-light transition-colors"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
