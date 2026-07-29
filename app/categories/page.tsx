import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const categories = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Biography",
  "Self Help",
  "Business",
  "History",
  "Horror",
  "Young Adult",
  "Technology",
  "Psychology",
  "Philosophy",
  "Health",
  "Finance",
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">
          Browse Categories
        </h1>

        <p className="text-foreground/60 mb-10">
          Explore books by genre.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <a
              key={category}
              href={`/discover?q=subject:${encodeURIComponent(category)}`}
              className="glass rounded-2xl p-6 hover:scale-105 transition"
            >
              <h2 className="text-2xl font-semibold">
                {category}
              </h2>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}