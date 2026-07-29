import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

async function getTrendingBooks() {
  try {
    const res = await fetch(
      "http://localhost:3000/api/books?q=bestseller",
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data.items || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
export default async function TrendingPage() {
  const books = await getTrendingBooks();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold mb-4">
          🔥 Trending Books
        </h1>

        <p className="text-foreground/60 mb-10">
          Popular books readers are discovering right now.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {books.map((book: any) => {
            const info = book.volumeInfo;

            return (
              <Link
  href={`/book/${book.id}?title=${encodeURIComponent(info.title)}`}
  key={book.id}
  className="group"
>
                <div className="glass rounded-xl overflow-hidden">

                  {info.imageLinks?.thumbnail && (
                    <img
                      src={info.imageLinks.thumbnail}
                      alt={info.title}
                      className="w-full h-64 object-cover"
                    />
                  )}

                </div>

                <h3 className="mt-2 text-sm font-semibold">
                  {info.title}
                </h3>
              </Link>
            );
          })}

        </div>

      </main>

      <Footer />
    </div>
  );
}