'use client';

import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { gsap } from '@/lib/gsap';
import { Logo } from '@/components/icons';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const links = mobileMenuRef.current.querySelectorAll('a');
      gsap.from(links, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-[env(safe-area-inset-top)] left-0 right-0 z-50 flex justify-center pt-3 px-3 sm:px-4 overflow-hidden">
        <nav
          ref={navRef}
          className="w-full max-w-5xl min-w-0 rounded-2xl border border-white/8 bg-(--color-bg)/60 py-2.5 px-3 sm:px-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl backdrop-saturate-[1.8]"
        >
          <div className="flex items-center justify-between">
            <a href="#home" className="flex flex-shrink-0 items-center text-(--color-text-primary)">
              <Logo size={32} className="sm:h-9 sm:w-9" />
            </a>

            <div className="hidden items-center gap-0.5 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'relative px-3.5 py-1.5 text-sm font-medium transition-all duration-200 rounded-lg',
                    activeSection === link.href.slice(1)
                      ? 'text-(--color-primary)] bg-(--color-primary)]/[0.08]'
                      : 'text-(--color-text-secondary)] hover:text-(--color-text-primary)] hover:bg-white/[/04]'
                  )}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <span
                      className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-(--color-text-secondary)] transition-colors hover:bg-(--color-surface)] md:hidden"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-(--color-bg)]/95 backdrop-blur-xl md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={cn(
                'font-heading text-2xl font-semibold transition-colors',
                activeSection === link.href.slice(1)
                  ? 'text-(--color-primary)]'
                  : 'text-(--color-text-secondary)] hover:text-(--color-text-primary)]'
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
