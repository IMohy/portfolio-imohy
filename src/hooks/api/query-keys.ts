export const queryKeys = {
  education: {
    all: ["education"] as const,
  },
  skills: {
    all: ["skills"] as const,
  },
  projects: {
    all: ["projects"] as const,
    detail: (id: string) => ["projects", id] as const,
  },
  experience: {
    all: ["experience"] as const,
  },
  contact: {
    all: ["contact"] as const,
  },
  hero: {
    all: ["hero"] as const,
  },
  about: {
    all: ["about"] as const,
  },
  settings: {
    all: ["settings"] as const,
  },
  dashboardStats: {
    all: ["dashboard-stats"] as const,
  },
} as const;
