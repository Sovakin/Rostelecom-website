import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req) {
    const { prompt } = await req.json();

    if (!prompt) {
        return NextResponse.json({ error: 'No prompt provided.' }, { status: 400 });
    }

    try {
        const completion = await openai.createCompletion({
            model: 'gpt-4',
            prompt: prompt,
            max_tokens: 100,
        });

        const gptResponse = completion.data.choices[0].text;

        return NextResponse.json({ response: gptResponse });
    } catch (error) {
        return NextResponse.json({ error: 'Error with OpenAI request.' }, { status: 500 });
    }
}