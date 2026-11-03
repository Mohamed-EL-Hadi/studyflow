import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Subject } from "../types";
import { initialSubjects } from "../data";

function statusOf(progress: number): Subject["status"] {
  if (progress >= 100) return "done";
  if (progress > 0) return "doing";
  return "todo";
}

export default function Subjects() {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>("subjects", initialSubjects);
  const [name, setName] = useState("");
  const [coef, setCoef] = useState(1);

  function addSubject() {
    if (!name.trim()) return;
    const next: Subject = {
      id: crypto.randomUUID(),
      code: "M" + (subjects.length + 1),
      name: name.trim(),
      coef,
      progress: 0,
      status: "todo",
    };
    setSubjects([...subjects, next]);
    setName("");
    setCoef(1);
  }

  function updateProgress(id: string, progress: number) {
    setSubjects(
      subjects.map((s) =>
        s.id === id ? { ...s, progress, status: statusOf(progress) } : s
      )
    );
  }

  function removeSubject(id: string) {
    setSubjects(subjects.filter((s) => s.id !== id));
  }

  return (
    <>
      <h1>Mes matières</h1>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3>+ Matière</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            className="input"
            placeholder="Nom de la matière"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input"
            type="number"
            min={1}
            style={{ width: 80 }}
            value={coef}
            onChange={(e) => setCoef(Number(e.target.value))}
          />
          <button className="btn" onClick={addSubject}>Ajouter</button>
        </div>
      </div>

      {subjects.map((s) => (
        <div key={s.id} className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{s.code} · {s.name}</strong>
            <span style={{ color: "var(--muted)" }}>Coef {s.coef}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <input
              type="range"
              min={0}
              max={100}
              value={s.progress}
              onChange={(e) => updateProgress(s.id, Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ width: 40 }}>{s.progress}%</span>
            <button className="btn danger" onClick={() => removeSubject(s.id)}>Supprimer</button>
          </div>
        </div>
      ))}
    </>
  );
}