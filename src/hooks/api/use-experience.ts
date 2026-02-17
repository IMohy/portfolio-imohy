import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { Experience } from "@/types";

async function fetchExperience(): Promise<Experience[]> {
  const res = await fetch("/api/experience");
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
}

export function useExperience() {
  return useQuery({
    queryKey: queryKeys.experience.all,
    queryFn: fetchExperience,
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create experience");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experience.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats.all });
    },
  });
}

export function useUpdateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch("/api/experience", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update experience");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experience.all });
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/experience?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete experience");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experience.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats.all });
    },
  });
}
