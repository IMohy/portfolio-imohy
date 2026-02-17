"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function BackgroundOrbs() {
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blobs = meshRef.current?.querySelectorAll(".mesh-blob");
    if (!blobs) return;

    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: `random(-100, 100)`,
        y: `random(-80, 80)`,
        scale: gsap.utils.random(0.85, 1.15),
        duration: gsap.utils.random(20, 35),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 3,
      });

      gsap.to(blob, {
        rotate: `random(-10, 10)`,
        duration: gsap.utils.random(25, 40),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 2,
      });
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Animated mesh blobs - pushed to edges, no center overlap */}
      <div ref={meshRef} className="absolute inset-0">
        {/* Top-left corner blob */}
        <div
          className="mesh-blob absolute -top-[25%] -left-[15%] h-[55vh] w-[55vh] rounded-full"
          style={{
            background: `radial-gradient(circle at 60% 60%, hsla(var(--color-primary-h), 90%, 45%, 0.18), transparent 65%)`,
            filter: "blur(80px)",
          }}
        />
        {/* Right edge blob */}
        <div
          className="mesh-blob absolute top-[20%] -right-[20%] h-[50vh] w-[50vh] rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 50%, hsla(var(--color-secondary-h), 80%, 42%, 0.14), transparent 65%)`,
            filter: "blur(90px)",
          }}
        />
        {/* Bottom-left blob */}
        <div
          className="mesh-blob absolute -bottom-[15%] -left-[10%] h-[50vh] w-[60vh] rounded-full"
          style={{
            background: `radial-gradient(circle at 60% 30%, hsla(var(--color-accent-h), 85%, 48%, 0.1), transparent 65%)`,
            filter: "blur(90px)",
          }}
        />
        {/* Bottom-right blob */}
        <div
          className="mesh-blob absolute -bottom-[10%] -right-[15%] h-[40vh] w-[40vh] rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, hsla(var(--color-primary-h), 75%, 50%, 0.08), transparent 65%)`,
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Noise/grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Subtle top edge glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, hsla(var(--color-primary-h), 80%, 55%, 0.12) 30%, hsla(var(--color-secondary-h), 70%, 50%, 0.12) 70%, transparent)`,
        }}
      />
    </div>
  );
}
