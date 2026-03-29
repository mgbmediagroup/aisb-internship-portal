import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ApplicationForm from "./ApplicationForm";

export const dynamic = "force-dynamic";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ internshipId: string }>;
}) {
  const { internshipId } = await params;

  const internship = await prisma.internship.findUnique({
    where: { id: internshipId },
    include: { company: true },
  });

  if (!internship) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 md:py-16">
          <Link
            href={`/internships/${internshipId}`}
            className="inline-flex items-center gap-1.5 text-neutral-light hover:text-primary-dark text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Internship
          </Link>

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-light mb-3 block">
            {internship.company.name}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight">
            Apply: {internship.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10">
        <ApplicationForm
          internshipId={internshipId}
          internshipTitle={internship.title}
          companyName={internship.company.name}
          contactEmail="internships@aisb.hu"
        />
      </div>
    </div>
  );
}
