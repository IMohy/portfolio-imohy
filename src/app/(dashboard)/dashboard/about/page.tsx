"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useAbout, useUpdateAbout } from "@/hooks/api";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function AboutDashboard() {
  const { data: about, isLoading } = useAbout();
  const updateMutation = useUpdateAbout();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (about) reset(about);
  }, [about, reset]);

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const payload = {
        ...data,
        yearsExp: Number(data.yearsExp),
        totalProjects: Number(data.totalProjects),
        totalCompanies: Number(data.totalCompanies),
      };
      await updateMutation.mutateAsync(payload);
      toast.success("About section updated!");
    } catch {
      toast.error("Failed to update about section");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">
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
          <Button type="submit" variant="primary" disabled={updateMutation.isPending}>
            <Save size={16} /> {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
