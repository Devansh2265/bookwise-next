import { supabase } from "@/lib/supabase";
import Link from "next/link";
import DeleteBookmarkButton from "@/components/DeleteBookmarkButton";

export default async function LibraryPage() {
  const { data: books, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading library.</p>
      </div>
    );
  }

  const safeBooks = books ?? [];

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">
          📚 My Library
        </h1>

        {safeBooks.length === 0 ? (
          <p className="text-foreground/60 text-lg">
            No bookmarked books yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {safeBooks.map((book) => (
              <div
                key={book.id}
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  hover:scale-[1.03]
                  transition
                  shadow-xl
                "
              >
                <img
                  src={
                    book.cover ||
                    "https://placehold.co/300x450?text=No+Cover"
                  }
                  alt={book.title}
                  className="
                    w-full
                    h-80
                    object-cover
                  "
                />

                <div className="p-5">
                  <h2
                    className="
                      font-bold
                      text-lg
                      line-clamp-2
                    "
                  >
                    {book.title}
                  </h2>

                  <p
                    className="
                      text-sm
                      text-foreground/60
                      mt-2
                      line-clamp-1
                    "
                  >
                    {book.author || "Unknown Author"}
                  </p>

                  <Link
                   href={`https://www.gutenberg.org/ebooks/${book.book_id}`}
target="_blank"
rel="noopener noreferrer"
                    className="
                      mt-5
                      inline-flex
                      items-center
                      justify-center
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      bg-blue-500
                      text-white
                      font-semibold
                      hover:bg-blue-600
                      transition
                    "
                  >
                    📖 Read Book
                  </Link>

                  <DeleteBookmarkButton id={book.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}