"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FolderKanban, Wrench, MessageSquare, Briefcase } from "lucide-react";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    experience: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, skillsRes, messagesRes, experienceRes] = await Promise.allSettled([
          fetch("/api/projects"),
          fetch("/api/skills"),
          fetch("/api/contact"),
          fetch("/api/experience"),
        ]);

        setStats({
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
        });
      } catch {
        /* silently fail */
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-[var(--color-text-primary)]">
          Dashboard
        </h1>
        <p className="mt-1 text-[var(--color-text-muted)]">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Projects" value={stats.projects} icon={FolderKanban} />
        <StatsCard title="Skills" value={stats.skills} icon={Wrench} />
        <StatsCard title="Messages" value={stats.messages} icon={MessageSquare} />
        <StatsCard title="Experiences" value={stats.experience} icon={Briefcase} />
      </div>
    </div>
  );
}
