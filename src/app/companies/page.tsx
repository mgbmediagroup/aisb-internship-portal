import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export const dynamic = "force-dynamic";

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({
    include: { _count: { select: { internships: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-light mb-3 block">
            Our Partners
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight mb-4">
            Partner
            <br />
            Companies
          </h1>
          <p className="text-neutral-mid text-lg max-w-xl">
            Meet the {companies.length} organizations offering internship
            opportunities to AISB students.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.map((company, i) => (
            <AnimatedSection key={company.id} delay={i * 0.05}>
              <Link href={`/companies/${company.id}`} className="group block h-full">
                <div className="bg-bg-light rounded-3xl p-8 h-full transition-all duration-300 hover:bg-accent-lavender-light/40 hover:-translate-y-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full object-cover shrink-0 shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary-dark font-bold text-xl font-[var(--font-heading)] shrink-0 shadow-sm">
                        {company.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h2 className="text-lg font-bold text-primary-dark font-[var(--font-heading)] italic group-hover:text-accent-pink transition-colors">
                        {company.name}
                      </h2>
                      <p className="text-xs text-neutral-light uppercase tracking-wider font-medium">
                        {company.industry}
                      </p>
                    </div>
                  </div>

                  {company.description && (
                    <p className="text-sm text-neutral-mid leading-relaxed mb-5 line-clamp-3 flex-1">
                      {company.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white">
                    <span className="text-sm text-neutral-mid font-medium">
                      {company._count.internships} opening{company._count.internships !== 1 ? "s" : ""}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark group-hover:text-accent-pink group-hover:gap-2.5 transition-all">
                      View
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
