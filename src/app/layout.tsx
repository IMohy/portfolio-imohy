import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SafeAreaThemeColor } from "@/components/providers/SafeAreaThemeColor";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export const metadata: Metadata = {
  title: "Mohamed Mohy — Frontend Developer",
  description:
    "Frontend web developer with 3+ years of experience building modern, responsive, and user-focused web applications.",
  openGraph: {
    title: "Mohamed Mohy — Frontend Developer",
    description:
      "Frontend web developer with 3+ years of experience building modern, responsive, and user-focused web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SafeAreaThemeColor />
          <QueryProvider>
            {children}
          </QueryProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px)",
                border: "var(--glass-border)",
                color: "var(--color-text-primary)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
