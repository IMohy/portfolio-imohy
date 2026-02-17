"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.from(el.querySelector("h2"), {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power3.out",
    })
      .from(
        el.querySelector(".heading-line"),
        {
          scaleX: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .from(
        el.querySelector("p"),
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={headingRef} className={cn("mb-16 text-center", className)}>
      <h2
        className="font-heading text-[length:var(--font-size-h1)] font-bold text-[var(--color-text-primary)]"
      >
        {title}
      </h2>
      <div
        className="heading-line mx-auto mt-4 h-1 w-20 rounded-full origin-left"
        style={{
          background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`,
        }}
      />
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-[length:var(--font-size-body)] text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
