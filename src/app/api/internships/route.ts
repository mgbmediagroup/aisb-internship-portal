import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const internships = await prisma.internship.findMany({
    include: { company: true, _count: { select: { applications: true } } },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(internships);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const internship = await prisma.internship.create({
      data: {
        title: body.title,
        description: body.description,
        requirements: body.requirements || null,
        location: body.location,
        duration: body.duration,
        isPaid: body.isPaid || false,
        field: body.field,
        deadline: body.deadline ? new Date(body.deadline) : null,
        companyId: body.companyId,
      },
    });
    return Response.json(internship, { status: 201 });
  } catch (error) {
    console.error("Error creating internship:", error);
    return Response.json({ error: "Failed to create internship" }, { status: 500 });
  }
}
