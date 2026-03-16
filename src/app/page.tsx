"use client";
import { useState } from "react";
import PostForm from "@/components/PostForm";
import PostVariants from "@/components/PostVariants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [posts, setPosts] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleGenerate = async (data: any) => {
    setLoading(true);
    setFormData(data);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setPosts(json.posts);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setPosts(null); setFormData(null); };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#030014", color: "#e2e8f0" }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6"
            style={{ border: "1px solid rgba(124,58,237,0.4)", background: "rgba(124,58,237,0.08)", color: "#a78bfa" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#34d399" }} />
            Share your AI learning journey
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Turn Your Training Into{" "}
            <span style={{ background: "linear-gradient(135deg,#7c3aed,#00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              LinkedIn Gold
            </span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
            Attended an IntelliForge AI training? Generate a professional LinkedIn post in seconds — share your experience, inspire your network.
          </p>
        </div>

        {/* Form or Results */}
        {!posts ? (
          <PostForm onGenerate={handleGenerate} loading={loading} />
        ) : (
          <PostVariants posts={posts} formData={formData} onReset={handleReset} />
        )}
      </main>
      <Footer />
    </div>
  );
}
