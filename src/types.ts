export type Subject = {
  id: string;
  code: string;
  name: string;
  coef: number;
  progress: number;
  status: "todo" | "doing" | "done";
};

export type CourseSlot = {
  id: string;
  subjectId: string;
  day: string;
  start: string;
  end: string;
  teacher: string;
  room: string;
  group: string;
};

export type Exam = {
  id: string;
  subjectId: string;
  title: string;
  type: "exam" | "quiz";
  date: string;
};