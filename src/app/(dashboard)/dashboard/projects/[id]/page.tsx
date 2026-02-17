"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { Save, ArrowLeft } from "lucide-react";
import { z } from "zod/v4";
import Link from "next/link";

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDesc: z.string().min(1, "Short description is required"),
  fullDesc: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  techStack: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  challenges: z.string().optional(),
  liveUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  featured: z.boolean(),
  order: z.number().int(),
});

type ProjectForm = z.infer<typeof projectFormSchema>;

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectFormSchema),
  });

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        reset({
          title: data.title || "",
          slug: data.slug || "",
          shortDesc: data.shortDesc || "",
          fullDesc: data.fullDesc || "",
          thumbnailUrl: data.thumbnailUrl || "",
          techStack: (data.techStack || []).join(", "),
          company: data.company || "",
          role: data.role || "",
          challenges: data.challenges || "",
          liveUrl: data.liveUrl || "",
          repoUrl: data.repoUrl || "",
          featured: data.featured || false,
          order: data.order || 0,
        });
      })
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data: ProjectForm) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        techStack: data.techStack?.split(",").map((s) => s.trim()).filter(Boolean) || [],
        order: Number(data.order),
      };

      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      toast.success("Project updated!");
      router.push("/dashboard/projects");
    } catch {
      toast.error("Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects" className="rounded-lg p-2 text-text-muted hover:bg-surface">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">Edit Project</h1>
      </div>

      <GlassCard className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Title" error={errors.title?.message} {...register("title")} />
            <Input label="Slug" error={errors.slug?.message} {...register("slug")} />
          </div>
          <Input label="Short Description" error={errors.shortDesc?.message} {...register("shortDesc")} />
          <Textarea label="Full Description" rows={4} {...register("fullDesc")} />
          <Input label="Tech Stack (comma separated)" {...register("techStack")} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Company" {...register("company")} />
            <Input label="Role" {...register("role")} />
          </div>
          <Textarea label="Challenges & Solutions" rows={3} {...register("challenges")} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Live URL" {...register("liveUrl")} />
            <Input label="Repository URL" {...register("repoUrl")} />
          </div>
          <Input label="Thumbnail URL" {...register("thumbnailUrl")} />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input type="checkbox" className="rounded" {...register("featured")} />
              Featured project
            </label>
            <Input label="Order" type="number" className="w-24" {...register("order", { valueAsNumber: true })} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Link href="/dashboard/projects">
              <Button type="button">Cancel</Button>
            </Link>
            <Button variant="primary" type="submit" disabled={saving}>
              <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
