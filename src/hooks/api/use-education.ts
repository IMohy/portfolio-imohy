import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { Education, Certification } from "@/types";

interface EducationData {
  education: Education[];
  certifications: Certification[];
}

async function fetchEducation(): Promise<EducationData> {
  const res = await fetch("/api/education");
  if (!res.ok) throw new Error("Failed to fetch education data");
  const data = await res.json();
  return {
    education: data.education || [],
    certifications: data.certifications || [],
  };
}

export function useEducationData() {
  return useQuery({
    queryKey: queryKeys.education.all,
    queryFn: fetchEducation,
  });
}

export function useCreateEducationEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch("/api/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.education.all });
    },
  });
}

export function useUpdateEducationEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch("/api/education", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.education.all });
    },
  });
}

export function useDeleteEducationEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, type }: { id: string; type: "education" | "certification" }) => {
      const res = await fetch(`/api/education?id=${id}&type=${type}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.education.all });
    },
  });
}
