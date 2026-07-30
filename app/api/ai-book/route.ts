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

Generate a JSON response with EXACTLY this structure:

{
  "summary": "",
  "themes": [],
  "readingLevel": "",
  "whoShouldRead": "",
  "similarBooks": []
}

Return ONLY valid JSON.
Do not use markdown.
Do not wrap the JSON in \`\`\`json.
`;

    const response = await ai.models.generateContent({
   model: "gemini-2.5-pro",
      contents: prompt,
    });

    const text = response.text ?? "";

    console.log("Gemini Raw Response:", text);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || String(error),
      },
      {
        status: 500,
      }
    );
  }
}