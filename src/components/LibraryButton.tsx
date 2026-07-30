"use client";

import { useEffect, useState } from "react";

export default function LibraryButton({
  bookId,
  title,
  author,
  cover,
}: {
  bookId: string;
  title: string;
  author?: string;
  cover?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    checkSaved();
  }, []);

  async function checkSaved() {
    const res = await fetch("/api/library");
    const books = await res.json();

    setSaved(
      books.some((b: any) => b.book_id === bookId)
    );
  }

  async function addBook() {
    await fetch("/api/library", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_id: bookId,
        title,
        author,
        cover,
      }),
    });

    setSaved(true);
  }

  async function removeBook() {
    await fetch("/api/library", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_id: bookId,
      }),
    });

    setSaved(false);
  }

  if (saved) {
    return (
      <button
        onClick={removeBook}
        className="px-4 py-2 rounded-lg bg-red-500 text-white"
      >
        🗑 Remove
      </button>
    );
  }

  return (
    <button
      onClick={addBook}
      className="px-4 py-2 rounded-lg bg-green-500 text-white"
    >
      ➕ Add to Library
    </button>
  );
}