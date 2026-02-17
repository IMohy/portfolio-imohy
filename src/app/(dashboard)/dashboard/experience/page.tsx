"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { useExperience, useCreateExperience, useUpdateExperience, useDeleteExperience } from "@/hooks/api";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { z } from "zod/v4";
import type { Experience } from "@/types";

const experienceFormSchema = z.object({
  company: z.string().min(1, "Company is required"),
  title: z.string().min(1, "Job title is required"),
  location: z.string().min(1, "Location is required"),
  workType: z.string().min(1, "Work type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  order: z.number().int(),
});

type ExperienceForm = z.infer<typeof experienceFormSchema>;

export default function ExperienceDashboard() {
  const { data: experiences = [], isLoading } = useExperience();
  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ExperienceForm>({
    resolver: zodResolver(experienceFormSchema),
  });

  const openCreate = () => {
    setEditing(null);
    reset({ company: "", title: "", location: "", workType: "Remote", startDate: "", endDate: "", description: "", order: experiences.length });
    setModalOpen(true);
  };

  const openEdit = (exp: Experience) => {
    setEditing(exp);
    reset({
      company: exp.company,
      title: exp.title,
      location: exp.location,
      workType: exp.workType,
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().split("T")[0] : "",
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "",
      description: exp.description.join("\n"),
      order: exp.order,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: ExperienceForm) => {
    try {
      const payload = {
        ...data,
        description: data.description.split("\n").filter(Boolean),
        endDate: data.endDate || null,
        order: Number(data.order),
      };

      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, ...payload });
        toast.success("Experience updated!");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Experience created!");
      }
      setModalOpen(false);
    } catch {
      toast.error("Failed to save experience");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Experience deleted!");
    } catch {
      toast.error("Failed to delete experience");
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
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">Experience</h1>
        <Button variant="primary" onClick={openCreate}>
          <Plus size={16} /> Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.sort((a, b) => a.order - b.order).map((exp) => (
          <GlassCard key={exp.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading text-lg font-semibold text-(--color-text-primary)">
                  {exp.company}
                </h3>
                <p className="text-sm text-text-secondary">{exp.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {exp.location}
                  </span>
                  <Badge variant="primary">{exp.workType}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(exp)} className="rounded-lg p-2 text-text-muted hover:bg-surface hover:text-primary">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(exp.id)} className="rounded-lg p-2 text-text-muted hover:bg-red-400/10 hover:text-red-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Experience" : "Add Experience"}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Company" error={errors.company?.message} {...register("company")} />
            <Input label="Job Title" error={errors.title?.message} {...register("title")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Location" error={errors.location?.message} {...register("location")} />
            <Input label="Work Type" placeholder="Remote / On-site / Freelance" error={errors.workType?.message} {...register("workType")} />
            <Input label="Order" type="number" error={errors.order?.message} {...register("order", { valueAsNumber: true })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Start Date" type="date" error={errors.startDate?.message} {...register("startDate")} />
            <Input label="End Date (empty = present)" type="date" {...register("endDate")} />
          </div>
          <Textarea
            label="Description (one bullet per line)"
            rows={5}
            error={errors.description?.message}
            {...register("description")}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {editing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
