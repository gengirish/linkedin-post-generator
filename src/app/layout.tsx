import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Share Your IntelliForge AI Experience | LinkedIn Post Generator",
  description: "Just completed an IntelliForge AI training? Generate a professional LinkedIn post in seconds and share your learning journey with your network.",
  openGraph: {
    title: "Share Your IntelliForge AI Experience",
    description: "Turn your AI training into a LinkedIn post that inspires your network. Free, takes 60 seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`} style={{ backgroundColor: "#030014", color: "#e2e8f0" }}>
        {children}
      </body>
    </html>
  );
}
