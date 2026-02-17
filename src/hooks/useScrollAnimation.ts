"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollAnimationOptions {
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale";
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  markers?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    animation = "fadeUp",
    duration = 0.8,
    delay = 0,
    stagger = 0,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = stagger > 0 ? el.children : [el];

    const fromVars: gsap.TweenVars = { duration, delay, ease: "power3.out" };
    const initialVars: gsap.TweenVars = {};

    switch (animation) {
      case "fadeUp":
        Object.assign(initialVars, { opacity: 0, y: 40 });
        Object.assign(fromVars, { opacity: 1, y: 0 });
        break;
      case "fadeIn":
        Object.assign(initialVars, { opacity: 0 });
        Object.assign(fromVars, { opacity: 1 });
        break;
      case "slideLeft":
        Object.assign(initialVars, { opacity: 0, x: -60 });
        Object.assign(fromVars, { opacity: 1, x: 0 });
        break;
      case "slideRight":
        Object.assign(initialVars, { opacity: 0, x: 60 });
        Object.assign(fromVars, { opacity: 1, x: 0 });
        break;
      case "scale":
        Object.assign(initialVars, { opacity: 0, scale: 0.8 });
        Object.assign(fromVars, { opacity: 1, scale: 1 });
        break;
    }

    gsap.set(children, initialVars);

    if (stagger > 0) {
      ScrollTrigger.batch(children, {
        onEnter: (batch) => {
          gsap.to(batch, { ...fromVars, stagger });
        },
        start,
      });
    } else {
      gsap.to(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [animation, duration, delay, stagger, start]);

  return ref;
}
