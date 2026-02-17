import { prisma } from "@/lib/prisma";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    return project;
  } catch {
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <GlassCard className="p-8 text-center">
          <p className="text-[var(--color-text-muted)]">Project not found.</p>
          <Link
            href="/#projects"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="section-padding pt-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>

        <GlassCard className="p-8 md:p-12">
          <h1 className="font-heading text-[length:var(--font-size-h1)] font-bold text-[var(--color-text-primary)]">
            {project.title}
          </h1>

          {project.company && (
            <p className="mt-2 text-[var(--color-text-muted)]">{project.company}</p>
          )}

          {project.thumbnailUrl && (
            <div className="mt-8 overflow-hidden rounded-xl">
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full object-cover"
              />
            </div>
          )}

          {project.fullDesc && (
            <div className="mt-8">
              <h2 className="mb-3 font-heading text-xl font-semibold text-[var(--color-text-primary)]">
                About this project
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {project.fullDesc}
              </p>
            </div>
          )}

          {project.role && (
            <div className="mt-6">
              <h2 className="mb-2 font-heading text-lg font-semibold text-[var(--color-text-primary)]">
                My Role
              </h2>
              <p className="text-[var(--color-text-secondary)]">{project.role}</p>
            </div>
          )}

          {project.challenges && (
            <div className="mt-6">
              <h2 className="mb-2 font-heading text-lg font-semibold text-[var(--color-text-primary)]">
                Challenges & Solutions
              </h2>
              <p className="text-[var(--color-text-secondary)]">{project.challenges}</p>
            </div>
          )}

          <div className="mt-8">
            <h2 className="mb-3 font-heading text-lg font-semibold text-[var(--color-text-primary)]">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <Badge key={tech} variant="primary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-btn-primary flex items-center gap-2 px-6 py-3"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn flex items-center gap-2 px-6 py-3"
              >
                <Github size={16} /> View Code
              </a>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
