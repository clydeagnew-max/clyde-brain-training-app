import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { exercises } from "../data/exercises";

export default function ProgressGraph() {
  const [domainData, setDomainData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("clyde-exercise-logs") || "{}");
    const byDomain = {};
    exercises.forEach((e) => { byDomain[e.domain] = { correct: 0, total: 0, time: 0 }; });
    Object.values(raw).forEach(({ correct, elapsed, domain }) => {
      if (byDomain[domain]) { byDomain[domain].total++; if (correct) byDomain[domain].correct++; byDomain[domain].time += elapsed; }
    });
    setDomainData(Object.entries(byDomain).map(([name, d]) => ({ name, accuracy: d.total ? Math.round((d.correct / d.total) * 100) : 0, time: Math.round(d.time / 60) })));
    const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d.toISOString().split("T")[0]; });
    const byDay = {};
    days.forEach((d) => { byDay[d] = { date: d.slice(5), correct: 0, total: 0 }; });
    Object.values(raw).forEach(({ correct, date }) => { const day = date.split("T")[0]; if (byDay[day]) { byDay[day].total++; if (correct) byDay[day].correct++; } });
    setWeeklyData(Object.values(byDay).map((d) => ({ date: d.date, accuracy: d.total ? Math.round((d.correct / d.total) * 100) : 0 })));
  }, []);
  const tt = { contentStyle: { background: "#1e293b", border: "none", color: "#fff" } };
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
        <h3 className="text-blue-200 font-semibold mb-4">Accuracy by Domain</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={domainData}>
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 100]} />
            <Tooltip {...tt} />
            <Bar dataKey="accuracy" fill="#3b82f6" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
        <h3 className="text-blue-200 font-semibold mb-4">Weekly Accuracy Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 100]} />
            <Tooltip {...tt} />
            <Line type="monotone" dataKey="accuracy" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
        <h3 className="text-blue-200 font-semibold mb-3">Time Spent per Domain (min)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={domainData}>
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip {...tt} />
            <Bar dataKey="time" fill="#64748b" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
