"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";
import type { About } from "@/types";

interface AboutSectionProps {
  data?: About;
}

const defaultAbout: About = {
  id: "default",
  summary:
    "Frontend web developer with 3+ years of experience building modern, responsive, and user-focused web applications. Skilled in React.js, Next.js, Vite.js, and TypeScript, with a strong background in developing dashboards, e-commerce platforms, and scalable UI components. Experienced in collaborating with cross-functional teams and delivering high-quality, maintainable frontend solutions aligned with business requirements.",
  photoUrl: null,
  yearsExp: 3,
  totalProjects: 20,
  totalCompanies: 5,
};

import { CalendarIcon, BuildingsIcon, HexagonIcon } from "@/components/icons";

const statIcons = {
  years: CalendarIcon,
  companies: BuildingsIcon,
  projects: HexagonIcon,
} as const;

export function AboutSection({ data }: AboutSectionProps) {
  const about = data || defaultAbout;
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const counters = statsRef.current?.querySelectorAll(".stat-number");
    if (!counters) return;

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0", 10);
      const obj = { value: 0 };

      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        onEnter: () => {
          gsap.to(obj, {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              counter.textContent = Math.round(obj.value) + "+";
            },
          });
        },
        once: true,
      });
    });

    // Stagger stat cards with scale + fade
    const cards = statsRef.current?.querySelectorAll(".stat-card");
    if (cards) {
      gsap.set(cards, { opacity: 0, y: 30, scale: 0.95 });
      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.6,
            ease: "back.out(1.4)",
          });
        },
        start: "top 90%",
      });
    }
  }, [about]);

  const stats = [
    { type: "years" as const, label: "Years Experience", value: about.yearsExp },
    { type: "companies" as const, label: "Companies", value: about.totalCompanies },
    { type: "projects" as const, label: "Projects", value: about.totalProjects },
  ];

  return (
    <section ref={sectionRef} id="about" className="section-padding relative">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="About Me"
          subtitle="A brief overview of my professional journey"
        />

        <GlassCard className="p-8 md:p-12" glow>
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            {about.photoUrl && (
              <div className="shrink-0">
                <div className="relative h-40 w-40 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-lg shadow-primary/10">
                  <img
                    src={about.photoUrl}
                    alt="Mohamed Mohy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <p className="text-(length:--font-size-body) leading-relaxed text-text-secondary">
                {about.summary}
              </p>
            </div>
          </div>
        </GlassCard>

        <div ref={statsRef} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card glass-card group relative overflow-hidden p-6 text-center transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(300px circle at 50% 30%, hsla(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l), 0.06), transparent 60%)`,
                }}
              />
              <div className="relative z-10 flex flex-col items-center gap-3">
                {(() => { const Icon = statIcons[stat.type]; return <Icon />; })()}
                <span
                  className="stat-number font-heading text-3xl font-bold text-(--color-text-primary)"
                  data-target={stat.value}
                >
                  0+
                </span>
                <span className="text-sm text-text-muted">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
