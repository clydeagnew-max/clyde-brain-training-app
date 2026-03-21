import { useEffect, useState } from "react";
export default function Notification() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const prompts = ["Time to train, Clyde. Your future self will thank you.", "Consistency beats intensity. Go!", "Focus is a skill. Practice it daily.", "One session closer to peak performance."];
  useEffect(() => {
    const last = localStorage.getItem("clyde-last-notif");
    const today = new Date().toISOString().split("T")[0];
    if (last !== today) { setMessage(prompts[Math.floor(Math.random() * prompts.length)]); setVisible(true); localStorage.setItem("clyde-last-notif", today); }
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed top-4 right-4 bg-blue-900 border border-blue-600 text-blue-100 px-4 py-3 rounded-xl shadow-lg max-w-xs z-50">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm">{message}</p>
        <button onClick={() => setVisible(false)} className="text-blue-400 hover:text-white text-lg leading-none ml-2">x</button>
      </div>
    </div>
  );
}
