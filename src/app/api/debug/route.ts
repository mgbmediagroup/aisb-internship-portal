export async function GET() {
  try {
    const hasUrl = !!process.env.TURSO_DATABASE_URL;
    const hasToken = !!process.env.TURSO_AUTH_TOKEN;
    const urlPreview = process.env.TURSO_DATABASE_URL?.substring(0, 30) || "MISSING";

    // Try to import and connect
    let dbStatus = "not tested";
    try {
      const { prisma } = await import("@/lib/prisma");
      const count = await prisma.internship.count();
      dbStatus = `connected, ${count} internships`;
    } catch (e: unknown) {
      const err = e as Error;
      dbStatus = `error: ${err.message}`;
    }

    return Response.json({
      env: { hasUrl, hasToken, urlPreview },
      dbStatus,
      nodeVersion: process.version,
    });
  } catch (e: unknown) {
    const err = e as Error;
    return Response.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}
