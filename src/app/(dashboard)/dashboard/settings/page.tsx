"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useSettings, useUpdateSettings } from "@/hooks/api";
import { toast } from "sonner";
import { Save, Palette, Globe, Share2 } from "lucide-react";

export default function SettingsDashboard() {
  const { data: settings, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const payload = {
        ...data,
        primaryHue: Number(data.primaryHue),
        primarySat: Number(data.primarySat),
        primaryLight: Number(data.primaryLight),
        secondaryHue: Number(data.secondaryHue),
        secondarySat: Number(data.secondarySat),
        secondaryLight: Number(data.secondaryLight),
        accentHue: Number(data.accentHue),
        accentSat: Number(data.accentSat),
        accentLight: Number(data.accentLight),
      };
      await updateMutation.mutateAsync(payload);
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
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
      <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <GlassCard className="p-6 md:p-8">
          <h2 className="mb-5 flex items-center gap-2 font-heading text-xl font-semibold text-(--color-text-primary)">
            <Globe size={20} style={{ color: "var(--color-primary)" }} /> General
          </h2>
          <div className="space-y-4">
            <Input label="Site Title" {...register("siteTitle")} />
            <Textarea label="Meta Description" {...register("metaDescription")} rows={3} />
            <Input label="Default Theme" {...register("defaultTheme")} placeholder="light or dark" />
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8">
          <h2 className="mb-5 flex items-center gap-2 font-heading text-xl font-semibold text-(--color-text-primary)">
            <Palette size={20} style={{ color: "var(--color-accent)" }} /> Colors
          </h2>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-text-secondary">Primary Color (HSL)</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="Hue (0-360)" type="number" {...register("primaryHue")} />
              <Input label="Saturation (0-100)" type="number" {...register("primarySat")} />
              <Input label="Lightness (0-100)" type="number" {...register("primaryLight")} />
            </div>
            <h3 className="text-sm font-medium text-text-secondary">Secondary Color (HSL)</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="Hue" type="number" {...register("secondaryHue")} />
              <Input label="Saturation" type="number" {...register("secondarySat")} />
              <Input label="Lightness" type="number" {...register("secondaryLight")} />
            </div>
            <h3 className="text-sm font-medium text-text-secondary">Accent Color (HSL)</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="Hue" type="number" {...register("accentHue")} />
              <Input label="Saturation" type="number" {...register("accentSat")} />
              <Input label="Lightness" type="number" {...register("accentLight")} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8">
          <h2 className="mb-5 flex items-center gap-2 font-heading text-xl font-semibold text-(--color-text-primary)">
            <Share2 size={20} style={{ color: "var(--color-secondary)" }} /> Social Links
          </h2>
          <div className="space-y-4">
            <Input label="GitHub URL" {...register("githubUrl")} placeholder="https://github.com/..." />
            <Input label="LinkedIn URL" {...register("linkedinUrl")} placeholder="https://linkedin.com/in/..." />
            <Input label="Twitter/X URL" {...register("twitterUrl")} placeholder="https://twitter.com/..." />
          </div>
        </GlassCard>

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={updateMutation.isPending}>
          <Save size={18} /> {updateMutation.isPending ? "Saving..." : "Save All Settings"}
        </Button>
      </form>
    </div>
  );
}
