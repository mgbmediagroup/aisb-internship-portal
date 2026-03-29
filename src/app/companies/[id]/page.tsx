import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, MapPin, ArrowRight } from "lucide-react";
import InternshipCard from "@/components/InternshipCard";

export const dynamic = "force-dynamic";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: { id },
    include: { internships: true },
  });

  if (!company) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 md:py-20">
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 text-neutral-light hover:text-primary-dark text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Companies
          </Link>

          <div className="flex items-center gap-5 mb-4">
            {company.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover shrink-0 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-bg-light flex items-center justify-center text-primary-dark font-bold text-3xl font-[var(--font-heading)] shrink-0 shadow-sm">
                {company.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight">
                {company.name}
              </h1>
              <p className="text-xs text-neutral-light uppercase tracking-[0.2em] font-bold mt-1">
                {company.industry}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            {company.description && (
              <div>
                <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic mb-4">
                  About {company.name}
                </h2>
                <div className="w-10 h-[3px] bg-primary-dark/15 rounded-full mb-6" />
                <p className="text-neutral-dark leading-relaxed text-[15px]">
                  {company.description}
                </p>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic mb-6">
                Open Positions ({company.internships.length})
              </h2>
              <div className="w-10 h-[3px] bg-primary-dark/15 rounded-full mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {company.internships.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    id={internship.id}
                    title={internship.title}
                    company={{ name: company.name, logo: company.logo }}
                    location={internship.location}
                    duration={internship.duration}
                    field={internship.field}
                    isPaid={internship.isPaid}
                    deadline={internship.deadline}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-bg-light rounded-3xl p-7">
              <h3 className="font-bold text-primary-dark font-[var(--font-heading)] italic mb-4">
                Company Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm text-neutral-mid">
                  <MapPin className="w-4 h-4 text-neutral-light" />
                  Budapest, Hungary
                </div>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-primary-dark font-medium hover:text-accent-pink transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit website
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
