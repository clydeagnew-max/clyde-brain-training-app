export const exercises = [
  {
    id: 1,
    domain: "Logic",
    type: "improvement",
    title: "Logic Precision Drill",
    description: "Solve syllogism-style logic puzzles. Write your reasoning before answering.",
    duration: 15,
    questions: [
      { q: "All A are B. Some B are C. Are some A necessarily C?", answer: "No" },
      { q: "If P then Q. Not Q. Therefore?", answer: "Not P" },
      { q: "All doctors are scientists. Some scientists are artists. Are some doctors artists?", answer: "No" },
    ],
  },
  {
    id: 2,
    domain: "Quantitative",
    type: "improvement",
    title: "Quantitative Fluency",
    description: "Solve mental math and number pattern problems without a calculator.",
    duration: 15,
    questions: [
      { q: "What is 17 x 14?", answer: "238" },
      { q: "Next in sequence: 2, 6, 12, 20, 30, ?", answer: "42" },
      { q: "A train travels 120km in 1.5 hours. What is its speed?", answer: "80 km/h" },
    ],
  },
  {
    id: 3,
    domain: "Memory & Pattern",
    type: "strength",
    title: "Memory & Pattern Puzzle",
    description: "Memorize a sequence, then recall it after a distraction task.",
    duration: 10,
    questions: [
      { q: "Memorize: 7,3,9,1,4. Now do 8+6. What was the sequence?", answer: "7,3,9,1,4" },
      { q: "Memorize: Red,Blue,Green,Yellow. Count 20 to 15. What were the colors?", answer: "Red,Blue,Green,Yellow" },
    ],
  },
  {
    id: 4,
    domain: "Verbal",
    type: "strength",
    title: "Verbal Reasoning",
    description: "Analogies, antonyms, and vocabulary precision tasks.",
    duration: 10,
    questions: [
      { q: "Pensive is to thoughtful as erratic is to?", answer: "unpredictable" },
      { q: "Antonym of loquacious?", answer: "taciturn" },
      { q: "The policy was ___ and easy to follow.", answer: "lucid" },
    ],
  },
  {
    id: 5,
    domain: "Overthinking",
    type: "improvement",
    title: "Overthinking Control",
    description: "Decision-making and impulse reduction exercises.",
    duration: 10,
    questions: [
      { q: "60 seconds: Plan a dinner party for 5. Go.", answer: "open" },
      { q: "Pick ONE: Mountain or Beach? Commit and write 1 sentence why.", answer: "open" },
      { q: "Name 3 things you are grateful for. No second-guessing.", answer: "open" },
    ],
  },
];

export const domainColors = {
  Logic:              { bg: "bg-red-900",   text: "text-red-300",   badge: "bg-red-700"   },
  Quantitative:       { bg: "bg-red-800",   text: "text-red-200",   badge: "bg-red-600"   },
  "Memory & Pattern": { bg: "bg-blue-900",  text: "text-blue-300",  badge: "bg-blue-700"  },
  Verbal:             { bg: "bg-blue-800",  text: "text-blue-200",  badge: "bg-blue-600"  },
  Overthinking:       { bg: "bg-slate-800", text: "text-slate-300", badge: "bg-slate-600" },
};
