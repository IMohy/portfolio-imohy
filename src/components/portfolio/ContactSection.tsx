"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Copy, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import type { SiteSettings } from "@/types";

interface ContactSectionProps {
  settings?: SiteSettings;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("mohy.web@gmail.com");
    setCopied(true);
    toast.success("Email copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { icon: Github, href: settings?.githubUrl || "#", label: "GitHub" },
    { icon: Linkedin, href: settings?.linkedinUrl || "#", label: "LinkedIn" },
    { icon: Twitter, href: settings?.twitterUrl || "#", label: "Twitter" },
  ].filter((s) => s.href && s.href !== "#");

  return (
    <section id="contact" className="section-padding relative">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind or want to chat? Feel free to reach out!"
        />

        {/* Compact info row */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[var(--color-text-muted)]">
          <button
            onClick={copyEmail}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
          >
            <Mail size={15} style={{ color: "var(--color-primary)" }} />
            <span>mohy.web@gmail.com</span>
            {copied ? <CheckCheck size={13} className="text-emerald-500" /> : <Copy size={13} className="opacity-40" />}
          </button>
          <span className="flex items-center gap-2">
            <Phone size={15} style={{ color: "var(--color-secondary)" }} />
            +20 155 355 2663
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={15} style={{ color: "var(--color-accent)" }} />
            Cairo, Egypt
          </span>
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Form */}
        <GlassCard className="p-6 md:p-8" glow>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="name"
                label="Name"
                placeholder="Your name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <Input
              id="subject"
              label="Subject"
              placeholder="What's this about?"
              error={errors.subject?.message}
              {...register("subject")}
            />
            <Textarea
              id="message"
              label="Message"
              placeholder="Tell me about your project..."
              rows={5}
              error={errors.message?.message}
              {...register("message")}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </Button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
