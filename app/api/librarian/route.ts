import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const prompt = `
You are BookWise AI Librarian.

Recommend books based on the user's preferences.

IMPORTANT:
- Do NOT use markdown.
- Do NOT use ** or * or # symbols.
- Do NOT use headings with ###.
- Return plain text only.
- Use blank lines between recommendations.

User:
${question}

Return:
5 recommended books with:
Book Name:
Author:
Reason:


Return exactly in this format:

Book Name: ...

Author: ...

Reason: ...

--------------------

Book Name: ...

Author: ...

Reason: ...
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return NextResponse.json({
      answer: response.text,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      answer:
        "AI Librarian is currently unavailable. Please try again.",
    });
  }
}