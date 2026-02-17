"use client";

import { useState } from "react";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { Modal } from "@/components/ui/Modal";
import { useContactMessages, useToggleMessageRead, useDeleteMessage } from "@/hooks/api";
import { toast } from "sonner";
import { Trash2, Mail, MailOpen, Eye } from "lucide-react";
import type { ContactMessage } from "@/types";

export default function ContactDashboard() {
  const { data: messages = [], isLoading } = useContactMessages();
  const toggleReadMutation = useToggleMessageRead();
  const deleteMutation = useDeleteMessage();

  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const markRead = (msg: ContactMessage) => {
    toggleReadMutation.mutate(
      { id: msg.id, isRead: !msg.isRead },
      { onError: () => toast.error("Failed to update message") },
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Message deleted!");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  const viewMessage = (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.isRead) {
      toggleReadMutation.mutate({ id: msg.id, isRead: true });
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

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
        <div>
          <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">Messages</h1>
          {unreadCount > 0 && (
            <p className="mt-1 text-sm text-text-muted">{unreadCount} unread</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <GlassCard
            key={msg.id}
            className={`cursor-pointer p-5 ${!msg.isRead ? "border-primary/30" : ""}`}
            hover
          >
            <div className="flex items-start justify-between" onClick={() => viewMessage(msg)}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {!msg.isRead ? (
                    <Mail size={16} style={{ color: "var(--color-primary)" }} />
                  ) : (
                    <MailOpen size={16} className="text-text-muted" />
                  )}
                  <h3 className={`font-semibold ${!msg.isRead ? "text-(--color-text-primary)" : "text-text-secondary"}`}>
                    {msg.subject}
                  </h3>
                  {!msg.isRead && <Badge variant="primary">New</Badge>}
                </div>
                <p className="mt-1 text-sm text-text-muted">
                  {msg.name} &middot; {msg.email}
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-text-secondary">
                  {msg.message}
                </p>
                <p className="mt-2 text-xs text-text-muted">
                  {new Date(msg.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-4" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => viewMessage(msg)}
                  className="rounded-lg p-2 text-text-muted hover:bg-surface hover:text-primary"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="rounded-lg p-2 text-text-muted hover:bg-red-400/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}

        {messages.length === 0 && (
          <GlassCard className="p-12 text-center">
            <p className="text-text-muted">No messages yet.</p>
          </GlassCard>
        )}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.subject}
        size="md"
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-text-muted">From: </span>
                <span className="font-medium text-(--color-text-primary)">{selected.name}</span>
              </div>
              <div>
                <span className="text-text-muted">Email: </span>
                <a href={`mailto:${selected.email}`} className="font-medium" style={{ color: "var(--color-primary)" }}>
                  {selected.email}
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-surface-border bg-(--glass-bg) p-4">
              <p className="whitespace-pre-wrap text-sm text-text-secondary">
                {selected.message}
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}>
                <Button variant="primary">Reply via Email</Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
