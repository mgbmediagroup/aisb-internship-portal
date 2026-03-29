import { prisma } from "@/lib/prisma";
import InternshipCard from "@/components/InternshipCard";
import InternshipFilters from "./InternshipFilters";

export const dynamic = "force-dynamic";

export default async function InternshipsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const field = params.field || "";
  const location = params.location || "";
  const duration = params.duration || "";
  const sort = params.sort || "newest";

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { company: { name: { contains: search } } },
    ];
  }
  if (field) where.field = { contains: field };
  if (location) where.location = { contains: location };
  if (duration) where.duration = { contains: duration };

  const orderBy: Record<string, string> =
    sort === "deadline"
      ? { deadline: "asc" }
      : sort === "company"
        ? { companyId: "asc" }
        : { createdAt: "desc" };

  const internships = await prisma.internship.findMany({
    where,
    include: { company: true },
    orderBy,
  });

  const allInternships = await prisma.internship.findMany({
    select: { field: true, location: true, duration: true },
  });

  const fields = [...new Set(allInternships.map((i) => i.field))].sort();
  const locations = [...new Set(allInternships.map((i) => i.location))].sort();
  const durations = [...new Set(allInternships.map((i) => i.duration))].sort();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-light mb-3 block">
            Explore
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight mb-4">
            Browse
            <br />
            Internships
          </h1>
          <p className="text-neutral-mid text-lg max-w-xl">
            Discover {internships.length} internship opportunities from our partner
            companies across Budapest and beyond.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        <InternshipFilters
          fields={fields}
          locations={locations}
          durations={durations}
          currentSearch={search}
          currentField={field}
          currentLocation={location}
          currentDuration={duration}
          currentSort={sort}
        />

        {internships.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-neutral-mid text-lg font-[var(--font-heading)] italic">
              No internships found matching your criteria.
            </p>
            <p className="text-neutral-light text-sm mt-2">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {internships.map((internship) => (
              <InternshipCard
                key={internship.id}
                id={internship.id}
                title={internship.title}
                company={internship.company}
                location={internship.location}
                duration={internship.duration}
                field={internship.field}
                isPaid={internship.isPaid}
                deadline={internship.deadline}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
