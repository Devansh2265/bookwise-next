"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function SaveReadingProgress({
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
  useEffect(() => {
    async function saveBook() {
      await supabase
        .from("continue_reading")
        .delete()
        .neq("id", 0);

      await supabase
        .from("continue_reading")
        .insert({
          book_id: bookId,
          title,
          author,
          cover,
        });
    }

    saveBook();
  }, [bookId, title, author, cover]);

  return null;
}