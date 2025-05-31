import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemPrompt = `You are a React Native expert. Generate clean, pixel-perfect React Native code based on this UI description:

${prompt}

Return only the code inside a code block without extra explanation.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Generate React Native code now.' },
      ],
      max_tokens: 1500,
      temperature: 0.2,
    });

    const generatedCode = completion.choices[0].message.content;

    return NextResponse.json({ code: generatedCode });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'OpenAI API error' }, { status: 500 });
  }
}
