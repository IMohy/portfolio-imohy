import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { Hero } from "@/types";

async function fetchHero(): Promise<Hero> {
  const res = await fetch("/api/hero");
  if (!res.ok) throw new Error("Failed to fetch hero");
  return res.json();
}

export function useHero() {
  return useQuery({
    queryKey: queryKeys.hero.all,
    queryFn: fetchHero,
  });
}

export function useUpdateHero() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update hero");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hero.all });
    },
  });
}
