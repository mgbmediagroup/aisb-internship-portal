import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const [internships, companies, applications, totalInternships, totalApplications] =
    await Promise.all([
      prisma.internship.findMany({
        include: {
          company: true,
          _count: { select: { applications: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.company.findMany({ orderBy: { name: "asc" } }),
      prisma.application.findMany({
        include: { internship: { include: { company: true } } },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.internship.count(),
      prisma.application.count(),
    ]);

  const fieldCounts: Record<string, number> = {};
  internships.forEach((i) => {
    fieldCounts[i.field] = (fieldCounts[i.field] || 0) + 1;
  });
  const topFields = Object.entries(fieldCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <AdminDashboard
      internships={JSON.parse(JSON.stringify(internships))}
      companies={JSON.parse(JSON.stringify(companies))}
      applications={JSON.parse(JSON.stringify(applications))}
      stats={{
        totalInternships,
        totalApplications,
        totalCompanies: companies.length,
        topFields,
      }}
    />
  );
}
