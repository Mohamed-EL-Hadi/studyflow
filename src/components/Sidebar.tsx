import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/matieres", label: "Mes matières" },
  { to: "/planning", label: "Planning & Emploi" },
  { to: "/examens", label: "Examens & Tests" },
];

export default function Sidebar() {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("theme", "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <aside className="sidebar">
      <h2>StudyFlow</h2>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end
          style={({ isActive }) => ({
            display: "block",
            padding: "10px 12px",
            borderRadius: 10,
            marginBottom: 6,
            textDecoration: "none",
            color: isActive ? "#fff" : "var(--muted)",
            background: isActive ? "#3b6cff" : "transparent",
          })}
        >
          {l.label}
        </NavLink>
      ))}
      <button
        className="btn theme-btn"
        style={{ marginTop: 16, width: "100%" }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "☀ Mode clair" : "🌙 Mode sombre"}
      </button>
    </aside>
  );
}