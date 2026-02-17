"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { skillSchema, type SkillFormData } from "@/lib/validations";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Skill } from "@/types";

export default function SkillsDashboard() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
  });

  const fetchSkills = useCallback(async () => {
    try {
      const res = await fetch("/api/skills");
      if (res.ok) setSkills(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", category: "", icon: "", order: skills.length });
    setModalOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditing(skill);
    reset({ name: skill.name, category: skill.category, icon: skill.icon || "", order: skill.order });
    setModalOpen(true);
  };

  const onSubmit = async (data: SkillFormData) => {
    try {
      const payload = { ...data, order: Number(data.order) };
      if (editing) {
        const res = await fetch("/api/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing.id, ...payload }),
        });
        if (!res.ok) throw new Error();
        toast.success("Skill updated!");
      } else {
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        toast.success("Skill created!");
      }
      setModalOpen(false);
      fetchSkills();
    } catch {
      toast.error("Failed to save skill");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      const res = await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Skill deleted!");
      fetchSkills();
    } catch {
      toast.error("Failed to delete skill");
    }
  };

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">Skills</h1>
        <Button variant="primary" onClick={openCreate}>
          <Plus size={16} /> Add Skill
        </Button>
      </div>

      {categories.map((cat) => (
        <GlassCard key={cat} className="p-6">
          <h2 className="mb-4 font-heading text-lg font-semibold" style={{ color: "var(--color-primary)" }}>
            {cat}
          </h2>
          <div className="space-y-2">
            {skills
              .filter((s) => s.category === cat)
              .sort((a, b) => a.order - b.order)
              .map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-xl border border-surface-border bg-(--glass-bg) px-4 py-3"
                >
                  <span className="text-sm font-medium text-(--color-text-primary)">{skill.name}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(skill)}
                      className="rounded-lg p-1.5 text-text-muted hover:bg-surface hover:text-primary"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="rounded-lg p-1.5 text-text-muted hover:bg-red-400/10 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </GlassCard>
      ))}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Skill" : "Add Skill"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Skill Name" error={errors.name?.message} {...register("name")} />
          <Input label="Category" placeholder="e.g. Languages, Frameworks, Styling..." error={errors.category?.message} {...register("category")} />
          <Input label="Icon (optional)" {...register("icon")} />
          <Input label="Order" type="number" error={errors.order?.message} {...register("order", { valueAsNumber: true })} />
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
