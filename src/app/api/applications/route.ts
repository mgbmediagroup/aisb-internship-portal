import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const internshipId = formData.get("internshipId") as string;
    const studentName = formData.get("studentName") as string;
    const studentEmail = formData.get("studentEmail") as string;
    const coverLetter = (formData.get("coverLetter") as string) || "";
    const cvFile = formData.get("cv") as File | null;

    if (!internshipId || !studentName || !studentEmail) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let cvPath: string | null = null;

    if (cvFile && cvFile.size > 0) {
      const uploadsDir = path.join(process.cwd(), "uploads");
      await mkdir(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}-${cvFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadsDir, fileName);
      const bytes = await cvFile.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));
      cvPath = `/uploads/${fileName}`;
    }

    const application = await prisma.application.create({
      data: {
        studentName,
        studentEmail,
        coverLetter,
        cvPath,
        internshipId,
      },
    });

    return Response.json(application, { status: 201 });
  } catch (error) {
    console.error("Application submission error:", error);
    return Response.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: { internship: { include: { company: true } } },
      orderBy: { createdAt: "desc" },
    });
    return Response.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return Response.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
