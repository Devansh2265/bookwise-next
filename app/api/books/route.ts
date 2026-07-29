import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q") || "fiction";

  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&maxResults=24&key=${apiKey}`
  );

  const data = await response.json();

  return NextResponse.json(data);
}