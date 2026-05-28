import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "BIST – British International School of Tabuk",
  description: "Outstanding British international education in Tabuk for ages 2-18. British Curriculum & IB Diploma.",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var savedTheme = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = savedTheme || (prefersDark ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
                document.documentElement.style.colorScheme = theme;
              } catch (error) {}
            })();
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden bg-white text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
