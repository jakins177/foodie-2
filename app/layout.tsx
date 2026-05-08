import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutriLens - AI Calorie Tracker",
  description: "Mobile-first mock AI calorie tracking experience built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
