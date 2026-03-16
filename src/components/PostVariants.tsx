"use client";
import { useState } from "react";

const POST_LABELS = [
  { emoji: "🎯", label: "Achievement Post", desc: "Celebrate your milestone" },
  { emoji: "💡", label: "Insights Post", desc: "Share what you learned" },
  { emoji: "🚀", label: "Recommendation Post", desc: "Inspire your network" },
];

interface Props {
  posts: string[];
  formData: any;
  onReset: () => void;
}

export default function PostVariants({ posts, formData, onReset }: Props) {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(idx);
    // Log the share
    fetch("/api/shares", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course: formData.course, postIndex: idx, name: formData.name }),
    }).catch(() => {});
    setTimeout(() => setCopied(null), 2000);
  };

  const openLinkedIn = (text: string) => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://learning.intelliforge.tech")}&summary=${encodeURIComponent(text.slice(0, 700))}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      {/* Success banner */}
      <div className="text-center mb-8 p-6 rounded-2xl" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="text-3xl mb-2">🎉</div>
        <h2 className="text-xl font-bold text-white mb-1">Your posts are ready, {formData.name}!</h2>
        <p style={{ color: "#94a3b8" }}>Pick your favourite, copy it, and share on LinkedIn</p>
      </div>

      {/* 3 post variants */}
      <div className="space-y-6">
        {posts.map((post, i) => (
          <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(15,15,35,0.6)", border: "1px solid rgba(124,58,237,0.15)", backdropFilter: "blur(16px)" }}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{POST_LABELS[i]?.emoji}</span>
              <div>
                <div className="font-semibold text-white">{POST_LABELS[i]?.label}</div>
                <div className="text-xs" style={{ color: "#64748b" }}>{POST_LABELS[i]?.desc}</div>
              </div>
            </div>

            {/* Post content */}
            <div className="rounded-xl p-4 mb-4 text-sm leading-relaxed whitespace-pre-wrap"
              style={{ background: "rgba(0,0,0,0.3)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.05)", minHeight: "140px" }}>
              {post}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => copy(post, i)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: copied === i ? "rgba(52,211,153,0.2)" : "rgba(124,58,237,0.2)",
                  border: `1px solid ${copied === i ? "#34d399" : "rgba(124,58,237,0.4)"}`,
                  color: copied === i ? "#34d399" : "#a78bfa",
                  cursor: "pointer",
                }}>
                {copied === i ? "✅ Copied!" : "📋 Copy Post"}
              </button>
              <button
                onClick={() => openLinkedIn(post)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: "rgba(10,102,194,0.15)",
                  border: "1px solid rgba(10,102,194,0.4)",
                  color: "#60a5fa",
                  cursor: "pointer",
                }}>
                🔗 Open LinkedIn
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Actions footer */}
      <div className="mt-8 text-center">
        <button onClick={onReset} className="text-sm transition-colors" style={{ color: "#64748b" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
          onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}>
          ← Generate new posts
        </button>
      </div>
    </div>
  );
}
