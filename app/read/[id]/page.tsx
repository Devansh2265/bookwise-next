import SaveReadingProgress from "@/components/SaveReadingProgress";
import BookmarkButton from "@/components/BookmarkButton";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getBook(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/book-content?id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

const themes = [
  "bg-[radial-gradient(circle_at_top,_#6366f1_0%,_#1e1b4b_40%,_#020617_100%)]",
  "bg-[radial-gradient(circle_at_top,_#3b82f6_0%,_#172554_40%,_#020617_100%)]",
  "bg-[radial-gradient(circle_at_top,_#8b5cf6_0%,_#312e81_40%,_#020617_100%)]",
  "bg-[radial-gradient(circle_at_top,_#10b981_0%,_#14532d_40%,_#020617_100%)]",
  "bg-[radial-gradient(circle_at_top,_#f59e0b_0%,_#78350f_40%,_#0c0a09_100%)]",
  "bg-[radial-gradient(circle_at_top,_#ef4444_0%,_#7f1d1d_40%,_#0c0a09_100%)]",
];

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const theme =
    themes[Number(id) % themes.length];

  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <>
      <SaveReadingProgress
        bookId={id}
        title={book.title}
        author={book.author}
        cover={book.cover}
      />

      <div className={`min-h-screen text-white ${theme}`}>
        <div className="max-w-6xl mx-auto px-6 py-12">

          <Link
            href="/discover"
            className="
            inline-flex
            items-center
            text-white/70
            hover:text-white
            transition
            mb-8
            "
          >
            ← Back to Library
          </Link>

          <div
            className="
            relative
            bg-white/10
            backdrop-blur-2xl
            border border-white/10
            rounded-[36px]
            shadow-[0_25px_100px_rgba(0,0,0,0.6)]
            overflow-hidden
            p-8
            md:p-16
            "
          >

            <div
              className="
              absolute
              inset-x-0
              top-0
              h-24
              bg-gradient-to-b
              from-white/15
              to-transparent
              pointer-events-none
              "
            />

            {book.cover && (
              <img
                src={book.cover}
                alt={book.title}
                className="
                w-64
                md:w-72
                mx-auto
                rounded-3xl
                shadow-2xl
                mb-10
                "
              />
            )}

            <h1
              className="
              text-4xl
              md:text-6xl
              font-bold
              text-center
              "
            >
              {book.title}
            </h1>

            <p
              className="
              text-center
              text-white/60
              mt-4
              mb-8
              text-lg
              "
            >
              {book.author || "Unknown Author"}
            </p>

            <div className="flex justify-center mb-10">
              <BookmarkButton
                bookId={id}
                title={book.title}
                author={book.author}
                cover={book.cover}
              />
            </div>

            <article
              className="
              reader-content
              font-serif
              text-[22px]
              leading-[2.2]
              tracking-wide
              text-white/90
              "
              dangerouslySetInnerHTML={{
                __html: book.content,
              }}
            />

          </div>

        </div>
      </div>
    </>
  );
}
