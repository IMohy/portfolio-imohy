import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { ContactMessage } from "@/types";

async function fetchMessages(): Promise<ContactMessage[]> {
  const res = await fetch("/api/contact");
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export function useContactMessages() {
  return useQuery({
    queryKey: queryKeys.contact.all,
    queryFn: fetchMessages,
  });
}

export function useToggleMessageRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isRead }: { id: string; isRead: boolean }) => {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead }),
      });
      if (!res.ok) throw new Error("Failed to update message");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contact.all });
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete message");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contact.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats.all });
    },
  });
}
