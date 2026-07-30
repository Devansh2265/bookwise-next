import LibraryButton from "@/components/LibraryButton";
import GutenbergSearch from "@/components/GutenbergSearch";
import Link from "next/link";

const trendingBooks = [
  {
    id: 1342,
    title: "Pride and Prejudice",
    cover: "https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg",
  },
  {
    id: 84,
    title: "Frankenstein",
    cover: "https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg",
  },
  {
    id: 2701,
    title: "Moby Dick",
    cover: "https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg",
  },
  {
    id: 11,
    title: "Alice in Wonderland",
    cover: "https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg",
  },
  {
    id: 345,
    title: "Dracula",
    cover: "https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg",
  },
  {
    id: 1260,
    title: "Jane Eyre",
    cover: "https://www.gutenberg.org/cache/epub/1260/pg1260.cover.medium.jpg",
  },
  {
    id: 1661,
    title: "Sherlock Holmes",
    cover: "https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg",
  },
  {
    id: 1184,
    title: "The Count of Monte Cristo",
    cover: "https://www.gutenberg.org/cache/epub/1184/pg1184.cover.medium.jpg",
  },
];

export default function ReadBooksPage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          📚 Read Books
        </h1>

        <p className="text-white/60 mb-10">
          Search thousands of free books from Project Gutenberg.
        </p>

        <GutenbergSearch />

        <h2 className="text-3xl font-bold mt-16 mb-8">
          🔥 Trending Classics
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {trendingBooks.map((book) => (
            <Link
              key={book.id}
             href={`https://www.gutenberg.org/ebooks/${book.id}`}
target="_blank"
rel="noopener noreferrer"
              className="group"
            >
              <div className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-[360px] object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="p-4">
                  <h3 className="font-bold line-clamp-2">
                    {book.title}
                  </h3>

                 <div className="mt-3 text-sm text-primary">
  📖 Read Now
</div>

<LibraryButton
  bookId={String(book.id)}
  title={book.title}
  cover={book.cover}
/>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}