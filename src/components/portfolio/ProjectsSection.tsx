"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

interface ProjectsSectionProps {
  data?: Project[];
}

const defaultProjects: Project[] = [];

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const projects = data && data.length > 0 ? data : defaultProjects;
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const allTechs = Array.from(new Set(projects.flatMap((p) => p.techStack)));
  const filters = ["All", ...allTechs.slice(0, 6)];

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.techStack.includes(filter));

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".project-card-wrapper");
    if (!cards) return;

    gsap.set(cards, { opacity: 0, y: 30 });
    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        });
      },
      start: "top 90%",
    });
  }, [filter, projects]);

  if (projects.length === 0) {
    return (
      <section id="projects" className="section-padding relative">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Projects"
            subtitle="Featured work and side projects"
          />
          <div className="glass-card p-12 text-center">
            <p className="text-[var(--color-text-muted)]">
              Projects will appear here once added via the admin dashboard.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Projects"
          subtitle="Featured work and side projects"
        />

        {allTechs.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  filter === f
                    ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30"
                    : "glass-btn text-[var(--color-text-secondary)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered
            .sort((a, b) => a.order - b.order)
            .map((project) => (
              <div key={project.id} className="project-card-wrapper">
                <ProjectCard project={project} onSelect={setSelected} />
              </div>
            ))}
        </div>
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        size="lg"
      >
        {selected && (
          <div className="space-y-6">
            {selected.thumbnailUrl && (
              <img
                src={selected.thumbnailUrl}
                alt={selected.title}
                className="w-full rounded-lg object-cover"
              />
            )}

            {selected.fullDesc && (
              <p className="text-[var(--color-text-secondary)]">
                {selected.fullDesc}
              </p>
            )}

            {selected.role && (
              <div>
                <h4 className="mb-1 font-semibold text-[var(--color-text-primary)]">Role</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{selected.role}</p>
              </div>
            )}

            {selected.challenges && (
              <div>
                <h4 className="mb-1 font-semibold text-[var(--color-text-primary)]">Challenges & Solutions</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{selected.challenges}</p>
              </div>
            )}

            <div>
              <h4 className="mb-2 font-semibold text-[var(--color-text-primary)]">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selected.techStack.map((tech) => (
                  <Badge key={tech} variant="primary">{tech}</Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {selected.liveUrl && (
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn glass-btn-primary flex items-center gap-2 px-5 py-2"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {selected.repoUrl && (
                <a
                  href={selected.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn flex items-center gap-2 px-5 py-2"
                >
                  <Github size={16} /> View Code
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
