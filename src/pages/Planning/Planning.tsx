import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { CourseSlot, Subject } from "../../types";
import { initialSubjects } from "../../data";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export default function Planning() {
  const [subjects] = useLocalStorage<Subject[]>("subjects", initialSubjects);
  const [slots, setSlots] = useLocalStorage<CourseSlot[]>("slots", []);

  const [subjectId, setSubjectId] = useState("");
  const [day, setDay] = useState(days[0]);
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("10:00");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [group, setGroup] = useState("");

  function addSlot() {
    if (end <= start) {
      alert("L'heure de fin doit être après l'heure de début.");
      return;
    }
    const next: CourseSlot = {
      id: crypto.randomUUID(),
      subjectId: subjectId || subjects[0]?.id || "",
      day,
      start,
      end,
      teacher: teacher.trim(),
      room: room.trim(),
      group: group.trim(),
    };
    setSlots([...slots, next]);
    setTeacher("");
    setRoom("");
  }

  function removeSlot(id: string) {
    setSlots(slots.filter((s) => s.id !== id));
  }

  function subjectName(id: string) {
    return subjects.find((s) => s.id === id)?.name ?? "—";
  }

  return (
    <>
      <h1>Planning & Emploi</h1>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3>+ Cours</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <input
            className="input"
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            className="input"
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <input
            className="input"
            placeholder="Professeur"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
          />
          <input
            className="input"
            placeholder="Salle"
            style={{ width: 90 }}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            className="input"
            placeholder="Groupe"
            style={{ width: 90 }}
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
          <button className="btn" onClick={addSlot}>
            Ajouter
          </button>
        </div>
      </div>

      <div className="week">
        {days.map((d) => {
          const daySlots = slots
            .filter((s) => s.day === d)
            .sort((a, b) => a.start.localeCompare(b.start));
          return (
            <div key={d} className="card">
              <h3 style={{ marginTop: 0 }}>{d}</h3>
              {daySlots.length === 0 ? (
                <p style={{ color: "var(--muted)", fontSize: 12 }}>Aucun cours</p>
              ) : (
                daySlots.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ color: "#3b6cff", fontSize: 12 }}>
                      {s.start} - {s.end}
                    </div>
                    <strong>{subjectName(s.subjectId)}</strong>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>
                      {[s.teacher, s.room, s.group].filter(Boolean).join(" · ")}
                    </div>
                    <button
                      className="btn danger"
                      style={{ padding: "4px 8px", marginTop: 6, fontSize: 11 }}
                      onClick={() => removeSlot(s.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}