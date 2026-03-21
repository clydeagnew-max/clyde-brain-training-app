import { useState } from "react";
const moods = ["Frustrated", "Neutral", "Good", "Great", "Focused"];
export default function Reflection() {
  const todayKey = new Date().toISOString().split("T")[0];
  const storageKey = "clyde-reflection-" + todayKey;
  const [entry, setEntry] = useState(() => { const saved = localStorage.getItem(storageKey); return saved ? JSON.parse(saved) : { mood: "", notes: "", mistakes: "", learning: "" }; });
  const [saved, setSaved] = useState(false);
  const update = (field, value) => { setEntry((prev) => ({ ...prev, [field]: value })); setSaved(false); };
  const save = () => { localStorage.setItem(storageKey, JSON.stringify(entry)); setSaved(true); };
  return (
    <div className="space-y-4">
      <div className="bg-blue-950 rounded-xl p-4 border border-blue-800">
        <h2 className="text-blue-200 font-semibold mb-1">End-of-Session Journal</h2>
        <p className="text-slate-400 text-xs">Take 5 minutes to reflect on today, Clyde.</p>
      </div>
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
        <p className="text-sm text-slate-300 mb-2">How was your focus today?</p>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <button key={m} onClick={() => update("mood", m)} className={"text-sm px-3 py-1.5 rounded-lg border transition-all " + (entry.mood === m ? "bg-blue-700 border-blue-500 text-white" : "bg-slate-800 border-slate-600 text-slate-300")}>{m}</button>
          ))}
        </div>
      </div>
      {[{ field: "mistakes", label: "What mistakes did you make?", ph: "e.g. Rushed logic questions..." }, { field: "learning", label: "What did you learn?", ph: "e.g. Pattern recognition improving..." }, { field: "notes", label: "Any other notes?", ph: "e.g. Felt tired today..." }].map(({ field, label, ph }) => (
        <div key={field} className="bg-slate-900 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-300 mb-2">{label}</p>
          <textarea rows={3} value={entry[field]} onChange={(e) => update(field, e.target.value)} placeholder={ph} className="w-full bg-slate-800 text-white rounded-lg p-3 text-sm border border-slate-600 focus:outline-none resize-none" />
        </div>
      ))}
      <button onClick={save} className="w-full bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-xl font-medium">{saved ? "Saved!" : "Save Reflection"}</button>
    </div>
  );
}
