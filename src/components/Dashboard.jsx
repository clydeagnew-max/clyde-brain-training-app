import { useState, useEffect } from "react";
import { exercises, domainColors } from "../data/exercises";

export default function Dashboard() {
  const todayKey = new Date().toISOString().split("T")[0];
  const storageKey = `clyde-progress-${todayKey}`;
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, storageKey]);
  const toggle = (id) => setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  const totalTime = exercises.reduce((s, e) => s + e.duration, 0);
  const doneTime = exercises.filter((e) => completed[e.id]).reduce((s, e) => s + e.duration, 0);
  const pct = Math.round((doneTime / totalTime) * 100);
  return (
    <div>
      <div className="bg-blue-950 rounded-xl p-5 mb-5 border border-blue-800">
        <h2 className="text-lg font-bold text-blue-200 mb-1">Good morning, Clyde!</h2>
        <p className="text-slate-400 text-sm mb-3">Today session - {totalTime} min total</p>
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div className="bg-blue-500 h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-slate-400 mt-1">{pct}% complete - {doneTime}/{totalTime} min done</p>
      </div>
      <h3 className="text-sm text-slate-400 uppercase tracking-widest mb-3">Today Exercises</h3>
      <div className="space-y-3">
        {exercises.map((ex) => {
          const colors = domainColors[ex.domain];
          const done = !!completed[ex.id];
          return (
            <div key={ex.id} className={`flex items-center gap-4 rounded-xl p-4 border transition-all ${done ? "border-blue-700 bg-blue-950 opacity-60" : "border-slate-700 bg-slate-900"}`}>
              <input type="checkbox" checked={done} onChange={() => toggle(ex.id)} className="w-5 h-5 accent-blue-500 cursor-pointer" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge} ${colors.text}`}>{ex.domain}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${ex.type === "strength" ? "bg-green-900 text-green-300" : "bg-orange-900 text-orange-300"}`}>{ex.type === "strength" ? "Strength" : "Improvement"}</span>
                </div>
                <p className={`font-medium mt-1 ${done ? "line-through text-slate-500" : "text-white"}`}>{ex.title}</p>
                <p className="text-xs text-slate-400">{ex.duration} min</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
