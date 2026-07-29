"use client";

import { useState } from "react";
import Link from "next/link";

export default function GutenbergSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  async function searchBooks(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setBooks([]);
      return;
    }

    const res = await fetch(
      `/api/gutenberg-search?q=${encodeURIComponent(value)}`
    );

    const data = await res.json();
    setBooks(data);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Gutenberg books..."
        value={query}
        onChange={(e) => searchBooks(e.target.value)}
        className="
          w-full
          p-4
          rounded-2xl
          bg-white/10
          border
          border-white/10
          mb-8
        "
      />

      <div className="grid md:grid-cols-4 gap-6">
        {books.map((book: any) => (
          <div
            key={book.id}
            className="
              rounded-2xl
              overflow-hidden
              bg-white/5
            "
          >
            {book.cover && (
              <img
                src={book.cover}
                alt={book.title}
                className="
                  w-full
                  h-80
                  object-cover
                "
              />
            )}

            <div className="p-4">
              <h3 className="font-bold">
                {book.title}
              </h3>

              <p className="text-sm opacity-70 mb-4">
                {book.author}
              </p>

              <Link
                href={`/read/${book.id}`}
                className="
                  inline-block
                  px-4
                  py-2
                  rounded-xl
                  bg-primary
                "
              >
                📖 Read
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}