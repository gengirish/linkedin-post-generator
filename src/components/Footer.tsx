export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(124,58,237,0.1)", marginTop: "80px", padding: "40px 16px", textAlign: "center" }}>
      <p className="text-sm" style={{ color: "#64748b" }}>
        Built by{" "}
        <a href="https://www.intelliforge.tech" target="_blank" rel="noopener noreferrer" style={{ color: "#a78bfa" }}>IntelliForge AI</a>
        {" · "}
        <a href="https://learning.intelliforge.tech" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b" }}>learning.intelliforge.tech</a>
        {" · "}
        <a href="https://chat.whatsapp.com/LDqzLHYMlhg9GiO0yRrUOS?mode=gi_t" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b" }}>Join BuildwithAiGiri</a>
      </p>
    </footer>
  );
}
