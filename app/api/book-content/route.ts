import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  try {
    const bookId = req.nextUrl.searchParams.get("id");

    if (!bookId) {
      return NextResponse.json(
        { error: "Missing book id" },
        { status: 400 }
      );
    }

    const gutendexRes = await fetch(
  `https://gutendex.com/books/${bookId}`,
  {
    headers: {
      "User-Agent": "BookWise/1.0",
      Accept: "application/json",
    },
    cache: "no-store",
  }
);

    if (!gutendexRes.ok) {
      throw new Error("Failed to fetch Gutendex data");
    }

    const book = await gutendexRes.json();

    // Find ANY HTML format
    const htmlUrl = Object.entries(book.formats).find(
      ([key, value]) =>
        key.startsWith("text/html") &&
        typeof value === "string"
    )?.[1] as string | undefined;

    // Fallback to plain text if HTML doesn't exist
    if (!htmlUrl) {
      const textUrl = Object.entries(book.formats).find(
        ([key, value]) =>
          key.startsWith("text/plain") &&
          typeof value === "string"
      )?.[1] as string | undefined;

      if (!textUrl) {
        return NextResponse.json(
          { error: "No readable version available" },
          { status: 404 }
        );
      }

      const textRes = await fetch(textUrl);

      if (!textRes.ok) {
        throw new Error("Failed to fetch plain text");
      }

      const text = await textRes.text();

      return NextResponse.json({
        title: book.title,
        author:
          book.authors?.[0]?.name || "Unknown Author",
        cover:
          book.formats["image/jpeg"] || null,
        content: `<pre style="white-space:pre-wrap;font-family:serif;">${text}</pre>`,
      });
    }

    const htmlRes = await fetch(htmlUrl, {
  headers: {
    "User-Agent": "BookWise/1.0",
  },
  cache: "no-store",
});

    if (!htmlRes.ok) {
      throw new Error("Failed to fetch Gutenberg HTML");
    }

    const html = await htmlRes.text();

    const $ = cheerio.load(html);

    $("header").remove();
    $("footer").remove();
    $("nav").remove();

    $(".pg-boilerplate").remove();
    $(".x-ebookmaker-drop").remove();
    $(".toc").remove();

    $("table").first().remove();

    $("img").each((_, el) => {
      const src = $(el).attr("src");

      if (src) {
        try {
          const absoluteUrl = new URL(
            src,
            htmlUrl
          ).toString();

          $(el).attr("src", absoluteUrl);
        } catch {
          console.log("Invalid image:", src);
        }
      }
    });

    $("img").attr(
      "style",
      `
      max-width:100%;
      height:auto;
      display:block;
      margin:2rem auto;
      border-radius:16px;
      box-shadow:0 10px 40px rgba(0,0,0,0.3);
      `
    );

    const content = $("body").html() || "";

    return NextResponse.json({
      title: book.title,
      author:
        book.authors?.[0]?.name || "Unknown Author",
      cover:
        book.formats["image/jpeg"] || null,
      content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch book",
      },
      {
        status: 500,
      }
    );
  }
}