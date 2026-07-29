"use client";

import { supabase } from "@/lib/supabase";

export default function BookmarkButton({
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
  async function saveBookmark() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .insert({
        user_id: user.id,
        book_id: bookId,
        title,
        author,
        cover,
      })
      .select();

    console.log("USER:", user);
    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("⭐ Bookmarked!");
  }

  return (
    <button
      onClick={saveBookmark}
      className="
        px-6
        py-3
        rounded-xl
        bg-yellow-500
        text-black
        font-semibold
        hover:scale-105
        transition
      "
    >
      ⭐ Bookmark
    </button>
  );
}