"use client";

import { useQuery } from "@tanstack/react-query";
import type { Hero, About, Skill, Experience, Project, Education, Certification, SiteSettings } from "@/types";

interface PortfolioData {
  hero: Hero | null;
  about: About | null;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  settings: SiteSettings | null;
}

async function fetchPortfolioData(): Promise<PortfolioData> {
  const [hero, about, skills, experience, projects, education, settings] = await Promise.all([
    fetch("/api/hero").then((r) => r.ok ? r.json() : null).catch(() => null),
    fetch("/api/about").then((r) => r.ok ? r.json() : null).catch(() => null),
    fetch("/api/skills").then((r) => r.ok ? r.json() : []).catch(() => []),
    fetch("/api/experience").then((r) => r.ok ? r.json() : []).catch(() => []),
    fetch("/api/projects").then((r) => r.ok ? r.json() : []).catch(() => []),
    fetch("/api/education").then((r) => r.ok ? r.json() : { education: [], certifications: [] }).catch(() => ({ education: [], certifications: [] })),
    fetch("/api/settings").then((r) => r.ok ? r.json() : null).catch(() => null),
  ]);

  return {
    hero,
    about,
    skills: skills || [],
    experience: experience || [],
    projects: projects || [],
    education: education?.education || education || [],
    certifications: education?.certifications || [],
    settings,
  };
}

export function usePortfolioData(initialData?: Partial<PortfolioData>) {
  return useQuery<PortfolioData>({
    queryKey: ["portfolio-data"],
    queryFn: fetchPortfolioData,
    initialData: initialData ? {
      hero: initialData.hero ?? null,
      about: initialData.about ?? null,
      skills: initialData.skills ?? [],
      experience: initialData.experience ?? [],
      projects: initialData.projects ?? [],
      education: initialData.education ?? [],
      certifications: initialData.certifications ?? [],
      settings: initialData.settings ?? null,
    } : undefined,
    staleTime: 60 * 1000,
  });
}
