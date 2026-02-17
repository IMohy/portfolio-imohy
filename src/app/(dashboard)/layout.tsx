"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BackgroundOrbs } from "@/components/portfolio/BackgroundOrbs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="relative min-h-screen">
        <BackgroundOrbs />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="relative z-10 p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
