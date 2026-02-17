export interface SiteSettings {
  id: string;
  siteTitle: string;
  metaDescription: string;
  primaryHue: number;
  primarySat: number;
  primaryLight: number;
  secondaryHue: number;
  secondarySat: number;
  secondaryLight: number;
  accentHue: number;
  accentSat: number;
  accentLight: number;
  defaultTheme: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

export interface Hero {
  id: string;
  headline: string;
  subtitle: string;
  tagline: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  resumeUrl: string | null;
  backgroundUrl: string | null;
}

export interface About {
  id: string;
  summary: string;
  photoUrl: string | null;
  yearsExp: number;
  totalProjects: number;
  totalCompanies: number;
}

export interface Skill {
  id: string;
  name: string;
  icon: string | null;
  category: string;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  companyLogo: string | null;
  title: string;
  location: string;
  workType: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string | null;
  thumbnailUrl: string | null;
  screenshots: string[];
  techStack: string[];
  company: string | null;
  role: string | null;
  challenges: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  order: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string | null;
  logoUrl: string | null;
  order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string | null;
  credUrl: string | null;
  logoUrl: string | null;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Media {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  alt: string | null;
  createdAt: string;
}
