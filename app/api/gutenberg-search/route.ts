import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");

    if (!query?.trim()) {
      return NextResponse.json([]);
    }

    const res = await fetch(
      `https://gutendex.com/books?search=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      throw new Error(`Gutendex returned ${res.status}`);
    }

    const data = await res.json();

    const books = (data.results || [])
      .slice(0, 24)
      .map((book: any) => ({
        id: String(book.id),
        title: book.title,
        author:
          book.authors?.[0]?.name ||
          "Unknown Author",
        cover:
          book.formats?.["image/jpeg"] ||
          "/placeholder-book.jpg",
        downloads:
          book.download_count || 0,
      }));

    return NextResponse.json(books);
  } catch (error) {
    console.error(
      "Gutenberg Search Error:",
      error
    );

    return NextResponse.json(
      [],
      { status: 200 }
    );
  }
}
