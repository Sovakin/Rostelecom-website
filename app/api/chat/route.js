import { NextResponse } from 'next/server';

export async function POST(request) {
    const { value } = await request.json();

    const url = "https://us-central1-chatgpt-c1cfb.cloudfunctions.net/callTurbo";
    const headers = {
        "Host": "us-central1-chatgpt-c1cfb.cloudfunctions.net",
        "accept": "*/*",
        "content-type": "application/json",
        "user-agent": "AI Chatbot/3.6 (com.highteqsolutions.chatgpt; build:8; iOS 16.7.2) Alamofire/5.9.1",
        "accept-language": "ru-US;q=1.0"
    };
    const data = {
        'max_tokens': 4000,
        'responseType': 'normal',
        'osType': 'iOS',
        'model': 'gpt-4o-mini',
        'value': value,
        'search': ''
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            const content = responseData.choices[0]?.message?.content || '';
            return NextResponse.json({ content });
        } else {
            return NextResponse.json({ error: 'Ошибка при получении ответа от сервера' }, { status: response.status });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Произошла ошибка при выполнении запроса' }, { status: 500 });
    }
}