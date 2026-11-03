import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import Exams from "./pages/Examens/Exams";
import Planning from "./pages/Planning/Planning";

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matieres" element={<Subjects />} />
            <Route path="/examens" element={<Exams />} />
            <Route path="/planning" element={<Planning />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}