import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AskAI from "../../../components/AskAI";

async function getAIAnalysis(title: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/ai-book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      author: "Unknown Author",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch AI analysis: ${errorText}`);
  }

  return res.json();
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ title?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;

  const title = decodeURIComponent(
    query?.title || "Unknown Book"
  );

  const analysis = await getAIAnalysis(title);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="font-display text-5xl mb-4">
          {title}
        </h1>

        <p className="text-foreground/60 mb-8">
          AI Generated Book Analysis
        </p>

        {/* Read Button */}
        <div className="mb-10">
          <a
            href={`/read/${id}`}
            className="
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-primary
              text-primary-foreground
              font-semibold
              shadow-lg
              hover:scale-105
              transition
            "
          >
            📖 Read This Book
          </a>
        </div>

        <div className="space-y-6">
          <section className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-3">
              📖 Summary
            </h2>

            <p>{analysis.summary}</p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-3">
              🏷 Themes
            </h2>

            <div className="flex flex-wrap gap-2">
              {analysis.themes?.map((theme: string) => (
                <span
                  key={theme}
                  className="px-3 py-1 border rounded-full"
                >
                  {theme}
                </span>
              ))}
            </div>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-3">
              📚 Reading Level
            </h2>

            <p>{analysis.readingLevel}</p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-3">
              🔁 Similar Books
            </h2>

            <ul className="space-y-2">
              {analysis.similarBooks?.map((book: string) => (
                <li key={book}>• {book}</li>
              ))}
            </ul>
          </section>
        </div>

        <AskAI title={title} />
      </main>

      <Footer />
    </div>
  );
}