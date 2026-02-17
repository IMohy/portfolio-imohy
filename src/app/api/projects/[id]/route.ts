import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      const projectBySlug = await prisma.project.findUnique({ where: { slug: id } });
      if (!projectBySlug) return errorResponse("Project not found", 404);
      return jsonResponse(projectBySlug);
    }
    return jsonResponse(project);
  } catch {
    return errorResponse("Failed to fetch project");
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { id } = await params;
    const body = await req.json();
    const project = await prisma.project.update({ where: { id }, data: body });
    return jsonResponse(project);
  } catch {
    return errorResponse("Failed to update project");
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return jsonResponse({ success: true });
  } catch {
    return errorResponse("Failed to delete project");
  }
}
