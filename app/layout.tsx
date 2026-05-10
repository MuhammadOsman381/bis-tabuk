import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BISJ – British International School of Tabuk",
  description: "Outstanding British international education in Jeddah for ages 2-18. British Curriculum & IB Diploma.",
  icons: {
    icon: "./Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}