import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function GET() {
  try {
    const [education, certifications] = await Promise.all([
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.certification.findMany({ orderBy: { order: "asc" } }),
    ]);
    return jsonResponse({ education, certifications });
  } catch {
    return errorResponse("Failed to fetch education data");
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const { type, ...data } = body;

    if (data.graduationDate) data.graduationDate = new Date(data.graduationDate);
    if (data.issueDate) data.issueDate = new Date(data.issueDate);

    if (type === "certification") {
      const cert = await prisma.certification.create({ data });
      return jsonResponse(cert, 201);
    }

    const edu = await prisma.education.create({ data });
    return jsonResponse(edu, 201);
  } catch {
    return errorResponse("Failed to create education entry");
  }
}

export async function PUT(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const { id, type, ...data } = body;

    if (data.graduationDate) data.graduationDate = new Date(data.graduationDate);
    if (data.issueDate) data.issueDate = new Date(data.issueDate);

    if (type === "certification") {
      const cert = await prisma.certification.update({ where: { id }, data });
      return jsonResponse(cert);
    }

    const edu = await prisma.education.update({ where: { id }, data });
    return jsonResponse(edu);
  } catch {
    return errorResponse("Failed to update education entry");
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");
    if (!id) return errorResponse("Missing id", 400);

    if (type === "certification") {
      await prisma.certification.delete({ where: { id } });
    } else {
      await prisma.education.delete({ where: { id } });
    }

    return jsonResponse({ success: true });
  } catch {
    return errorResponse("Failed to delete education entry");
  }
}
