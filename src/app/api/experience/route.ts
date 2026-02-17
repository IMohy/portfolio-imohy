import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    return jsonResponse(experiences);
  } catch {
    return errorResponse("Failed to fetch experiences");
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    if (body.startDate) body.startDate = new Date(body.startDate);
    if (body.endDate) body.endDate = new Date(body.endDate);

    const experience = await prisma.experience.create({ data: body });
    return jsonResponse(experience, 201);
  } catch {
    return errorResponse("Failed to create experience");
  }
}

export async function PUT(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const { id, ...data } = body;
    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);

    const experience = await prisma.experience.update({ where: { id }, data });
    return jsonResponse(experience);
  } catch {
    return errorResponse("Failed to update experience");
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return errorResponse("Missing id", 400);

    await prisma.experience.delete({ where: { id } });
    return jsonResponse({ success: true });
  } catch {
    return errorResponse("Failed to delete experience");
  }
}
