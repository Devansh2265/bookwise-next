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

    // Fetch book metadata
    const gutendexRes = await fetch(
      `https://gutendex.com/books/${bookId}`
    );

    if (!gutendexRes.ok) {
      throw new Error("Failed to fetch Gutendex data");
    }

    const book = await gutendexRes.json();

    const htmlUrl =
      book.formats["text/html"] ||
      book.formats["text/html; charset=utf-8"];

    if (!htmlUrl) {
      return NextResponse.json(
        { error: "No HTML version available" },
        { status: 404 }
      );
    }

    // Download Gutenberg HTML
    const htmlRes = await fetch(htmlUrl);

    if (!htmlRes.ok) {
      throw new Error("Failed to fetch Gutenberg HTML");
    }

    const html = await htmlRes.text();

    const $ = cheerio.load(html);

    // Remove Gutenberg clutter
    $("header").remove();
    $("footer").remove();
    $("nav").remove();

    $(".pg-boilerplate").remove();
    $(".x-ebookmaker-drop").remove();
    $(".toc").remove();

    // Remove first TOC table if present
    $("table").first().remove();

    // Fix image URLs
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

    // Make images responsive
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

    let content = $("body").html() || "";


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