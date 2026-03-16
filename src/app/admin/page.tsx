"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/shares").then(r => r.json()).then(setStats);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#030014", color: "#e2e8f0" }}>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">
          📊 Share Analytics
        </h1>
        {!stats ? (
          <p style={{ color: "#64748b" }}>Loading...</p>
        ) : (
          <div className="space-y-8">
            {/* Total */}
            <div className="p-8 rounded-2xl text-center" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
              <div className="text-6xl font-bold font-mono mb-2" style={{ color: "#a78bfa" }}>{stats.total}</div>
              <div className="text-lg" style={{ color: "#94a3b8" }}>LinkedIn posts shared by your learners 🎉</div>
            </div>
            {/* By course */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(15,15,35,0.6)", border: "1px solid rgba(124,58,237,0.1)" }}>
              <h2 className="text-lg font-semibold text-white mb-4">Shares by Course</h2>
              <div className="space-y-3">
                {stats.byCourse.map((r: any) => (
                  <div key={r.course} className="flex items-center justify-between">
                    <span style={{ color: "#94a3b8" }}>{r.course}</span>
                    <span className="font-mono font-bold" style={{ color: "#a78bfa" }}>{r.count}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Recent */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(15,15,35,0.6)", border: "1px solid rgba(124,58,237,0.1)" }}>
              <h2 className="text-lg font-semibold text-white mb-4">Recent Shares</h2>
              <div className="space-y-2">
                {stats.recent.map((r: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 text-sm py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="font-medium" style={{ color: "#e2e8f0" }}>{r.name}</span>
                    <span style={{ color: "#64748b" }}>{r.course}</span>
                    <span className="ml-auto" style={{ color: "#64748b" }}>{new Date(r.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
