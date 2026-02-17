"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function AboutDashboard() {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        if (data) reset(data);
      })
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const payload = {
        ...data,
        yearsExp: Number(data.yearsExp),
        totalProjects: Number(data.totalProjects),
        totalCompanies: Number(data.totalCompanies),
      };
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success("About section updated!");
    } catch {
      toast.error("Failed to update about section");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-heading text-3xl font-bold text-[var(--color-text-primary)]">
        About Section
      </h1>

      <GlassCard className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Textarea id="summary" label="Professional Summary" rows={6} {...register("summary")} />
          <Input id="photoUrl" label="Photo URL" placeholder="https://..." {...register("photoUrl")} />
          <div className="grid gap-5 sm:grid-cols-3">
            <Input id="yearsExp" label="Years Experience" type="number" {...register("yearsExp")} />
            <Input id="totalProjects" label="Total Projects" type="number" {...register("totalProjects")} />
            <Input id="totalCompanies" label="Total Companies" type="number" {...register("totalCompanies")} />
          </div>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            <Save size={16} /> {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
