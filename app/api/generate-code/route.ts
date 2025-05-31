import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // 🆓 Use OpenRouter key from .env
  baseURL: "https://openrouter.ai/api/v1", // ✅ Important baseURL
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // 🔁 Replace with your deployed site if needed
    "X-Title": "MyReactNativeCodeGenApp",    // 📛 Any custom title
  },
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const messages = [
      {
        role: "system",
        content: `You are a React Native expert. Generate clean, pixel-perfect React Native code based on this UI description:\n\n${prompt}\n\nReturn only the code inside a code block without extra explanation.`,
      },
      {
        role: "user",
        content: "Generate React Native code now.",
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "mistral/mixtral-8x7b", // 🆓 Free model
      messages,
      max_tokens: 1500,
      temperature: 0.2,
    });

    const generatedCode = completion.choices?.[0]?.message?.content?.trim();

    if (!generatedCode) {
      return NextResponse.json({ error: "No code generated" }, { status: 500 });
    }

    return NextResponse.json({ code: generatedCode }, { status: 200 });
  } catch (err) {
    console.error("OpenRouter API Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
