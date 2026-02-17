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

export default function HeroDashboard() {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) => {
        if (data) reset(data);
      })
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Hero section updated!");
    } catch {
      toast.error("Failed to update hero section");
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
        Hero Section
      </h1>

      <GlassCard className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input id="headline" label="Headline" {...register("headline")} />
          <Input id="subtitle" label="Subtitle" {...register("subtitle")} />
          <Textarea id="tagline" label="Tagline" {...register("tagline")} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="ctaPrimaryText" label="Primary CTA Text" {...register("ctaPrimaryText")} />
            <Input id="ctaSecondaryText" label="Secondary CTA Text" {...register("ctaSecondaryText")} />
          </div>
          <Input id="resumeUrl" label="Resume URL" placeholder="https://..." {...register("resumeUrl")} />
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            <Save size={16} /> {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
