"use client";

import { useState } from "react";

export default function AILibrarian() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question) return;

    setLoading(true);

    const res = await fetch("/api/librarian", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <div className="glass rounded-2xl p-8">

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="I like fantasy books with magic and adventure..."
        className="w-full border rounded-xl p-4 min-h-[120px]"
      />

      <button
        onClick={askAI}
        className="mt-4 bg-primary px-6 py-3 rounded-xl"
      >
        Ask Librarian
      </button>

      {loading && (
        <p className="mt-4">Thinking...</p>
      )}

      {answer && (
        <div className="mt-6 border rounded-xl p-4">
          <h3 className="font-bold mb-2">
            AI Recommendation
          </h3>

         <div className="whitespace-pre-wrap">
  {answer}
</div>
        </div>
      )}
    </div>
  );
}