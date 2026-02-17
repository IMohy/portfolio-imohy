"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Calendar, Building2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Experience } from "@/types";

interface ExperienceSectionProps {
  data?: Experience[];
}

const defaultExperience: Experience[] = [
  {
    id: "1",
    company: "Fleetrun",
    companyLogo: null,
    title: "Frontend Web Developer",
    location: "Saudi Arabia",
    workType: "Freelance",
    startDate: "2025-01-01",
    endDate: "2025-09-01",
    description: [
      "Automated responsive images, WebP formats, and dynamic sizing to reduce load times",
      "Reduced initial page load time by 60% via code-splitting, lazy loading, and caching",
      "Developed scalable, reusable component architecture with React and TypeScript",
    ],
    order: 0,
  },
  {
    id: "2",
    company: "Amyal Smart",
    companyLogo: null,
    title: "Frontend Web Developer",
    location: "Saudi Arabia",
    workType: "Remote",
    startDate: "2024-02-01",
    endDate: null,
    description: [
      "Designed and developed modern apps using Vite.js, Next.js, and TypeScript",
      "Built responsive landing pages, dashboards, and product storage systems",
      "Implemented real-time tracking systems for delivery monitoring",
      "Collaborated with UX/UI designers on user-friendly interfaces",
    ],
    order: 1,
  },
  {
    id: "3",
    company: "MassFluence",
    companyLogo: null,
    title: "Front-End Web Developer",
    location: "Lebanon",
    workType: "Freelance",
    startDate: "2023-10-01",
    endDate: "2024-03-01",
    description: [
      "Developed web applications, corporate dashboards, and interactive charts",
      "Created responsive Learning Management Systems (LMS) tailored to client needs",
      "Ensured high performance and scalability",
    ],
    order: 2,
  },
  {
    id: "4",
    company: "Trugraph",
    companyLogo: null,
    title: "Front-End Web Developer",
    location: "Egypt",
    workType: "On-site",
    startDate: "2022-12-01",
    endDate: "2024-02-01",
    description: [
      "Improved codebase by fixing bugs, refactoring components, improving readability",
      "Worked closely with backend engineers and designers",
      "Implemented caching strategies (HTTP caching, SWR, React Query) — 40% less API load time",
    ],
    order: 3,
  },
  {
    id: "5",
    company: "SmartiveMedia",
    companyLogo: null,
    title: "Front-End Web Developer",
    location: "Saudi Arabia",
    workType: "Remote",
    startDate: "2022-01-01",
    endDate: "2022-12-01",
    description: [
      "Built real estate and e-commerce web apps using Next.js, Material-UI, Ant Design",
      "Developed Shopify-integrated platforms with Next.js, TypeScript, Tailwind CSS",
      "Focused on accessibility and performance",
    ],
    order: 4,
  },
];

export function ExperienceSection({ data }: ExperienceSectionProps) {
  const experiences = data && data.length > 0 ? data : defaultExperience;
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = timelineRef.current?.querySelectorAll(".timeline-card");
    if (!cards) return;

    cards.forEach((card, i) => {
      const direction = i % 2 === 0 ? -60 : 60;
      gsap.set(card, { opacity: 0, x: direction });

      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
        once: true,
      });
    });

    // Animate dots on scroll
    const dots = timelineRef.current?.querySelectorAll(".timeline-dot");
    dots?.forEach((dot) => {
      gsap.set(dot, { scale: 0 });
      ScrollTrigger.create({
        trigger: dot,
        start: "top 85%",
        onEnter: () => {
          gsap.to(dot, {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
          });
        },
        once: true,
      });
    });
  }, [experiences]);

  return (
    <section id="experience" className="section-padding relative">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey so far"
        />

        <div ref={timelineRef} className="relative">
          {/* Center vertical line - faded top and bottom */}
          <div
            className="absolute top-0 bottom-0 w-px left-[15px] md:left-1/2 md:-translate-x-[0.5px]"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--color-primary) 10%, var(--color-secondary) 90%, transparent)",
            }}
          />

          <div className="space-y-12">
            {experiences
              .sort((a, b) => a.order - b.order)
              .map((exp, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <div
                    key={exp.id}
                    className={`timeline-card relative flex items-start gap-0 md:gap-0 ${
                      isLeft
                        ? "pl-10 md:pl-0 md:flex-row"
                        : "pl-10 md:pl-0 md:flex-row-reverse"
                    }`}
                  >
                    {/* Card takes ~47% of the width on md+ */}
                    <div className={`w-full md:w-[calc(50%-1.5rem)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                      <GlassCard className="p-6" glow>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <Building2 size={16} style={{ color: "var(--color-primary)" }} />
                          <h3 className="font-heading text-lg font-semibold text-[var(--color-text-primary)]">
                            {exp.company}
                          </h3>
                          <Badge variant="primary">{exp.workType}</Badge>
                        </div>

                        <p className="text-base font-medium text-[var(--color-text-secondary)]">
                          {exp.title}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(exp.startDate)} &mdash; {exp.endDate ? formatDate(exp.endDate) : "Present"}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {exp.location}
                          </span>
                        </div>

                        <ul className="mt-4 space-y-2">
                          {exp.description.map((bullet, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                            >
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: "var(--color-primary)" }}
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </GlassCard>
                    </div>

                    {/* Dot - centered on the timeline line */}
                    <div
                      className="timeline-dot absolute top-6 left-[15px] -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center"
                    >
                      <div className="h-3 w-3 rounded-full border-2"
                        style={{
                          borderColor: "var(--color-primary)",
                          backgroundColor: "var(--color-bg)",
                          boxShadow: "0 0 0 4px hsla(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l), 0.15)",
                        }}
                      />
                    </div>

                    {/* Empty spacer for the other side */}
                    <div className="hidden md:block md:w-[calc(50%-1.5rem)]" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
