import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Subject ,Exam} from "../types";
import StatCard from "../components/StatCard";
import ProgressRing from "../components/ProgressRing";
import { initialSubjects } from "../data";
import { Link } from "react-router-dom";

export default function Home() {
  const [subjects] = useLocalStorage<Subject[]>("subjects", initialSubjects);

  const total = subjects.length;
  const done = subjects.filter((s) => s.status === "done").length;
  const doing = subjects.filter((s) => s.status === "doing").length;
  const todo = subjects.filter((s) => s.status === "todo").length;
  const totalCoef = subjects.reduce((sum, s) => sum + s.coef, 0);
const [exams] = useLocalStorage<Exam[]>("exams", []);
const today = new Date().toISOString().slice(0, 10);

const upcoming = (type: Exam["type"]) =>
  exams
    .filter((e) => e.type === type && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

const subjectName = (id: string) =>
  subjects.find((s) => s.id === id)?.name ?? "—";

const renderUpcoming = (items: Exam[], empty: string) =>
  items.length === 0 ? (
    <p style={{ color: "var(--muted)" }}>{empty}</p>
  ) : (
    items.map((e) => (
      <div key={e.id} style={{ padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
        <strong>{e.title}</strong>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          {subjectName(e.subjectId)} · {e.date}
        </div>
      </div>
    ))
  );
  return (
    <>
      <h1>Accueil</h1>
      <div className="grid-4">
        <StatCard label="TOTAL" value={total} sub="Matières" color="var(--text)" />
        <StatCard label="TERMINÉ" value={done} sub="Matières finies" color="#22c55e" />
        <StatCard label="EN COURS" value={doing} sub="Progression" color="#f59e0b" />
        <StatCard label="À DÉMARRER" value={todo} sub="Non entamé" color="#3b6cff" />
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Avancement par matière</h3>
        <p style={{ color: "var(--muted)" }}>Total Coef : {totalCoef}</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {subjects.map((s) => (
            <div key={s.id} style={{ textAlign: "center" }}>
              <ProgressRing code={s.code} percent={s.progress} />
              <div style={{ fontSize: 12 }}>{s.name}</div>
              <div style={{ fontSize: 10, color: "var(--muted)" }}>Coef: {s.coef}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid-2" style={{ marginTop: 16 }}>
  <div className="card">
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3 style={{ margin: 0 }}>Examens proches</h3>
      <Link to="/examens" style={{ color: "#3b6cff", fontSize: 12 }}>Voir tout →</Link>
    </div>
    {renderUpcoming(upcoming("exam"), "Aucun examen majeur programmé.")}
  </div>
  <div className="card">
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3 style={{ margin: 0 }}>Tests & Quiz proches</h3>
      <Link to="/examens" style={{ color: "#3b6cff", fontSize: 12 }}>Voir tout →</Link>
    </div>
    {renderUpcoming(upcoming("quiz"), "Aucun quiz / test programmé.")}
  </div>
</div>
    </>
  );
}