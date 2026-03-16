export default function Navbar() {
  return (
    <nav style={{ backgroundColor: "rgba(3,0,20,0.95)", borderBottom: "1px solid rgba(124,58,237,0.15)", backdropFilter: "blur(16px)", position: "sticky", top: 0, zIndex: 50 }}>
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="https://learning.intelliforge.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "white" }}>IF</div>
          <span className="font-semibold text-white">IntelliForge <span style={{ color: "#a78bfa" }}>Learning</span></span>
        </a>
        <a href="https://learning.intelliforge.tech/courses" target="_blank" rel="noopener noreferrer"
          className="text-sm px-4 py-2 rounded-lg transition-all"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}>
          Browse Courses →
        </a>
      </div>
    </nav>
  );
}
