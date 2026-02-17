"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import { educationSchema, certificationSchema, type EducationFormData, type CertificationFormData } from "@/lib/validations";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, GraduationCap, Award } from "lucide-react";
import type { Education, Certification } from "@/types";

export default function EducationDashboard() {
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"education" | "certification">("education");
  const [editingId, setEditingId] = useState<string | null>(null);

  const eduForm = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
  });

  const certForm = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/education");
      if (res.ok) {
        const data = await res.json();
        setEducation(data.education || []);
        setCertifications(data.certifications || []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCreateEdu = () => {
    setEditingId(null);
    setModalType("education");
    eduForm.reset({ institution: "", degree: "", field: "", graduationDate: "", order: education.length });
    setModalOpen(true);
  };

  const openCreateCert = () => {
    setEditingId(null);
    setModalType("certification");
    certForm.reset({ title: "", issuer: "", issueDate: "", credUrl: "", order: certifications.length });
    setModalOpen(true);
  };

  const openEditEdu = (edu: Education) => {
    setEditingId(edu.id);
    setModalType("education");
    eduForm.reset({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      graduationDate: edu.graduationDate ? new Date(edu.graduationDate).toISOString().split("T")[0] : "",
      order: edu.order,
    });
    setModalOpen(true);
  };

  const openEditCert = (cert: Certification) => {
    setEditingId(cert.id);
    setModalType("certification");
    certForm.reset({
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate ? new Date(cert.issueDate).toISOString().split("T")[0] : "",
      credUrl: cert.credUrl || "",
      order: cert.order,
    });
    setModalOpen(true);
  };

  const onSubmitEdu = async (data: EducationFormData) => {
    try {
      const payload = {
        type: "education",
        ...data,
        order: Number(data.order),
        graduationDate: data.graduationDate || null,
      };

      if (editingId) {
        const res = await fetch("/api/education", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        if (!res.ok) throw new Error();
        toast.success("Updated!");
      } else {
        const res = await fetch("/api/education", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        toast.success("Created!");
      }
      setModalOpen(false);
      fetchData();
    } catch {
      toast.error("Failed to save");
    }
  };

  const onSubmitCert = async (data: CertificationFormData) => {
    try {
      const payload = {
        type: "certification",
        ...data,
        order: Number(data.order),
        issueDate: data.issueDate || null,
      };

      if (editingId) {
        const res = await fetch("/api/education", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        if (!res.ok) throw new Error();
        toast.success("Updated!");
      } else {
        const res = await fetch("/api/education", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        toast.success("Created!");
      }
      setModalOpen(false);
      fetchData();
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleDelete = async (id: string, type: "education" | "certification") => {
    if (!confirm("Delete this entry?")) return;
    try {
      const res = await fetch(`/api/education?id=${id}&type=${type}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Deleted!");
      fetchData();
    } catch {
      toast.error("Failed to delete");
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
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-[var(--color-text-primary)]">Education</h1>
        <div className="flex gap-2">
          <Button variant="primary" onClick={openCreateEdu}>
            <Plus size={16} /> Education
          </Button>
          <Button onClick={openCreateCert}>
            <Plus size={16} /> Certification
          </Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 flex items-center gap-2 font-heading text-xl font-semibold text-[var(--color-text-primary)]">
          <GraduationCap size={20} style={{ color: "var(--color-primary)" }} /> Education
        </h2>
        <div className="space-y-3">
          {education.map((edu) => (
            <GlassCard key={edu.id} className="flex items-center justify-between p-5">
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)]">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{edu.institution}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEditEdu(edu)} className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(edu.id, "education")} className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-red-400/10 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 flex items-center gap-2 font-heading text-xl font-semibold text-[var(--color-text-primary)]">
          <Award size={20} style={{ color: "var(--color-accent)" }} /> Certifications
        </h2>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <GlassCard key={cert.id} className="flex items-center justify-between p-5">
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)]">{cert.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{cert.issuer}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEditCert(cert)} className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(cert.id, "certification")} className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-red-400/10 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${editingId ? "Edit" : "Add"} ${modalType === "education" ? "Education" : "Certification"}`}
      >
        {modalType === "education" ? (
          <form onSubmit={eduForm.handleSubmit(onSubmitEdu)} className="space-y-4">
            <Input label="Institution" error={eduForm.formState.errors.institution?.message} {...eduForm.register("institution")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Degree" error={eduForm.formState.errors.degree?.message} {...eduForm.register("degree")} />
              <Input label="Field" error={eduForm.formState.errors.field?.message} {...eduForm.register("field")} />
            </div>
            <Input label="Graduation Date" type="date" {...eduForm.register("graduationDate")} />
            <Input label="Order" type="number" {...eduForm.register("order", { valueAsNumber: true })} />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={eduForm.formState.isSubmitting}>
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={certForm.handleSubmit(onSubmitCert)} className="space-y-4">
            <Input label="Title" error={certForm.formState.errors.title?.message} {...certForm.register("title")} />
            <Input label="Issuer" error={certForm.formState.errors.issuer?.message} {...certForm.register("issuer")} />
            <Input label="Issue Date" type="date" {...certForm.register("issueDate")} />
            <Input label="Credential URL" {...certForm.register("credUrl")} />
            <Input label="Order" type="number" {...certForm.register("order", { valueAsNumber: true })} />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={certForm.formState.isSubmitting}>
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
