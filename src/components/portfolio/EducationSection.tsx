"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeading } from "./SectionHeading";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Education, Certification } from "@/types";

interface EducationSectionProps {
  education?: Education[];
  certifications?: Certification[];
}

const defaultEducation: Education[] = [
  {
    id: "1",
    institution: "Obour Institute",
    degree: "Bachelor's Degree",
    field: "Management Information System",
    graduationDate: "2025-06-01",
    logoUrl: null,
    order: 0,
  },
];

const defaultCertifications: Certification[] = [
  {
    id: "1",
    title: "React Development Cross-Skilling",
    issuer: "Udacity",
    issueDate: null,
    credUrl: null,
    logoUrl: null,
    order: 0,
  },
];

export function EducationSection({ education, certifications }: EducationSectionProps) {
  const edu = education && education.length > 0 ? education : defaultEducation;
  const certs = certifications && certifications.length > 0 ? certifications : defaultCertifications;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(".edu-item");
    if (!items) return;

    gsap.set(items, { opacity: 0, y: 25 });
    ScrollTrigger.batch(items, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: "power3.out",
        });
      },
      start: "top 90%",
    });
  }, [edu, certs]);

  return (
    <section id="education" className="section-padding relative">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Education"
          subtitle="Academic background and certifications"
        />

        <div ref={containerRef} className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[19px] top-0 bottom-0 w-px hidden md:block"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--color-primary) 10%, var(--color-secondary) 90%, transparent)",
            }}
          />

          <div className="space-y-0">
            {/* Degrees */}
            {edu.sort((a, b) => a.order - b.order).map((item) => (
              <div key={item.id} className="edu-item group relative flex gap-5 py-6 md:pl-12">
                {/* Dot on line */}
                <div className="absolute left-[15px] top-8 hidden h-[9px] w-[9px] rounded-full md:block"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    boxShadow: "0 0 0 3px hsla(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l), 0.2)",
                  }}
                />

                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl md:hidden"
                  style={{
                    background: "linear-gradient(135deg, hsla(var(--color-primary-h), 60%, 50%, 0.15), hsla(var(--color-secondary-h), 50%, 50%, 0.1))",
                  }}
                >
                  <GraduationCap size={22} style={{ color: "var(--color-primary)" }} />
                </div>

                <div className="flex-1 rounded-xl border border-surface-border bg-(--glass-bg) p-5 backdrop-blur-md transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-base font-semibold text-(--color-text-primary)">
                        {item.degree} in {item.field}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {item.institution}
                      </p>
                    </div>
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg md:flex"
                      style={{
                        background: "linear-gradient(135deg, hsla(var(--color-primary-h), 60%, 50%, 0.12), hsla(var(--color-secondary-h), 50%, 50%, 0.08))",
                      }}
                    >
                      <GraduationCap size={18} style={{ color: "var(--color-primary)" }} />
                    </div>
                  </div>
                  {item.graduationDate && (
                    <p className="mt-2 text-xs text-text-muted">
                      Graduated {formatDate(item.graduationDate)}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Certifications */}
            {certs.sort((a, b) => a.order - b.order).map((cert) => (
              <div key={cert.id} className="edu-item group relative flex gap-5 py-6 md:pl-12">
                {/* Dot on line */}
                <div className="absolute left-[15px] top-8 hidden h-[9px] w-[9px] rounded-full md:block"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    boxShadow: "0 0 0 3px hsla(var(--color-accent-h), var(--color-accent-s), var(--color-accent-l), 0.2)",
                  }}
                />

                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl md:hidden"
                  style={{
                    background: "linear-gradient(135deg, hsla(var(--color-accent-h), 60%, 50%, 0.15), hsla(var(--color-primary-h), 50%, 50%, 0.1))",
                  }}
                >
                  <Award size={22} style={{ color: "var(--color-accent)" }} />
                </div>

                <div className="flex-1 rounded-xl border border-surface-border bg-(--glass-bg) p-5 backdrop-blur-md transition-all duration-300 group-hover:border-accent/20 group-hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-base font-semibold text-(--color-text-primary)">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg md:flex"
                      style={{
                        background: "linear-gradient(135deg, hsla(var(--color-accent-h), 60%, 50%, 0.12), hsla(var(--color-primary-h), 50%, 50%, 0.08))",
                      }}
                    >
                      <Award size={18} style={{ color: "var(--color-accent)" }} />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    {cert.issueDate && (
                      <span className="text-xs text-text-muted">
                        Issued {formatDate(cert.issueDate)}
                      </span>
                    )}
                    {cert.credUrl && (
                      <a
                        href={cert.credUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:underline"
                        style={{ color: "var(--color-primary)" }}
                      >
                        View Credential <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
