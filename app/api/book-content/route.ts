import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const bookId = req.nextUrl.searchParams.get("id");

  try {
    const url = `https://gutendex.com/books/${bookId}`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });

    return NextResponse.json({
      requestedUrl: url,
      status: res.status,
      statusText: res.statusText,
      ok: res.ok,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: String(error),
      },
      { status: 500 }
    );
  }
}