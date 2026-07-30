import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { title, author } = await req.json();

    const prompt = `
You are an expert librarian.

Book:
Title: ${title}
Author: ${author}

Generate a JSON response with:

{
  "summary": "",
  "themes": [],
  "readingLevel": "",
  "whoShouldRead": "",
  "similarBooks": []
}

Return ONLY valid JSON.
`;

    const response = await ai.models.generateContent({
   model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text ?? "";

    const parsed = JSON.parse(text);

return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate AI response",
      },
      {
        status: 500,
      }
    );
  }
}