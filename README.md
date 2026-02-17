# Liquid Glass Portfolio — Mohamed Mohy

> A premium, animated portfolio website with a **liquid glass morphism** design system, built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **GSAP** animations. Includes a full **admin dashboard** to manage all portfolio content dynamically.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System & Theming](#color-system--theming)
3. [Typography](#typography)
4. [Portfolio Sections](#portfolio-sections)
5. [Admin Dashboard](#admin-dashboard)
6. [Tech Stack](#tech-stack)
7. [Project Architecture](#project-architecture)
8. [Database Schema](#database-schema)
9. [Animation Strategy](#animation-strategy)
10. [Responsive Design](#responsive-design)
11. [Deployment](#deployment)

---

## Design Philosophy

### Liquid Glass Morphism

Every surface in this portfolio uses a **liquid glass** aesthetic:

- **Frosted glass cards** with `backdrop-filter: blur()` and semi-transparent backgrounds
- **Gradient borders** that shimmer on hover (animated with GSAP)
- **Floating orbs / blobs** in the background that move slowly (GSAP-driven SVG or CSS), creating a living, breathing feel
- **Refraction-like distortion** on scroll — elements subtly warp/shift as the user scrolls past them
- **Liquid hover states** — when hovering over a card, the glass surface ripples with a subtle wave animation
- **Smooth parallax layers** — multiple depth layers of glass panels creating a 3D spatial feel
- **Glow effects** — soft, diffused color glows behind glass panels that pulse gently
- **Edge light reflections** — thin bright lines along card edges that move as the user's cursor moves (GSAP-tracked)

### Key Visual Principles

| Principle | Implementation |
|---|---|
| Depth | Multiple translucent layers, parallax, z-index stacking |
| Motion | GSAP ScrollTrigger, hover animations, floating background elements |
| Clarity | High-contrast text on frosted surfaces, readable at all times |
| Elegance | Minimal UI chrome, generous whitespace, smooth curves |
| Responsiveness | Fluid layouts, mobile-first, animations adapt to device capability |

---

## Color System & Theming

### Architecture

The color system is built with **CSS custom properties** (variables) so that changing the primary/secondary color updates the entire site instantly. Colors are defined in HSL format for easy manipulation.

```css
/* --- Light Mode (default) --- */
:root {
  /* Primary — Used for CTAs, links, active states, accent glows */
  --color-primary-h: 199;        /* Hue */
  --color-primary-s: 89%;        /* Saturation */
  --color-primary-l: 48%;        /* Lightness */
  --color-primary: hsl(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l));
  --color-primary-light: hsl(var(--color-primary-h), var(--color-primary-s), 65%);
  --color-primary-dark: hsl(var(--color-primary-h), var(--color-primary-s), 35%);

  /* Secondary — Used for supporting elements, tags, badges */
  --color-secondary-h: 166;
  --color-secondary-s: 72%;
  --color-secondary-l: 50%;
  --color-secondary: hsl(var(--color-secondary-h), var(--color-secondary-s), var(--color-secondary-l));
  --color-secondary-light: hsl(var(--color-secondary-h), var(--color-secondary-s), 70%);
  --color-secondary-dark: hsl(var(--color-secondary-h), var(--color-secondary-s), 35%);

  /* Accent — Used sparingly for highlights and micro-interactions */
  --color-accent-h: 34;
  --color-accent-s: 100%;
  --color-accent-l: 60%;
  --color-accent: hsl(var(--color-accent-h), var(--color-accent-s), var(--color-accent-l));

  /* Neutral / Surface */
  --color-bg: #f0f4f8;
  --color-surface: rgba(255, 255, 255, 0.25);
  --color-surface-hover: rgba(255, 255, 255, 0.40);
  --color-surface-border: rgba(255, 255, 255, 0.45);
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;

  /* Glass Properties */
  --glass-blur: 20px;
  --glass-saturation: 180%;
  --glass-bg: rgba(255, 255, 255, 0.15);
  --glass-border: 1px solid rgba(255, 255, 255, 0.3);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

  /* Background Gradient Orbs */
  --orb-color-1: hsl(var(--color-primary-h), 80%, 75%);
  --orb-color-2: hsl(var(--color-secondary-h), 70%, 70%);
  --orb-color-3: hsl(var(--color-accent-h), 90%, 75%);
}

/* --- Dark Mode --- */
[data-theme="dark"] {
  --color-bg: #0a0e17;
  --color-surface: rgba(255, 255, 255, 0.06);
  --color-surface-hover: rgba(255, 255, 255, 0.10);
  --color-surface-border: rgba(255, 255, 255, 0.12);
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;

  /* Glass (darker variant) */
  --glass-blur: 24px;
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-border: 1px solid rgba(255, 255, 255, 0.08);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  /* Orbs are more vivid in dark mode */
  --orb-color-1: hsl(var(--color-primary-h), 90%, 55%);
  --orb-color-2: hsl(var(--color-secondary-h), 80%, 50%);
  --orb-color-3: hsl(var(--color-accent-h), 95%, 55%);
}
```

### Suggested Default Palette

| Role | Light Mode | Dark Mode | Notes |
|---|---|---|---|
| **Primary** | `#0ea5e9` (Sky Blue) | `#38bdf8` | Main accent, CTAs, links |
| **Secondary** | `#2dd4bf` (Teal) | `#5eead4` | Tags, badges, secondary buttons |
| **Accent** | `#f59e0b` (Amber) | `#fbbf24` | Sparingly — highlights, notifications |
| **Background** | `#f0f4f8` | `#0a0e17` | Page background |
| **Surface** | `rgba(255,255,255,0.25)` | `rgba(255,255,255,0.06)` | Glass card backgrounds |
| **Text Primary** | `#0f172a` | `#e2e8f0` | Headings, body |
| **Text Secondary** | `#475569` | `#94a3b8` | Descriptions, captions |

### How to Change Colors

To rebrand the entire portfolio, only change the HSL hue values:

```ts
// theme-config.ts — single source of truth
export const themeConfig = {
  colors: {
    primary: { h: 199, s: 89, l: 48 },    // Change hue to rebrand
    secondary: { h: 166, s: 72, l: 50 },
    accent: { h: 34, s: 100, l: 60 },
  }
}
```

These values propagate through CSS variables and are also editable from the admin dashboard.

---

## Typography

### Font Selection: **Space Grotesk** + **Inter**

| Usage | Font | Weight | Why |
|---|---|---|---|
| Headings, Hero Text, Nav | **Space Grotesk** | 500, 700 | Geometric, techy, distinctive — stands out from generic portfolios |
| Body, Paragraphs, UI | **Inter** | 400, 500, 600 | Highly legible, great for long text and small UI labels |
| Code Snippets | **JetBrains Mono** | 400 | Monospace, perfect for showing tech stacks |

### Font Scale (Fluid Typography)

```css
/* Uses clamp() for fluid responsive sizing */
--font-size-hero: clamp(3rem, 8vw, 6rem);         /* Hero headline */
--font-size-h1: clamp(2rem, 4vw, 3.5rem);          /* Section titles */
--font-size-h2: clamp(1.5rem, 3vw, 2.25rem);       /* Subsection titles */
--font-size-h3: clamp(1.125rem, 2vw, 1.5rem);      /* Card titles */
--font-size-body: clamp(0.95rem, 1.2vw, 1.125rem); /* Body text */
--font-size-small: clamp(0.8rem, 1vw, 0.875rem);   /* Captions, labels */
--font-size-code: 0.875rem;                          /* Code blocks */
```

### Loading Strategy

- Fonts loaded via `next/font/google` (auto-optimized, zero layout shift)
- Font display: `swap` for instant text rendering
- Subset: `latin` to minimize download size

---

## Portfolio Sections

### 1. Navigation (Sticky Glass Navbar)

- **Sticky top** with liquid glass background
- **Logo** (stylized "MM" monogram or custom text)
- **Nav links**: Home, About, Skills, Experience, Projects, Education, Contact
- **Theme toggle** (sun/moon icon with smooth GSAP morph transition)
- **Mobile**: Hamburger menu with full-screen glass overlay, links animate in staggered
- **Active section indicator**: Glowing underline that slides between links using GSAP and IntersectionObserver
- **Scroll behavior**: Navbar background becomes more opaque as user scrolls down

### 2. Hero Section

- **Full viewport height** landing section
- **Animated headline**: "Mohamed Mohy" revealed letter by letter with GSAP SplitText
- **Subtitle**: "Frontend Web Developer" with typewriter/morphing effect
- **Brief tagline**: "Building modern, responsive, and user-focused web applications"
- **CTA buttons** (glass style):
  - "View My Work" → scrolls to Projects
  - "Get In Touch" → scrolls to Contact
  - "Download CV" → downloads PDF resume
- **Background**: Large animated gradient orbs floating slowly behind frosted glass overlay
- **Scroll indicator**: Animated chevron bouncing at the bottom
- **Optional**: A subtle 3D tilt effect on the hero card that follows the mouse (GSAP)

### 3. About / Summary Section

- **Glass card** with Mohamed's professional summary
- **Content** (from resume):
  > Frontend web developer with 3+ years of experience building modern, responsive, and user-focused web applications. Skilled in React.js, Next.js, Vite.js, and TypeScript, with a strong background in developing dashboards, e-commerce platforms, and scalable UI components. Experienced in collaborating with cross-functional teams and delivering high-quality, maintainable frontend solutions aligned with business requirements.
- **Photo/Avatar** area: Glass-framed circular or rounded-square image with a glow ring
- **Fun stats row** (animated counters on scroll — GSAP):
  - "3+ Years Experience"
  - "5+ Companies"
  - "20+ Projects"
- **Decorative**: Floating glass shapes in background

### 4. Technical Skills Section

- **Categorized skill grid** displayed as glass cards with icons
- **Categories**:

  | Category | Skills |
  |---|---|
  | **Languages** | JavaScript (ES6+), TypeScript, HTML5, CSS3 |
  | **Frameworks** | React.js, Next.js, Vite.js |
  | **Styling** | Tailwind CSS, Material UI, Chakra UI, Ant Design |
  | **State Management** | Redux Toolkit, Context API, Zustand |
  | **Data Fetching** | TanStack Query (React Query), SWR, RESTful APIs |
  | **Forms & Validation** | Formik, React Hook Form, Zod |
  | **Tools & Other** | Git, GitHub, Figma, VS Code, Vercel |

- **Visual**: Each skill shown as a glass pill/chip with an icon
- **Animation**: Skills stagger-animate into view on scroll (GSAP ScrollTrigger)
- **Optional**: Interactive — hovering a skill highlights related projects that used it

### 5. Work Experience Section (Timeline)

- **Vertical timeline** layout with glass cards
- **Each entry** has:
  - Company name + logo area
  - Job title
  - Date range
  - Location (with flag icon)
  - Work type badge (Remote / On-site / Freelance)
  - Bullet points of key achievements
- **Timeline data** (from resume):

  1. **Fleetrun** — Frontend Web Developer | Jan 2025 – Sep 2025 | Saudi Arabia (Freelance)
     - Automated responsive images, WebP formats, and dynamic sizing to reduce load times
     - Reduced initial page load time by 60% via code-splitting, lazy loading, and caching
     - Developed scalable, reusable component architecture with React and TypeScript

  2. **Amyal Smart** — Frontend Web Developer | Feb 2024 – Current | Saudi Arabia (Remote)
     - Designed and developed modern apps using Vite.js, Next.js, and TypeScript
     - Built responsive landing pages, dashboards, and product storage systems
     - Implemented real-time tracking systems for delivery monitoring
     - Collaborated with UX/UI designers on user-friendly interfaces

  3. **MassFluence** — Front-End Web Developer | Oct 2023 – Mar 2024 | Lebanon (Freelance)
     - Developed web applications, corporate dashboards, and interactive charts
     - Created responsive Learning Management Systems (LMS) tailored to client needs
     - Ensured high performance and scalability

  4. **Trugraph** — Front-End Web Developer | Dec 2022 – Feb 2024 | Egypt (On-site)
     - Improved codebase by fixing bugs, refactoring components, improving readability
     - Worked closely with backend engineers and designers
     - Implemented caching strategies (HTTP caching, SWR, React Query) — 40% less API load time

  5. **SmartiveMedia** — Front-End Web Developer | Jan 2022 – Dec 2022 | Saudi Arabia
     - Built real estate and e-commerce web apps using Next.js, Material-UI, Ant Design
     - Developed Shopify-integrated platforms with Next.js, TypeScript, Tailwind CSS
     - Focused on accessibility and performance

- **Animation**: Timeline cards slide in from alternating left/right with GSAP ScrollTrigger
- **Interactive**: Clicking a card gently expands it to show more detail

### 6. Projects Gallery Section

- **Featured projects grid** — a masonry or uniform grid of glass cards
- **Each project card** contains:
  - **Thumbnail / Screenshot** (with glass frame overlay)
  - **Project name**
  - **Short description** (1-2 lines)
  - **Tech stack tags** (glass pills with icons)
  - **Company / Client name**
  - **Links**: Live demo, GitHub repo (icon buttons)
- **Hover effect**: Card lifts up, glass brightens, thumbnail subtly zooms, glow intensifies
- **Filter bar**: Glass pill buttons to filter by tech (React, Next.js, TypeScript, etc.) — GSAP layout animation on filter change
- **Click to expand**: Opens a **detailed project modal/page** with:
  - Full project description
  - Role and responsibilities
  - Challenges and solutions
  - Multiple screenshots (carousel with GSAP)
  - Full tech stack with explanations
  - Links to live site / repo
- **Animation**: Cards stagger in on scroll; filter transitions are smooth GSAP layout animations

### 7. Education Section

- **Glass card** with education details:
  - **Obour Institute** — Egypt
  - **Bachelor's Degree** in Management Information System
  - Graduation: June 2025
- **Certification card**:
  - **React Development Cross-Skilling** — Udacity
- **Visual**: Graduation cap icon, institution logo area, decorative glass elements
- **Animation**: Slide up and fade in with GSAP

### 8. Contact Section

- **Split layout**: Contact info on one side, form on the other
- **Contact details** (glass cards):
  - Email: mohy.web@gmail.com (with copy button)
  - Phone: +20 155 355 2663
  - Location: Cairo, Egypt
  - Social links: GitHub, LinkedIn, Twitter/X (glass icon buttons with hover glow)
- **Contact form** (glass card):
  - Fields: Name, Email, Subject, Message
  - Glass-styled inputs with glowing focus state
  - Submit button with liquid ripple animation on click
  - Form validation with React Hook Form + Zod
  - Submission via API route (sends email via Resend, Nodemailer, or similar)
  - Success/error toast notifications (glass style)
- **Animation**: Form elements stagger in; input focus triggers GSAP glow animation

### 9. Footer

- **Minimal glass footer**
- Logo / Name
- Quick nav links
- Social media icons
- "Designed & Built by Mohamed Mohy" with current year
- **Back to top** button (glass circle with arrow, GSAP smooth scroll)

---

## Admin Dashboard

### Overview

A **protected admin panel** at `/dashboard` to manage all portfolio content without touching code. Built with the same liquid glass design language for consistency.

### Authentication

- **NextAuth.js** (Auth.js v5) with credentials provider
- Admin-only access (single user, email + password)
- JWT session strategy
- Protected API routes via middleware
- Login page: Glass card with email/password form, animated background

### Dashboard Pages & Features

| Page | Features |
|---|---|
| `/dashboard` | Overview stats (total projects, messages, page views), quick actions |
| `/dashboard/hero` | Edit hero headline, subtitle, tagline, CTA text, upload hero background |
| `/dashboard/about` | Edit summary text, upload profile photo, edit stats (years, projects, companies) |
| `/dashboard/skills` | CRUD skills — name, icon, category, proficiency level. Drag to reorder |
| `/dashboard/experience` | CRUD work entries — company, title, dates, location, type, description bullets |
| `/dashboard/projects` | CRUD projects — name, description, screenshots (multi-upload), tech stack tags, links, company, featured toggle, order |
| `/dashboard/education` | CRUD education and certifications |
| `/dashboard/contact` | View contact form submissions (inbox), mark read/unread, reply link, delete |
| `/dashboard/settings` | Site-wide settings: site title, meta description, social links, theme colors (primary/secondary hue pickers), toggle dark/light default |
| `/dashboard/media` | Media library — upload, view, delete images. Used across all sections |

### Dashboard UI Components

- Glass-styled data tables with sorting and pagination
- Glass modal dialogs for create/edit forms
- Rich text editor for descriptions (Tiptap or similar)
- Drag-and-drop image upload with preview
- Drag-and-drop reordering for skills, projects, experience
- Toast notifications for CRUD operations
- Responsive sidebar navigation

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.x (App Router) | Framework — SSR, SSG, API routes, middleware |
| **React** | 19.x | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **GSAP** | 3.x | Animations (ScrollTrigger, SplitText, MorphSVG) |

### Backend & Data

| Technology | Purpose |
|---|---|
| **Prisma** | ORM for database access, type-safe queries, migrations |
| **PostgreSQL** (via Neon / Supabase / Railway) | Database for all dynamic content |
| **NextAuth.js v5** | Authentication for admin dashboard |
| **Uploadthing** or **Cloudinary** | Image upload and optimization |
| **Resend** or **Nodemailer** | Sending contact form emails |

### Libraries & Utilities

| Library | Purpose |
|---|---|
| **React Hook Form** | Form handling (dashboard + contact form) |
| **Zod** | Schema validation |
| **Framer Motion** (optional) | Simple UI transitions where GSAP is overkill |
| **Lucide React** | Icon library (clean, consistent) |
| **next-themes** | Dark/light mode management |
| **Sonner** | Toast notifications (glass-styled) |
| **@dnd-kit/core** | Drag and drop for dashboard reordering |
| **Tiptap** | Rich text editor for dashboard |
| **sharp** | Image optimization |

### Dev Tools

| Tool | Purpose |
|---|---|
| **ESLint** | Linting |
| **Prettier** | Code formatting |
| **Husky + lint-staged** | Pre-commit hooks |
| **pnpm** | Package manager |

---

## Project Architecture

```
src/
├── app/
│   ├── (portfolio)/               # Public portfolio routes (grouped)
│   │   ├── layout.tsx             # Portfolio layout with nav + footer
│   │   ├── page.tsx               # Home — all sections rendered
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx       # Individual project detail page
│   │
│   ├── (dashboard)/               # Admin dashboard routes (grouped)
│   │   ├── layout.tsx             # Dashboard layout with sidebar
│   │   ├── dashboard/
│   │   │   ├── page.tsx           # Dashboard overview
│   │   │   ├── hero/
│   │   │   │   └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── skills/
│   │   │   │   └── page.tsx
│   │   │   ├── experience/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx       # List all projects
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx   # Create project
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx   # Edit project
│   │   │   ├── education/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx       # View messages
│   │   │   ├── media/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   └── login/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── hero/
│   │   │   └── route.ts
│   │   ├── about/
│   │   │   └── route.ts
│   │   ├── skills/
│   │   │   └── route.ts
│   │   ├── experience/
│   │   │   └── route.ts
│   │   ├── projects/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── education/
│   │   │   └── route.ts
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── settings/
│   │   │   └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   │
│   ├── layout.tsx                 # Root layout (fonts, providers, metadata)
│   └── globals.css                # Global styles, CSS variables, glass utilities
│
├── components/
│   ├── portfolio/                 # Portfolio-specific components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── BackgroundOrbs.tsx     # Animated gradient blobs
│   │   ├── GlassCard.tsx          # Reusable glass card component
│   │   ├── SectionHeading.tsx     # Animated section title
│   │   └── ScrollIndicator.tsx
│   │
│   ├── dashboard/                 # Dashboard-specific components
│   │   ├── Sidebar.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DataTable.tsx
│   │   ├── FormModal.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── RichTextEditor.tsx
│   │   ├── ColorPicker.tsx
│   │   └── StatsCard.tsx
│   │
│   └── ui/                        # Shared primitive UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       ├── Select.tsx
│       ├── Badge.tsx
│       ├── Modal.tsx
│       ├── Toast.tsx
│       ├── Skeleton.tsx
│       └── Spinner.tsx
│
├── lib/
│   ├── prisma.ts                  # Prisma client singleton
│   ├── auth.ts                    # NextAuth configuration
│   ├── utils.ts                   # Utility functions (cn, formatDate, etc.)
│   ├── validations.ts             # Zod schemas for all entities
│   └── gsap.ts                    # GSAP registration and shared configs
│
├── hooks/
│   ├── useScrollAnimation.ts      # GSAP ScrollTrigger hook
│   ├── useMousePosition.ts        # For cursor-following effects
│   ├── useTheme.ts                # Dark/light mode hook
│   └── useMediaQuery.ts           # Responsive breakpoint hook
│
├── types/
│   └── index.ts                   # TypeScript interfaces for all entities
│
├── data/
│   └── seed.ts                    # Database seed script with Mohamed's resume data
│
└── styles/
    └── glass.css                  # Glass morphism utility classes
```

---

## Database Schema

### Prisma Models

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// --- Site Settings ---
model SiteSettings {
  id              String   @id @default("settings")
  siteTitle       String   @default("Mohamed Mohy — Frontend Developer")
  metaDescription String   @default("")
  primaryHue      Int      @default(199)
  primarySat      Int      @default(89)
  primaryLight    Int      @default(48)
  secondaryHue    Int      @default(166)
  secondarySat    Int      @default(72)
  secondaryLight  Int      @default(50)
  accentHue       Int      @default(34)
  accentSat       Int      @default(100)
  accentLight     Int      @default(60)
  defaultTheme    String   @default("dark")  // "light" | "dark"
  githubUrl       String   @default("")
  linkedinUrl     String   @default("")
  twitterUrl      String   @default("")
  updatedAt       DateTime @updatedAt
}

// --- Hero Section ---
model Hero {
  id            String   @id @default(cuid())
  headline      String   @default("Mohamed Mohy")
  subtitle      String   @default("Frontend Web Developer")
  tagline       String   @default("Building modern, responsive, and user-focused web applications")
  ctaPrimaryText   String @default("View My Work")
  ctaSecondaryText String @default("Get In Touch")
  resumeUrl     String?
  backgroundUrl String?
  updatedAt     DateTime @updatedAt
}

// --- About Section ---
model About {
  id            String   @id @default(cuid())
  summary       String   @db.Text
  photoUrl      String?
  yearsExp      Int      @default(3)
  totalProjects Int      @default(20)
  totalCompanies Int     @default(5)
  updatedAt     DateTime @updatedAt
}

// --- Skills ---
model Skill {
  id         String   @id @default(cuid())
  name       String
  icon       String?            // Icon name or URL
  category   String             // "Languages", "Frameworks", "Styling", etc.
  order      Int      @default(0)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

// --- Work Experience ---
model Experience {
  id          String   @id @default(cuid())
  company     String
  companyLogo String?
  title       String
  location    String
  workType    String             // "Remote", "On-site", "Freelance"
  startDate   DateTime
  endDate     DateTime?          // null = current
  description String[]           // Array of bullet points
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// --- Projects ---
model Project {
  id           String   @id @default(cuid())
  slug         String   @unique
  title        String
  shortDesc    String
  fullDesc     String?  @db.Text
  thumbnailUrl String?
  screenshots  String[]           // Array of image URLs
  techStack    String[]           // Array of tech names
  company      String?
  role         String?
  challenges   String?  @db.Text
  liveUrl      String?
  repoUrl      String?
  featured     Boolean  @default(false)
  order        Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

// --- Education ---
model Education {
  id           String   @id @default(cuid())
  institution  String
  degree       String
  field        String
  graduationDate DateTime?
  logoUrl      String?
  order        Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

// --- Certifications ---
model Certification {
  id          String   @id @default(cuid())
  title       String
  issuer      String
  issueDate   DateTime?
  credUrl     String?
  logoUrl     String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// --- Contact Messages ---
model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}

// --- Media Library ---
model Media {
  id        String   @id @default(cuid())
  url       String
  filename  String
  mimeType  String
  size      Int
  alt       String?
  createdAt DateTime @default(now())
}

// --- Admin User ---
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String               // Hashed with bcrypt
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Animation Strategy

### GSAP Plugins Used

| Plugin | Usage |
|---|---|
| **ScrollTrigger** | Trigger animations on scroll for every section |
| **SplitText** (Club) | Split hero headline into characters for letter-by-letter reveal |
| **MorphSVG** (Club) | Morph theme toggle icon (sun ↔ moon) |
| **Flip** | Smooth layout animations for project filter transitions |

> Note: If GSAP Club plugins are not available, use free alternatives:
> - SplitText → manual `<span>` wrapping per character
> - MorphSVG → CSS transitions or Framer Motion for icon morph

### Animation Catalog

| Element | Animation | Trigger |
|---|---|---|
| **Hero headline** | Characters fade in and slide up, staggered 0.03s | Page load |
| **Hero subtitle** | Fade up after headline completes | Page load (delayed) |
| **Hero CTA buttons** | Scale from 0.8 to 1, fade in | Page load (delayed) |
| **Background orbs** | Continuous slow float using `gsap.to()` with `yoyo: true, repeat: -1` | Always running |
| **Navbar** | Background blur increases on scroll | Scroll position |
| **Section headings** | Slide up + fade in with underline drawing | ScrollTrigger (enter viewport) |
| **Glass cards** | Fade up + slight scale, staggered within grid | ScrollTrigger |
| **Skill pills** | Pop in with elastic ease, staggered | ScrollTrigger |
| **Timeline cards** | Slide in from left/right alternately | ScrollTrigger |
| **Project cards** | Stagger fade up; on hover: lift + glow increase | ScrollTrigger + hover |
| **Project filter** | GSAP Flip for layout reflow | Filter button click |
| **Stats counters** | Count up from 0 to target number | ScrollTrigger |
| **Contact form inputs** | Stagger fade in from bottom | ScrollTrigger |
| **Cursor glow** | Radial gradient follows cursor position | Mouse move (GSAP quickTo) |
| **Card edge light** | Bright line moves along card border following cursor | Mouse move over card |
| **Page transitions** | Fade out current → fade in next (for project detail page) | Route change |
| **Scroll progress** | Thin line at top of page grows from left to right | Scroll position |

### Performance Considerations

- Use `will-change: transform` only during active animations
- Use `gsap.matchMedia()` to disable heavy animations on mobile/reduced-motion
- Respect `prefers-reduced-motion` media query — fall back to simple fades
- Use `ScrollTrigger.batch()` for grid items to reduce ScrollTrigger instances
- Lazy-register GSAP plugins in a client component to avoid SSR issues

---

## Responsive Design

### Breakpoints (Tailwind v4 defaults)

| Breakpoint | Width | Layout Changes |
|---|---|---|
| `sm` | 640px | Stack cards, hide desktop nav, show hamburger |
| `md` | 768px | 2-column grids, timeline switches to single-column |
| `lg` | 1024px | Full desktop layout, sidebar nav in dashboard |
| `xl` | 1280px | Max content width, larger cards |
| `2xl` | 1536px | Extended spacing, hero gets bigger |

### Mobile Considerations

- Touch-friendly tap targets (min 44px)
- Simplified animations (reduce parallax, disable cursor effects)
- Swipeable project gallery (GSAP Draggable or touch events)
- Bottom sheet for project details instead of modal
- Collapsible sections for long content

---

## Deployment

### Recommended: Vercel

- **Platform**: Vercel (optimal for Next.js)
- **Database**: Neon PostgreSQL (serverless, free tier available)
- **Image CDN**: Cloudinary or Uploadthing
- **Email**: Resend (free tier: 100 emails/day)
- **Domain**: Custom domain via Vercel

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://mohamedmohy.dev"

# Image Upload
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Email
RESEND_API_KEY="..."

# App
NEXT_PUBLIC_SITE_URL="https://mohamedmohy.dev"
```

### Build & Deploy Commands

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate deploy

# Seed database with initial data
pnpm prisma db seed

# Build
pnpm build

# Start (production)
pnpm start
```

---

## Implementation Phases

### Phase 1: Foundation (Days 1-2)
- [x] Initialize Next.js 16 project with TypeScript and Tailwind v4
- [ ] Set up project folder structure
- [ ] Configure fonts (Space Grotesk, Inter, JetBrains Mono)
- [ ] Create CSS variable system with color theming
- [ ] Build glass morphism utility classes and `GlassCard` component
- [ ] Set up dark/light mode with `next-themes`
- [ ] Install and configure GSAP with ScrollTrigger
- [ ] Create `BackgroundOrbs` animated component
- [ ] Build responsive `Navbar` with glass effect

### Phase 2: Portfolio Sections (Days 3-5)
- [ ] Hero section with GSAP text reveal and CTA buttons
- [ ] About section with photo, summary, and animated counters
- [ ] Skills section with categorized glass pill grid
- [ ] Experience section with animated timeline
- [ ] Projects gallery with filter bar, cards, and detail view
- [ ] Education section with cards
- [ ] Contact section with form (frontend only first)
- [ ] Footer with social links and back-to-top

### Phase 3: Backend & Database (Days 6-7)
- [ ] Set up Prisma with PostgreSQL
- [ ] Define all database models and run migrations
- [ ] Create seed script with Mohamed's resume data
- [ ] Build API routes for all CRUD operations
- [ ] Set up image upload (Cloudinary/Uploadthing)
- [ ] Set up contact form email sending (Resend)
- [ ] Connect portfolio frontend to API (fetch data dynamically)

### Phase 4: Admin Dashboard (Days 8-10)
- [ ] Set up NextAuth.js with credentials provider
- [ ] Build dashboard layout (sidebar, header)
- [ ] Dashboard overview page with stats
- [ ] Hero section editor
- [ ] About section editor with image upload
- [ ] Skills CRUD with drag-and-drop reordering
- [ ] Experience CRUD with rich text
- [ ] Projects CRUD with multi-image upload
- [ ] Education & Certifications CRUD
- [ ] Contact messages inbox
- [ ] Site settings page (colors, theme, social links)
- [ ] Media library

### Phase 5: Polish & Deploy (Days 11-12)
- [ ] Fine-tune all GSAP animations and timings
- [ ] Performance optimization (lazy loading, image optimization)
- [ ] SEO: meta tags, Open Graph, structured data
- [ ] Accessibility audit (ARIA, keyboard nav, contrast)
- [ ] Cross-browser testing
- [ ] Mobile testing and refinement
- [ ] Deploy to Vercel
- [ ] Connect custom domain
- [ ] Final QA pass

---

## Seed Data Summary (From Resume)

This data will be used to pre-populate the database on first deploy:

- **Name**: Mohamed Mohy
- **Location**: Cairo, Egypt
- **Email**: mohy.web@gmail.com
- **Phone**: +20 155 355 2663
- **Title**: Frontend Web Developer
- **Experience**: 3+ years
- **Companies**: SmartiveMedia, Trugraph, MassFluence, Amyal Smart, Fleetrun
- **Education**: Bachelor's in Management Information System — Obour Institute (June 2025)
- **Certification**: React Development Cross-Skilling — Udacity
- **Core Skills**: JavaScript, TypeScript, React.js, Next.js, Vite.js, Tailwind CSS, Material UI, Chakra UI, Ant Design, Redux Toolkit, Context API, TanStack Query, SWR, Formik, RESTful APIs, HTML, CSS

---

## Notes for Implementation

1. **Do NOT use purple** as any default color — stick with sky blue / teal / amber palette
2. **All content is dynamic** — fetched from DB via API routes, never hardcoded in components
3. **GSAP must be client-side only** — use `"use client"` directive and dynamic imports where needed
4. **Glass effects should degrade gracefully** — if `backdrop-filter` is unsupported, fall back to solid semi-transparent backgrounds
5. **The dashboard uses the same glass design** as the portfolio for visual consistency
6. **Images should always be optimized** via `next/image` with responsive sizes
7. **Every section has an `id`** for smooth scroll navigation from the navbar
8. **API routes are protected** — all `/api/*` mutation endpoints (POST, PUT, DELETE) require authentication middleware except `/api/contact` (public POST for form submission)
