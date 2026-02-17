import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

interface DashboardStats {
  projects: number;
  skills: number;
  messages: number;
  experience: number;
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  const [projectsRes, skillsRes, messagesRes, experienceRes] = await Promise.allSettled([
    fetch("/api/projects"),
    fetch("/api/skills"),
    fetch("/api/contact"),
    fetch("/api/experience"),
  ]);

  return {
    projects:
      projectsRes.status === "fulfilled" && projectsRes.value.ok
        ? (await projectsRes.value.json()).length
        : 0,
    skills:
      skillsRes.status === "fulfilled" && skillsRes.value.ok
        ? (await skillsRes.value.json()).length
        : 0,
    messages:
      messagesRes.status === "fulfilled" && messagesRes.value.ok
        ? (await messagesRes.value.json()).length
        : 0,
    experience:
      experienceRes.status === "fulfilled" && experienceRes.value.ok
        ? (await experienceRes.value.json()).length
        : 0,
  };
}

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboardStats.all,
    queryFn: fetchDashboardStats,
  });
}
