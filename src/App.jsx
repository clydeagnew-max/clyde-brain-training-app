import { useState } from "react";
import Dashboard from "./components/Dashboard";
import ExerciseList from "./components/ExerciseList";
import ProgressGraph from "./components/ProgressGraph";
import Reflection from "./components/Reflection";
import ExportPDF from "./components/ExportPDF";
import Notification from "./components/Notification";

const tabs = ["Dashboard", "Exercises", "Progress", "Reflection", "Export"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Notification />
      <header className="bg-blue-950 border-b border-blue-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-200 tracking-wide">🧠 Clyde's Brain Training</h1>
          <p className="text-xs text-slate-400">4-Week Cognitive Performance Plan</p>
        </div>
        <span className="text-xs text-slate-500">{new Date().toDateString()}</span>
      </header>

      <nav className="flex bg-slate-900 border-b border-slate-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors whitespace-nowrap px-2 ${
              activeTab === tab
                ? "bg-blue-900 text-blue-200 border-b-2 border-blue-400"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="max-w-3xl mx-auto p-4">
        {activeTab === "Dashboard"  && <Dashboard />}
        {activeTab === "Exercises"  && <ExerciseList />}
        {activeTab === "Progress"   && <ProgressGraph />}
        {activeTab === "Reflection" && <Reflection />}
        {activeTab === "Export"     && <ExportPDF />}
      </main>
    </div>
  );
}
