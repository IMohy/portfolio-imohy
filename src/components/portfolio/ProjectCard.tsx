"use client";

import { ExternalLink, Github } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <GlassCard
      className="group cursor-pointer overflow-hidden p-0"
      glow
    >
      <div onClick={() => onSelect?.(project)}>
        {project.thumbnailUrl ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ) : (
          <div
            className="flex h-48 items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsla(var(--color-primary-h), 60%, 50%, 0.2), hsla(var(--color-secondary-h), 50%, 50%, 0.2))`,
            }}
          >
            <span className="font-heading text-2xl font-bold text-[var(--color-text-muted)]">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        <div className="p-5">
          <h3 className="font-heading text-lg font-semibold text-[var(--color-text-primary)]">
            {project.title}
          </h3>
          {project.company && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {project.company}
            </p>
          )}
          <p className="mt-2 line-clamp-2 text-sm text-[var(--color-text-secondary)]">
            {project.shortDesc}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="primary">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge>+{project.techStack.length - 4}</Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-[var(--color-surface-border)] px-5 py-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={14} />
            Code
          </a>
        )}
      </div>
    </GlassCard>
  );
}
