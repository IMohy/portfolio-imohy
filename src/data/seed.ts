import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─── Admin User ────────────────────────────────────────────────
  const hashedPassword = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "mohy.web@gmail.com" },
    update: {},
    create: {
      email: "mohy.web@gmail.com",
      password: hashedPassword,
      name: "Mohamed Mohy",
    },
  });
  console.log("✅ Admin user");

  // ─── Site Settings ─────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: {},
    create: {
      id: "settings",
      siteTitle: "Mohamed Mohy — Frontend Developer",
      metaDescription:
        "Frontend web developer with 3+ years of experience building modern, responsive, and user-focused web applications.",
      primaryHue: 199,
      primarySat: 89,
      primaryLight: 48,
      secondaryHue: 166,
      secondarySat: 72,
      secondaryLight: 50,
      accentHue: 34,
      accentSat: 100,
      accentLight: 60,
      defaultTheme: "dark",
      githubUrl: "https://github.com/mohamedmohy",
      linkedinUrl: "https://linkedin.com/in/mohamedmohy",
      twitterUrl: "",
    },
  });
  console.log("✅ Site settings");

  // ─── Hero Section ──────────────────────────────────────────────
  const existingHero = await prisma.hero.findFirst();
  if (!existingHero) {
    await prisma.hero.create({
      data: {
        headline: "Mohamed Mohy",
        subtitle: "Frontend Web Developer",
        tagline:
          "Building modern, responsive, and user-focused web applications",
        ctaPrimaryText: "View My Work",
        ctaSecondaryText: "Get In Touch",
      },
    });
  }
  console.log("✅ Hero section");

  // ─── About Section ─────────────────────────────────────────────
  const existingAbout = await prisma.about.findFirst();
  if (!existingAbout) {
    await prisma.about.create({
      data: {
        summary:
          "Frontend web developer with 3+ years of experience building modern, responsive, and user-focused web applications. Skilled in React.js, Next.js, Vite.js, and TypeScript, with a strong background in developing dashboards, e-commerce platforms, and scalable UI components. Experienced in collaborating with cross-functional teams and delivering high-quality, maintainable frontend solutions aligned with business requirements.",
        yearsExp: 3,
        totalProjects: 20,
        totalCompanies: 5,
      },
    });
  }
  console.log("✅ About section");

  // ─── Skills ────────────────────────────────────────────────────
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    const skills = [
      // Languages
      { name: "JavaScript (ES6+)", category: "Languages", order: 0 },
      { name: "TypeScript", category: "Languages", order: 1 },
      { name: "HTML5", category: "Languages", order: 2 },
      { name: "CSS3", category: "Languages", order: 3 },
      // Frameworks
      { name: "React.js", category: "Frameworks", order: 0 },
      { name: "Next.js", category: "Frameworks", order: 1 },
      { name: "Vite.js", category: "Frameworks", order: 2 },
      // Styling
      { name: "Tailwind CSS", category: "Styling", order: 0 },
      { name: "Material UI", category: "Styling", order: 1 },
      { name: "Chakra UI", category: "Styling", order: 2 },
      { name: "Ant Design", category: "Styling", order: 3 },
      // State Management
      { name: "Redux Toolkit", category: "State Management", order: 0 },
      { name: "Context API", category: "State Management", order: 1 },
      { name: "Zustand", category: "State Management", order: 2 },
      // Data Fetching
      { name: "TanStack Query", category: "Data Fetching", order: 0 },
      { name: "SWR", category: "Data Fetching", order: 1 },
      { name: "RESTful APIs", category: "Data Fetching", order: 2 },
      // Forms & Validation
      { name: "Formik", category: "Forms & Validation", order: 0 },
      { name: "React Hook Form", category: "Forms & Validation", order: 1 },
      { name: "Zod", category: "Forms & Validation", order: 2 },
      // Tools
      { name: "Git & GitHub", category: "Tools", order: 0 },
      { name: "Figma", category: "Tools", order: 1 },
      { name: "VS Code", category: "Tools", order: 2 },
      { name: "Vercel", category: "Tools", order: 3 },
    ];

    await prisma.skill.createMany({ data: skills });
  }
  console.log("✅ Skills");

  // ─── Experience ────────────────────────────────────────────────
  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    const experiences = [
      {
        company: "Fleetrun",
        title: "Frontend Web Developer",
        location: "Saudi Arabia",
        workType: "Freelance",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-09-01"),
        description: [
          "Automated responsive images, WebP formats, and dynamic sizing to reduce load times",
          "Reduced initial page load time by 60% via code-splitting, lazy loading, and caching",
          "Developed scalable, reusable component architecture with React and TypeScript",
        ],
        order: 0,
      },
      {
        company: "Amyal Smart",
        title: "Frontend Web Developer",
        location: "Saudi Arabia",
        workType: "Remote",
        startDate: new Date("2024-02-01"),
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
        company: "MassFluence",
        title: "Front-End Web Developer",
        location: "Lebanon",
        workType: "Freelance",
        startDate: new Date("2023-10-01"),
        endDate: new Date("2024-03-01"),
        description: [
          "Developed web applications, corporate dashboards, and interactive charts",
          "Created responsive Learning Management Systems (LMS) tailored to client needs",
          "Ensured high performance and scalability",
        ],
        order: 2,
      },
      {
        company: "Trugraph",
        title: "Front-End Web Developer",
        location: "Egypt",
        workType: "On-site",
        startDate: new Date("2022-12-01"),
        endDate: new Date("2024-02-01"),
        description: [
          "Improved codebase by fixing bugs, refactoring components, improving readability",
          "Worked closely with backend engineers and designers",
          "Implemented caching strategies (HTTP caching, SWR, React Query) — 40% less API load time",
        ],
        order: 3,
      },
      {
        company: "SmartiveMedia",
        title: "Front-End Web Developer",
        location: "Saudi Arabia",
        workType: "Remote",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-12-01"),
        description: [
          "Built real estate and e-commerce web apps using Next.js, Material-UI, Ant Design",
          "Developed Shopify-integrated platforms with Next.js, TypeScript, Tailwind CSS",
          "Focused on accessibility and performance",
        ],
        order: 4,
      },
    ];

    await prisma.experience.createMany({ data: experiences });
  }
  console.log("✅ Experience");

  // ─── Projects ──────────────────────────────────────────────────
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const projects = [
      {
        slug: "fleetrun-fleet-management",
        title: "Fleetrun Fleet Management",
        shortDesc:
          "Real-time fleet tracking and management platform for logistics companies.",
        fullDesc:
          "A comprehensive fleet management web application for tracking vehicles in real-time, managing drivers, and generating performance reports. Built with React, TypeScript, and integrated with mapping APIs for live tracking.",
        techStack: [
          "React.js",
          "TypeScript",
          "Tailwind CSS",
          "REST API",
          "Leaflet",
        ],
        company: "Fleetrun",
        role: "Frontend Developer",
        challenges:
          "Optimized real-time map rendering with thousands of vehicle markers using clustering and viewport-based loading, reducing memory usage by 70%.",
        featured: true,
        order: 0,
      },
      {
        slug: "amyal-smart-dashboard",
        title: "Amyal Smart Dashboard",
        shortDesc:
          "Admin dashboard for managing deliveries, products, and warehouse storage.",
        fullDesc:
          "A feature-rich admin dashboard built with Next.js and Vite.js for managing logistics operations including delivery tracking, product storage, and performance analytics with real-time data updates.",
        techStack: [
          "Next.js",
          "Vite.js",
          "TypeScript",
          "Tailwind CSS",
          "TanStack Query",
        ],
        company: "Amyal Smart",
        role: "Frontend Developer",
        challenges:
          "Implemented complex real-time delivery tracking with WebSocket integration and built a drag-and-drop warehouse management interface.",
        featured: true,
        order: 1,
      },
      {
        slug: "massfluence-lms",
        title: "MassFluence LMS Platform",
        shortDesc:
          "Learning Management System with interactive courses and progress tracking.",
        fullDesc:
          "A fully responsive LMS platform enabling organizations to create, manage, and deliver online courses. Features include progress tracking, quiz management, certificate generation, and detailed analytics dashboards.",
        techStack: [
          "React.js",
          "Material UI",
          "Redux Toolkit",
          "REST API",
          "Chart.js",
        ],
        company: "MassFluence",
        role: "Frontend Developer",
        challenges:
          "Built a custom video player with progress bookmarking and designed interactive quiz components with real-time scoring.",
        featured: true,
        order: 2,
      },
      {
        slug: "trugraph-analytics-dashboard",
        title: "Trugraph Analytics Dashboard",
        shortDesc:
          "Corporate analytics dashboard with interactive data visualizations.",
        fullDesc:
          "An enterprise analytics dashboard featuring interactive charts, real-time data monitoring, and customizable reporting. Refactored legacy codebase for improved performance and maintainability.",
        techStack: [
          "React.js",
          "TypeScript",
          "Ant Design",
          "SWR",
          "Recharts",
        ],
        company: "Trugraph",
        role: "Frontend Developer",
        challenges:
          "Refactored legacy class components to modern hooks-based architecture and implemented caching strategies that reduced API calls by 40%.",
        featured: false,
        order: 3,
      },
      {
        slug: "smartivemedia-real-estate",
        title: "SmartiveMedia Real Estate Platform",
        shortDesc:
          "Real estate listing and e-commerce web application with property search.",
        fullDesc:
          "A full-featured real estate platform with advanced property search, filtering, map-based browsing, and integrated payment system. Built with Next.js for optimal SEO and Shopify integration for e-commerce capabilities.",
        techStack: [
          "Next.js",
          "TypeScript",
          "Material UI",
          "Shopify API",
          "Tailwind CSS",
        ],
        company: "SmartiveMedia",
        role: "Frontend Developer",
        challenges:
          "Integrated Shopify storefront API with custom Next.js frontend and implemented server-side rendering for property pages to improve SEO.",
        featured: false,
        order: 4,
      },
      {
        slug: "portfolio-website",
        title: "Personal Portfolio",
        shortDesc:
          "This portfolio website — built with Next.js, Prisma, and GSAP animations.",
        fullDesc:
          "A modern portfolio website featuring glassmorphism design, smooth GSAP animations, an admin dashboard for content management, and PostgreSQL-backed data storage with Prisma ORM.",
        techStack: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Prisma",
          "PostgreSQL",
          "GSAP",
        ],
        role: "Full-Stack Developer",
        repoUrl: "https://github.com/mohamedmohy/portfolio-next",
        featured: true,
        order: 5,
      },
    ];

    await prisma.project.createMany({ data: projects });
  }
  console.log("✅ Projects");

  // ─── Education ─────────────────────────────────────────────────
  const eduCount = await prisma.education.count();
  if (eduCount === 0) {
    await prisma.education.create({
      data: {
        institution: "Obour Institute",
        degree: "Bachelor's Degree",
        field: "Management Information System",
        graduationDate: new Date("2025-06-01"),
        order: 0,
      },
    });
  }
  console.log("✅ Education");

  // ─── Certifications ────────────────────────────────────────────
  const certCount = await prisma.certification.count();
  if (certCount === 0) {
    await prisma.certification.create({
      data: {
        title: "React Development Cross-Skilling",
        issuer: "Udacity",
        order: 0,
      },
    });
  }
  console.log("✅ Certifications");

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
