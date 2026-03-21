import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { exercises } from "../data/exercises";
export default function ExportPDF() {
  const reportRef = useRef();
  const getLogs = () => JSON.parse(localStorage.getItem("clyde-exercise-logs") || "{}");
  const getReflections = () => {
    const entries = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = "clyde-reflection-" + d.toISOString().split("T")[0];
      const val = localStorage.getItem(key);
      if (val) entries.push({ date: d.toDateString(), ...JSON.parse(val) });
    }
    return entries;
  };
  const getDomainStats = () => {
    const raw = getLogs(); const stats = {};
    exercises.forEach((e) => { stats[e.domain] = { correct: 0, total: 0, time: 0 }; });
    Object.values(raw).forEach(({ correct, elapsed, domain }) => { if (stats[domain]) { stats[domain].total++; if (correct) stats[domain].correct++; stats[domain].time += elapsed; } });
    return stats;
  };
  const exportPDF = async () => {
    const canvas = await html2canvas(reportRef.current, { backgroundColor: "#0f172a", scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Clyde-Brain-Training-" + new Date().toISOString().split("T")[0] + ".pdf");
  };
  const stats = getDomainStats();
  const reflections = getReflections();
  return (
    <div>
      <div ref={reportRef} className="bg-slate-950 text-white p-8 w-full">
        <div className="border-b border-blue-700 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-200">Clyde Weekly Brain Training Report</h1>
          <p className="text-slate-400 text-sm mt-1">Generated: {new Date().toDateString()}</p>
        </div>
        <h2 className="text-blue-300 font-semibold mb-3">Domain Performance</h2>
        <table className="w-full text-sm mb-8">
          <thead><tr className="text-slate-400"><th className="text-left py-2">Domain</th><th className="text-left py-2">Type</th><th className="text-left py-2">Accuracy</th><th className="text-left py-2">Attempts</th></tr></thead>
          <tbody>
            {exercises.map((ex) => {
              const s = stats[ex.domain] || { correct: 0, total: 0 };
              const acc = s.total ? Math.round((s.correct / s.total) * 100) + "%" : "No data";
              return (
                <tr key={ex.id} className="border-b border-slate-800">
                  <td className="py-2 text-white">{ex.domain}</td>
                  <td className="py-2"><span className={"text-xs px-2 py-0.5 rounded-full " + (ex.type === "strength" ? "bg-green-900 text-green-300" : "bg-orange-900 text-orange-300")}>{ex.type}</span></td>
                  <td className="py-2 text-blue-300 font-bold">{acc}</td>
                  <td className="py-2 text-slate-300">{s.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {reflections.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-blue-300 font-semibold mb-2">Reflection Log</h2>
            {reflections.map((r, i) => (
              <div key={i} className="bg-slate-900 rounded-xl p-3 border border-slate-700">
                <p className="text-xs text-slate-400">{r.date} - Mood: {r.mood || "not set"}</p>
                {r.mistakes && <p className="text-xs text-slate-300 mt-1">{r.mistakes}</p>}
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-slate-500 text-center mt-6">Clyde's Personal Brain Training System</p>
      </div>
      <button onClick={exportPDF} className="w-full mt-4 bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-xl font-medium">Export Weekly Summary PDF</button>
    </div>
  );
}
