import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const heroSchema = z.object({
  headline: z.string().min(1),
  subtitle: z.string().min(1),
  tagline: z.string().min(1),
  ctaPrimaryText: z.string().min(1),
  ctaSecondaryText: z.string().min(1),
  resumeUrl: z.string().optional(),
  backgroundUrl: z.string().optional(),
});

export const aboutSchema = z.object({
  summary: z.string().min(10),
  photoUrl: z.string().optional(),
  yearsExp: z.number().int().min(0),
  totalProjects: z.number().int().min(0),
  totalCompanies: z.number().int().min(0),
});

export const skillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().optional(),
  category: z.string().min(1),
  order: z.number().int().default(0),
});

export const experienceSchema = z.object({
  company: z.string().min(1),
  companyLogo: z.string().optional(),
  title: z.string().min(1),
  location: z.string().min(1),
  workType: z.string().min(1),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.array(z.string()),
  order: z.number().int().default(0),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  shortDesc: z.string().min(1),
  fullDesc: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  screenshots: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  company: z.string().optional(),
  role: z.string().optional(),
  challenges: z.string().optional(),
  liveUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  field: z.string().min(1),
  graduationDate: z.string().optional(),
  logoUrl: z.string().optional(),
  order: z.number().int().default(0),
});

export const certificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.string().optional(),
  credUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  order: z.number().int().default(0),
});

export const settingsSchema = z.object({
  siteTitle: z.string().min(1),
  metaDescription: z.string(),
  primaryHue: z.number().int().min(0).max(360),
  primarySat: z.number().int().min(0).max(100),
  primaryLight: z.number().int().min(0).max(100),
  secondaryHue: z.number().int().min(0).max(360),
  secondarySat: z.number().int().min(0).max(100),
  secondaryLight: z.number().int().min(0).max(100),
  accentHue: z.number().int().min(0).max(360),
  accentSat: z.number().int().min(0).max(100),
  accentLight: z.number().int().min(0).max(100),
  defaultTheme: z.string(),
  githubUrl: z.string(),
  linkedinUrl: z.string(),
  twitterUrl: z.string(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type HeroFormData = z.infer<typeof heroSchema>;
export type AboutFormData = z.infer<typeof aboutSchema>;
export type SkillFormData = z.infer<typeof skillSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type CertificationFormData = z.infer<typeof certificationSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;
