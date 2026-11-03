import type { Subject } from "./types";

export const initialSubjects: Subject[] = [
  { id: "1", code: "M1", name: "Communication", coef: 4, progress: 0, status: "todo" },
  { id: "2", code: "M2", name: "Anglais", coef: 4, progress: 0, status: "todo" },
  { id: "3", code: "M3", name: "PI", coef: 3, progress: 0, status: "todo" },
  { id: "4", code: "M4", name: "SD & Comp. Algo", coef: 2, progress: 10, status: "doing" },
  { id: "5", code: "M5", name: "Machine learning", coef: 2, progress: 10, status: "doing" },
  { id: "6", code: "M6", name: "POO JAVA", coef: 2, progress: 5, status: "doing" },
];