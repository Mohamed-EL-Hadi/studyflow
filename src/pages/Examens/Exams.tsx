import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { Exam, Subject } from "../../types";
import { initialSubjects } from "../../data";

export default function Exams() {
  const [subjects] = useLocalStorage<Subject[]>("subjects", initialSubjects);
  const [exams, setExams] = useLocalStorage<Exam[]>("exams", []);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [type, setType] = useState<Exam["type"]>("exam");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  function addExam() {
    if (!title.trim() || !date) return;
    const next: Exam = {
      id: crypto.randomUUID(),
      subjectId: subjectId || subjects[0]?.id || "",
      title: title.trim(),
      type,
      date,
    };
    setExams([...exams, next]);
    setTitle("");
    setDate("");
  }

  function removeExam(id: string) {
    setExams(exams.filter((e) => e.id !== id));
  }

  function subjectName(id: string) {
    return subjects.find((s) => s.id === id)?.name ?? "—";
  }

  const sorted = [...exams].sort((a, b) => a.date.localeCompare(b.date));

  const renderList = (items: Exam[]) =>
    items.length === 0 ? (
      <p style={{ color: "var(--muted)" }}>Aucun élément programmé.</p>
    ) : (
      items.map((e) => (
        <div
          key={e.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid var(--border)",
            opacity: e.date < today ? 0.65 : 1,
          }}
        >
          <div>
            <strong>{e.title}</strong>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              {subjectName(e.subjectId)} · {e.date}
              {e.date < today ? " (passé)" : ""}
            </div>
          </div>
          <button className="btn danger" onClick={() => removeExam(e.id)}>
            Supprimer
          </button>
        </div>
      ))
    );

  return (
    <>
      <h1>Examens & Tests</h1>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3>+ Examen / Quiz</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            className="input"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="input"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} · {s.name}
              </option>
            ))}
          </select>
          <select
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value as Exam["type"])}
          >
            <option value="exam">Examen</option>
            <option value="quiz">Test / Quiz</option>
          </select>
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn" onClick={addExam}>
            Ajouter
          </button>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Examens proches</h3>
          {renderList(sorted.filter((e) => e.type === "exam"))}
        </div>
        <div className="card">
          <h3>Tests & Quiz proches</h3>
          {renderList(sorted.filter((e) => e.type === "quiz"))}
        </div>
      </div>
    </>
  );
}