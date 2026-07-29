"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function AskAI({
  title,
}: {
  title: string;
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question) return;

    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookTitle: title,
        question,
      }),
    });

    const data = await res.json();

    setAnswer(data.answer);

    setLoading(false);
  }

  return (
    <div className="glass rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        🤖 Ask AI About This Book
      </h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything..."
        className="w-full border rounded-xl p-4 min-h-[120px]"
      />

      <button
        onClick={askAI}
        className="mt-4 bg-primary px-6 py-3 rounded-xl"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">
            AI Answer
          </h3>

          <ReactMarkdown>
  {answer}
</ReactMarkdown>
        </div>
      )}
    </div>
  );
}