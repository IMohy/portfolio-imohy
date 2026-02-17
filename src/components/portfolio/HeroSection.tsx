'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Download, MessageCircle, Briefcase, Code2, Layers, Zap, Github, Linkedin, Mail } from 'lucide-react';
import type { Hero, SiteSettings } from '@/types';
import { ScrollMouseIcon, Logo } from '@/components/icons';

interface HeroSectionProps {
  data?: Hero;
  settings?: SiteSettings;
}

export function HeroSection({ data, settings }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const headline = data?.headline || 'Mohamed Mohy';
  const subtitle = data?.subtitle || 'Frontend Web Developer';
  const tagline = data?.tagline || 'Building modern, responsive, and user-focused web applications';
  const ctaPrimary = data?.ctaPrimaryText || 'View My Work';
  const ctaSecondary = data?.ctaSecondaryText || 'Get In Touch';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(logoRef.current, {
        opacity: 0,
        scale: 0.6,
        duration: 0.7,
        ease: 'back.out(1.4)',
      });

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        tl.from(chars, {
          opacity: 0,
          y: 40,
          rotateX: -90,
          stagger: 0.03,
          duration: 0.6,
          ease: 'back.out(1.7)',
        });
      }

      tl.from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .from(taglineRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from(infoRef.current, { opacity: 0, y: 15, duration: 0.4, ease: 'power3.out' }, '-=0.2')
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        .from(socialsRef.current, { opacity: 0, y: 10, duration: 0.4, ease: 'power3.out' }, '-=0.2')
        .from(scrollRef.current, { opacity: 0, y: -10, duration: 0.5, ease: 'power3.out' }, '-=0.1');

      gsap.to('.scroll-dot', {
        cy: 24,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block current text-4xl md:text-8xl" style={{ willChange: 'transform' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const quickInfo = [
    { icon: Code2, text: '3+ Years of Experience' },
    { icon: Layers, text: 'React / Next.js / TypeScript' },
    { icon: Zap, text: 'Performance Obsessed' },
  ];

  const socialLinks = [
    { icon: Github, href: settings?.githubUrl || 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: settings?.linkedinUrl || 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mohy.web@gmail.com', label: 'Email' },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-start px-6 pt-18"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div ref={logoRef} className="flex justify-center text-(--color-text-primary)">
          <Logo size={160} />
        </div>
        <h1
          ref={headlineRef}
          className="font-heading font-bold leading-tight tracking-tight"
          style={{ fontSize: 'var(--font-size-hero)' }}
        >
          {splitText(headline)}
        </h1>

        <p
          ref={subtitleRef}
          className="text-(length:--font-size-h2) font-medium"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {subtitle}
        </p>

        <p ref={taglineRef} className="mx-auto mt-4 max-w-2xl text-(length:--font-size-body) text-text-secondary">
          {tagline}
        </p>

        <div ref={infoRef} className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {quickInfo.map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-text-muted">
              <item.icon size={15} style={{ color: 'var(--color-primary)' }} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="glass-btn glass-btn-primary flex items-center gap-2 px-7 py-3 text-base font-medium"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Briefcase size={18} />
            {ctaPrimary}
          </a>
          <a
            href="#contact"
            className="glass-btn flex items-center gap-2 px-7 py-3 text-base font-medium"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <MessageCircle size={18} />
            {ctaSecondary}
          </a>
          {data?.resumeUrl && (
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn flex items-center gap-2 px-7 py-3 text-base font-medium"
            >
              <Download size={18} />
              Download CV
            </a>
          )}
        </div>

        <div ref={socialsRef} className="mt-6 flex items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-text-muted transition-all duration-200 hover:bg-surface hover:text-primary glass"
              aria-label={link.label}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-text-muted transition-colors hover:text-primary"
        >
          <ScrollMouseIcon className="scroll-mouse-svg" />
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] opacity-50">scroll</span>
        </a>
      </div>
    </section>
  );
}
