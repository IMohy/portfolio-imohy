"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeading } from "./SectionHeading";
import type { Skill } from "@/types";

interface SkillsSectionProps {
  data?: Skill[];
}

const defaultSkills: Skill[] = [
  { id: "1", name: "JavaScript (ES6+)", icon: null, category: "Languages", order: 0 },
  { id: "2", name: "TypeScript", icon: null, category: "Languages", order: 1 },
  { id: "3", name: "HTML5", icon: null, category: "Languages", order: 2 },
  { id: "4", name: "CSS3", icon: null, category: "Languages", order: 3 },
  { id: "5", name: "React.js", icon: null, category: "Frameworks", order: 0 },
  { id: "6", name: "Next.js", icon: null, category: "Frameworks", order: 1 },
  { id: "7", name: "Vite.js", icon: null, category: "Frameworks", order: 2 },
  { id: "8", name: "Tailwind CSS", icon: null, category: "Styling", order: 0 },
  { id: "9", name: "Material UI", icon: null, category: "Styling", order: 1 },
  { id: "10", name: "Chakra UI", icon: null, category: "Styling", order: 2 },
  { id: "11", name: "Ant Design", icon: null, category: "Styling", order: 3 },
  { id: "12", name: "Redux Toolkit", icon: null, category: "State Management", order: 0 },
  { id: "13", name: "Context API", icon: null, category: "State Management", order: 1 },
  { id: "14", name: "Zustand", icon: null, category: "State Management", order: 2 },
  { id: "15", name: "TanStack Query", icon: null, category: "Data Fetching", order: 0 },
  { id: "16", name: "SWR", icon: null, category: "Data Fetching", order: 1 },
  { id: "17", name: "RESTful APIs", icon: null, category: "Data Fetching", order: 2 },
  { id: "18", name: "Formik", icon: null, category: "Forms & Validation", order: 0 },
  { id: "19", name: "React Hook Form", icon: null, category: "Forms & Validation", order: 1 },
  { id: "20", name: "Zod", icon: null, category: "Forms & Validation", order: 2 },
  { id: "21", name: "Git & GitHub", icon: null, category: "Tools", order: 0 },
  { id: "22", name: "Figma", icon: null, category: "Tools", order: 1 },
  { id: "23", name: "VS Code", icon: null, category: "Tools", order: 2 },
  { id: "24", name: "Vercel", icon: null, category: "Tools", order: 3 },
];

const categoryColors: Record<string, string> = {
  Languages: "var(--color-primary)",
  Frameworks: "var(--color-secondary)",
  Styling: "var(--color-accent)",
  "State Management": "var(--color-primary)",
  "Data Fetching": "var(--color-secondary)",
  "Forms & Validation": "var(--color-accent)",
  Tools: "var(--color-primary)",
};

function getCategoryColor(category: string, index: number): string {
  if (categoryColors[category]) return categoryColors[category];
  const colors = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)"];
  return colors[index % colors.length];
}

export function SkillsSection({ data }: SkillsSectionProps) {
  const skills = data && data.length > 0 ? data : defaultSkills;
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const allCategories = ["All", ...categories];

  const filteredSkills =
    activeCategory === "All"
      ? [...skills].sort((a, b) => {
          const catA = categories.indexOf(a.category);
          const catB = categories.indexOf(b.category);
          if (catA !== catB) return catA - catB;
          return a.order - b.order;
        })
      : skills.filter((s) => s.category === activeCategory).sort((a, b) => a.order - b.order);

  const handleFilter = useCallback(
    (cat: string) => {
      if (cat === activeCategory) return;
      const items = gridRef.current?.querySelectorAll(".skill-item");
      if (items) {
        gsap.to(items, {
          opacity: 0,
          scale: 0.92,
          y: 8,
          duration: 0.2,
          stagger: 0.015,
          ease: "power2.in",
          onComplete: () => {
            setActiveCategory(cat);
          },
        });
      } else {
        setActiveCategory(cat);
      }
    },
    [activeCategory]
  );

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".skill-item");
    if (!items || items.length === 0) return;

    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.92, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.35,
        ease: "power3.out",
      }
    );
  }, [activeCategory]);

  useEffect(() => {
    const tabs = sectionRef.current?.querySelectorAll(".cat-tab");
    if (!tabs) return;

    gsap.set(tabs, { opacity: 0, y: 10 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(tabs, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power3.out",
        });
      },
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Technical Skills"
          subtitle="Technologies and tools I work with"
        />

        {/* Category filter tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {allCategories.map((cat, i) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`cat-tab rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
                    : "border border-surface-border bg-(--glass-bg) text-text-secondary backdrop-blur-sm hover:border-primary/30 hover:text-(--color-text-primary)"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {filteredSkills.map((skill, i) => {
            const color = getCategoryColor(
              skill.category,
              categories.indexOf(skill.category)
            );
            return (
              <div
                key={skill.id}
                className="skill-item group relative overflow-hidden rounded-xl border border-surface-border bg-(--glass-bg) p-4 backdrop-blur-sm transition-all duration-300 hover:border-transparent hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                  }}
                />

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}12, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Category dot + label (only in All view) */}
                  {activeCategory === "All" && (
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                        {skill.category}
                      </span>
                    </div>
                  )}
                  {/* Skill name */}
                  <div className="flex items-center gap-2">
                    {activeCategory !== "All" && (
                      <span
                        className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    )}
                    <p className="text-sm font-semibold text-(--color-text-primary)">
                      {skill.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
