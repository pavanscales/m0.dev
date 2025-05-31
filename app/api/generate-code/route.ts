import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Replace in prod
    "X-Title": "MyReactNativeCodeGenApp",
  },
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "mistral/mixtral-8x7b",
      messages: [
        {
          role: "system",
          content: `You are a React Native expert. Generate clean, pixel-perfect React Native code based on this UI description:\n\n${prompt}\n\nReturn only the code inside a code block without extra explanation.`,
        },
        { role: "user", content: "Generate React Native code now." },
      ],
      max_tokens: 1500,
      temperature: 0.2,
    });

    const code = completion.choices?.[0]?.message?.content?.trim();

    return code
      ? NextResponse.json({ code })
      : NextResponse.json({ error: "No code generated" }, { status: 500 });
  } catch (err) {
    console.error("❌ OpenRouter API Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
