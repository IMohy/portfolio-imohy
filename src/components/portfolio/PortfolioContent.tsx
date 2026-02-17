"use client";

import { usePortfolioData } from "@/hooks/usePortfolioData";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { SkillsSection } from "./SkillsSection";
import { ExperienceSection } from "./ExperienceSection";
import { ProjectsSection } from "./ProjectsSection";
import { EducationSection } from "./EducationSection";
import { ContactSection } from "./ContactSection";
import type { Hero, About, Skill, Experience, Project, Education, Certification, SiteSettings } from "@/types";

interface PortfolioContentProps {
  initialData: {
    hero: Hero | null;
    about: About | null;
    skills: Skill[] | null;
    experience: Experience[] | null;
    projects: Project[] | null;
    education: Education[] | null;
    certifications: Certification[] | null;
    settings: SiteSettings | null;
  };
}

export function PortfolioContent({ initialData }: PortfolioContentProps) {
  const { data } = usePortfolioData({
    hero: initialData.hero,
    about: initialData.about,
    skills: initialData.skills ?? [],
    experience: initialData.experience ?? [],
    projects: initialData.projects ?? [],
    education: initialData.education ?? [],
    certifications: initialData.certifications ?? [],
    settings: initialData.settings,
  });

  return (
    <>
      <HeroSection data={data?.hero ?? undefined} settings={data?.settings ?? undefined} />
      <AboutSection data={data?.about ?? undefined} />
      <SkillsSection data={data?.skills ?? undefined} />
      <ExperienceSection data={data?.experience ?? undefined} />
      <ProjectsSection data={data?.projects ?? undefined} />
      <EducationSection
        education={data?.education ?? undefined}
        certifications={data?.certifications ?? undefined}
      />
      <ContactSection settings={data?.settings ?? undefined} />
    </>
  );
}
