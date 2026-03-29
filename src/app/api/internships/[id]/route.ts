import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const internship = await prisma.internship.update({
      where: { id },
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
    return Response.json(internship);
  } catch (error) {
    console.error("Error updating internship:", error);
    return Response.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.application.deleteMany({ where: { internshipId: id } });
    await prisma.internship.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting internship:", error);
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}
