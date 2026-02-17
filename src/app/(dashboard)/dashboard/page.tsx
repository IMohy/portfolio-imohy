"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { Spinner } from "@/components/ui/Spinner";
import { useDashboardStats } from "@/hooks/api";
import { FolderKanban, Wrench, MessageSquare, Briefcase } from "lucide-react";

export default function DashboardOverview() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">
          Dashboard
        </h1>
        <p className="mt-1 text-text-muted">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      {isLoading ? (
        <div className="flex min-h-[20vh] items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Projects" value={stats?.projects ?? 0} icon={FolderKanban} />
          <StatsCard title="Skills" value={stats?.skills ?? 0} icon={Wrench} />
          <StatsCard title="Messages" value={stats?.messages ?? 0} icon={MessageSquare} />
          <StatsCard title="Experiences" value={stats?.experience ?? 0} icon={Briefcase} />
        </div>
      )}
    </div>
  );
}
