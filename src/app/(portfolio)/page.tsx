import { PortfolioContent } from "@/components/portfolio/PortfolioContent";
import { prisma } from "@/lib/prisma";
import type { Hero, About, Skill, Experience, Project, Education, Certification, SiteSettings } from "@/types";

type PortfolioData = {
  hero: Hero | null;
  about: About | null;
  skills: Skill[] | null;
  experience: Experience[] | null;
  projects: Project[] | null;
  education: Education[] | null;
  certifications: Certification[] | null;
  settings: SiteSettings | null;
};

async function getPortfolioData(): Promise<PortfolioData> {
  const empty: PortfolioData = {
    hero: null,
    about: null,
    skills: null,
    experience: null,
    projects: null,
    education: null,
    certifications: null,
    settings: null,
  };

  try {
    const [hero, about, skills, experience, projects, education, certifications, settings] =
      await Promise.all([
        prisma.hero.findFirst().catch(() => null),
        prisma.about.findFirst().catch(() => null),
        prisma.skill.findMany({ orderBy: { order: "asc" } }).catch(() => []),
        prisma.experience.findMany({ orderBy: { order: "asc" } }).catch(() => []),
        prisma.project.findMany({ orderBy: { order: "asc" } }).catch(() => []),
        prisma.education.findMany({ orderBy: { order: "asc" } }).catch(() => []),
        prisma.certification.findMany({ orderBy: { order: "asc" } }).catch(() => []),
        prisma.siteSettings.findUnique({ where: { id: "settings" } }).catch(() => null),
      ]);

    // Serialize to convert Prisma Date objects to ISO strings for the client component
    return JSON.parse(JSON.stringify({ hero, about, skills, experience, projects, education, certifications, settings }));
  } catch {
    return empty;
  }
}

export const revalidate = 60;

export default async function HomePage() {
  const data = await getPortfolioData();

  return <PortfolioContent initialData={data} />;
}
