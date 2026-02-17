"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Save, ArrowLeft } from "lucide-react";
import { slugify } from "@/lib/utils";
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

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "", slug: "", shortDesc: "", fullDesc: "", thumbnailUrl: "",
      techStack: "", company: "", role: "", challenges: "",
      liveUrl: "", repoUrl: "", featured: false, order: 0,
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title);
    setValue("slug", slugify(title));
  };

  const onSubmit = async (data: ProjectForm) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        techStack: data.techStack?.split(",").map((s) => s.trim()).filter(Boolean) || [],
        screenshots: [],
        order: Number(data.order),
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      toast.success("Project created!");
      router.push("/dashboard/projects");
    } catch {
      toast.error("Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects" className="rounded-lg p-2 text-text-muted hover:bg-surface">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">New Project</h1>
      </div>

      <GlassCard className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Title" error={errors.title?.message} {...register("title", { onChange: handleTitleChange })} />
            <Input label="Slug" error={errors.slug?.message} {...register("slug")} />
          </div>
          <Input label="Short Description" error={errors.shortDesc?.message} {...register("shortDesc")} />
          <Textarea label="Full Description" rows={4} {...register("fullDesc")} />
          <Input label="Tech Stack (comma separated)" placeholder="React, TypeScript, Next.js..." {...register("techStack")} />
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
              <Save size={16} /> {saving ? "Saving..." : "Create Project"}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
