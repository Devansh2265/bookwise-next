import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { bookTitle, question } = await req.json();

    if (!bookTitle || !question) {
      return NextResponse.json(
        { error: "Missing book title or question" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert book reviewer and reading advisor.

Book Title: ${bookTitle}

User Question:
${question}

Instructions:
- Answer clearly and naturally.
- If the user asks "Is it good?", explain what the book is about, its strengths, and who should read it.
- If the book is not well known, make a reasonable assessment based on the title and subject.
- Keep answers between 100 and 250 words.
- Use simple language.
`;

    const response = await ai.models.generateContent({
     model: "gemini-3.6-flash",
      contents: prompt,
    });

    return NextResponse.json({
      answer: response.text,
    });

  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        answer:
          "The AI service is temporarily unavailable. Please try again in a moment.",
      },
      { status: 200 }
    );
  }
}