import { useState } from "react";
import { exercises, domainColors } from "../data/exercises";

export default function ExerciseList() {
  const [selected, setSelected] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [userAns, setUserAns] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const start = (ex) => { setSelected(ex); setQIndex(0); setUserAns(""); setRevealed(false); setStartTime(Date.now()); };
  const logResult = (correct) => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const key = selected.id + "-" + qIndex;
    const stored = JSON.parse(localStorage.getItem("clyde-exercise-logs") || "{}");
    stored[key] = { correct, elapsed, domain: selected.domain, date: new Date().toISOString() };
    localStorage.setItem("clyde-exercise-logs", JSON.stringify(stored));
    if (qIndex < selected.questions.length - 1) { setQIndex(qIndex + 1); setUserAns(""); setRevealed(false); setStartTime(Date.now()); }
    else { setSelected(null); }
  };
  if (selected) {
    const q = selected.questions[qIndex];
    const colors = domainColors[selected.domain];
    return (
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <span className={"text-xs px-2 py-0.5 rounded-full " + colors.badge + " " + colors.text}>{selected.domain}</span>
          <span className="text-xs text-slate-400">Q{qIndex + 1} / {selected.questions.length}</span>
        </div>
        <p className="text-white font-medium mb-4">{q.q}</p>
        {q.answer === "open"
          ? <textarea value={userAns} onChange={(e) => setUserAns(e.target.value)} rows={3} placeholder="Your response..." className="w-full bg-slate-800 text-white rounded-lg p-3 text-sm border border-slate-600 focus:outline-none" />
          : <input value={userAns} onChange={(e) => setUserAns(e.target.value)} placeholder="Your answer..." className="w-full bg-slate-800 text-white rounded-lg p-3 text-sm border border-slate-600 focus:outline-none" />
        }
        {!revealed
          ? <button onClick={() => setRevealed(true)} className="mt-3 w-full bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">Check Answer</button>
          : <div className="mt-3">
              {q.answer !== "open" && <p className="text-sm text-green-300 mb-2">Answer: <strong>{q.answer}</strong></p>}
              <div className="flex gap-2">
                {q.answer !== "open" && <>
                  <button onClick={() => logResult(true)} className="flex-1 bg-green-800 hover:bg-green-700 text-white py-2 rounded-lg text-sm">Correct</button>
                  <button onClick={() => logResult(false)} className="flex-1 bg-red-800 hover:bg-red-700 text-white py-2 rounded-lg text-sm">Wrong</button>
                </>}
                {q.answer === "open" && <button onClick={() => logResult(true)} className="flex-1 bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-lg text-sm">Next</button>}
              </div>
            </div>
        }
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {exercises.map((ex) => {
        const colors = domainColors[ex.domain];
        return (
          <div key={ex.id} className="bg-slate-900 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <span className={"text-xs px-2 py-0.5 rounded-full " + colors.badge + " " + colors.text + " mr-2"}>{ex.domain}</span>
                <span className="font-medium text-white">{ex.title}</span>
                <p className="text-xs text-slate-400 mt-1">{ex.description}</p>
              </div>
              <button onClick={() => start(ex)} className="ml-4 bg-blue-700 hover:bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg">Start</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
