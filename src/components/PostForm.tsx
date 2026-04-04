"use client";
import { useState } from "react";

const COURSES = [
  "Software Engineering with Gen AI",
];

interface FormData {
  name: string;
  course: string;
  takeaway: string;
  beforeAfter: string;
  tone: string;
}

interface Props {
  onGenerate: (data: FormData) => void;
  loading: boolean;
}

export default function PostForm({ onGenerate, loading }: Props) {
  const [form, setForm] = useState<FormData>({
    name: "", course: "", takeaway: "", beforeAfter: "", tone: "professional"
  });

  const valid = form.name.trim() && form.course && form.takeaway.trim();

  const handle = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: "10px", outline: "none",
    backgroundColor: "rgba(15,15,35,0.8)", color: "#e2e8f0", fontSize: "15px",
    border: "1px solid rgba(124,58,237,0.3)", transition: "border 0.2s",
  };
  const labelStyle = { display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#a78bfa" } as React.CSSProperties;

  return (
    <div className="rounded-2xl p-8" style={{ background: "rgba(15,15,35,0.6)", border: "1px solid rgba(124,58,237,0.2)", backdropFilter: "blur(16px)" }}>
      <h2 className="text-xl font-bold text-white mb-6">Your Training Experience</h2>
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label style={labelStyle}>Your Name *</label>
          <input style={inputStyle} placeholder="e.g. Priya Sharma" value={form.name} onChange={handle("name")} />
        </div>

        {/* Course */}
        <div>
          <label style={labelStyle}>Course / Training Attended *</label>
          <select style={inputStyle} value={form.course} onChange={handle("course")}>
            <option value="">Select your training...</option>
            {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Takeaway */}
        <div>
          <label style={labelStyle}>Your Biggest Takeaway *</label>
          <textarea
            style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
            placeholder="e.g. I now understand how to build RAG pipelines from scratch and can apply it to our customer support bot..."
            value={form.takeaway}
            onChange={handle("takeaway")}
          />
          <p className="mt-1 text-xs" style={{ color: "#64748b" }}>Tip: Be specific — what did you learn that you didn&apos;t know before?</p>
        </div>

        {/* Before/After (optional) */}
        <div>
          <label style={labelStyle}>Before → After (optional)</label>
          <input
            style={inputStyle}
            placeholder="e.g. Before: manually reading docs. After: AI agent does it in seconds"
            value={form.beforeAfter}
            onChange={handle("beforeAfter")}
          />
        </div>

        {/* Tone */}
        <div>
          <label style={labelStyle}>Post Tone</label>
          <div className="flex gap-3">
            {["professional", "casual", "inspiring"].map(t => (
              <button key={t} type="button"
                onClick={() => setForm(f => ({ ...f, tone: t }))}
                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all"
                style={{
                  border: `1px solid ${form.tone === t ? "#7c3aed" : "rgba(124,58,237,0.2)"}`,
                  background: form.tone === t ? "rgba(124,58,237,0.2)" : "transparent",
                  color: form.tone === t ? "#a78bfa" : "#64748b",
                  cursor: "pointer",
                }}>
                {t === "professional" ? "💼 Professional" : t === "casual" ? "😊 Casual" : "🚀 Inspiring"}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={() => valid && onGenerate(form)}
          disabled={!valid || loading}
          className="w-full py-4 rounded-xl font-bold text-lg transition-all mt-2"
          style={{
            background: valid && !loading ? "linear-gradient(135deg,#7c3aed,#5b21b6)" : "rgba(124,58,237,0.2)",
            color: valid && !loading ? "white" : "#64748b",
            cursor: valid && !loading ? "pointer" : "not-allowed",
            boxShadow: valid && !loading ? "0 0 30px rgba(124,58,237,0.3)" : "none",
          }}>
          {loading ? "✨ Generating your posts..." : "✨ Generate LinkedIn Posts"}
        </button>
      </div>
    </div>
  );
}
