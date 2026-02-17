"use client";

import Link from "next/link";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { useProjects, useDeleteProject } from "@/hooks/api";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ExternalLink, Star } from "lucide-react";

export default function ProjectsDashboard() {
  const { data: projects = [], isLoading } = useProjects();
  const deleteMutation = useDeleteProject();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Project deleted!");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">Projects</h1>
        <Link href="/dashboard/projects/new">
          <Button variant="primary">
            <Plus size={16} /> Add Project
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {projects.sort((a, b) => a.order - b.order).map((project) => (
          <GlassCard key={project.id} className="p-5">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-lg font-semibold text-(--color-text-primary)">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Star size={14} className="text-accent fill-accent" />
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-text-muted">
                  {project.shortDesc}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="primary">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-text-muted hover:bg-surface hover:text-primary"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="rounded-lg p-2 text-text-muted hover:bg-surface hover:text-primary"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="rounded-lg p-2 text-text-muted hover:bg-red-400/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}

        {projects.length === 0 && (
          <GlassCard className="p-12 text-center">
            <p className="text-text-muted">No projects yet. Add your first project!</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
