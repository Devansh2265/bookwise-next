"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DeleteBookmarkButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function deleteBookmark() {
    const confirmed = confirm(
      "Delete this bookmark?"
    );

    if (!confirmed) return;

    const { error } = await supabase
     .from("saved_books")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={deleteBookmark}
      className="
        mt-3
        w-full
        px-4
        py-3
        rounded-xl
        bg-red-500
        text-white
        font-semibold
        hover:bg-red-600
        transition
      "
    >
      🗑 Delete
    </button>
  );
}