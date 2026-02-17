import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { jsonResponse, errorResponse, requireAuth } from "@/lib/api-utils";

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return errorResponse("Unauthorized", 401);

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return errorResponse("No file provided", 400);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const url = `/uploads/${uniqueName}`;

    return jsonResponse({ url, filename: file.name, size: file.size, mimeType: file.type });
  } catch {
    return errorResponse("Failed to upload file");
  }
}
