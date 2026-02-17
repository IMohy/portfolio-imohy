'use client';

import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';
import type { SiteSettings } from '@/types';
import { Logo } from '@/components/icons';

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socials = [
    { icon: Github, href: settings?.githubUrl, label: 'GitHub' },
    { icon: Linkedin, href: settings?.linkedinUrl, label: 'LinkedIn' },
    { icon: Twitter, href: settings?.twitterUrl, label: 'Twitter' },
  ].filter((s) => s.href);

  return (
    <footer className="relative pb-6 px-3 sm:px-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/[0.08] bg-[var(--color-bg)]/60 px-6 py-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl backdrop-saturate-[1.8]">
        <div className="flex flex-col items-center gap-5">
          <a
            href="#home"
            className="flex items-center text-[var(--color-text-primary)]"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <Logo size={82} />
          </a>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {socials.length > 0 && (
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-all hover:bg-white/[0.06] hover:text-[var(--color-primary)]"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}

          <p className="text-center text-xs text-[var(--color-text-muted)]">
            Designed & Built by Mohamed Mohy &copy; {year}
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="glass fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-all hover:text-[var(--color-primary)] hover:scale-110"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
