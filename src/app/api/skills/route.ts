import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
    return jsonResponse(skills);
  } catch {
    return errorResponse("Failed to fetch skills");
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const skill = await prisma.skill.create({ data: body });
    return jsonResponse(skill, 201);
  } catch {
    return errorResponse("Failed to create skill");
  }
}

export async function PUT(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const { id, ...data } = body;
    const skill = await prisma.skill.update({ where: { id }, data });
    return jsonResponse(skill);
  } catch {
    return errorResponse("Failed to update skill");
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return errorResponse("Missing id", 400);

    await prisma.skill.delete({ where: { id } });
    return jsonResponse({ success: true });
  } catch {
    return errorResponse("Failed to delete skill");
  }
}
