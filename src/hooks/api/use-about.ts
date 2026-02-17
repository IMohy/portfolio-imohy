import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { About } from "@/types";

async function fetchAbout(): Promise<About> {
  const res = await fetch("/api/about");
  if (!res.ok) throw new Error("Failed to fetch about");
  return res.json();
}

export function useAbout() {
  return useQuery({
    queryKey: queryKeys.about.all,
    queryFn: fetchAbout,
  });
}

export function useUpdateAbout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update about");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.about.all });
    },
  });
}
