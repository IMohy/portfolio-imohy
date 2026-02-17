"use client";

import { useState, useCallback } from "react";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Upload, Copy, CheckCheck, Trash2 } from "lucide-react";

interface UploadedFile {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export default function MediaDashboard() {
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error();
        const data = await res.json();
        setUploads((prev) => [data, ...prev]);
      }
      toast.success("Files uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }, []);

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("URL copied!");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const removeFromList = (url: string) => {
    setUploads((prev) => prev.filter((u) => u.url !== url));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-(--color-text-primary)">Media Library</h1>
      </div>

      <GlassCard className="p-8">
        <label className="flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed border-surface-border p-8 transition-colors hover:border-primary/50">
          <Upload size={32} className="text-text-muted" />
          <div className="text-center">
            <p className="font-medium text-text-secondary">
              {uploading ? "Uploading..." : "Click to upload files"}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Images, documents, etc.
            </p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </GlassCard>

      {uploads.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uploads.map((file) => (
            <GlassCard key={file.url} className="overflow-hidden p-0">
              {file.mimeType.startsWith("image/") && (
                <div className="h-40 bg-surface">
                  <img
                    src={file.url}
                    alt={file.filename}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <p className="truncate text-sm font-medium text-(--color-text-primary)">
                  {file.filename}
                </p>
                <p className="text-xs text-text-muted">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Button size="sm" onClick={() => copyUrl(file.url)}>
                    {copiedUrl === file.url ? <CheckCheck size={14} /> : <Copy size={14} />}
                    Copy URL
                  </Button>
                  <button
                    onClick={() => removeFromList(file.url)}
                    className="rounded-lg p-1.5 text-text-muted hover:bg-red-400/10 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
