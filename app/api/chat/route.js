import { NextResponse } from 'next/server';

export async function POST(request) {
    const { value } = await request.json();

    // Новый системный промпт
    const systemPrompt = `
Ты – "Консультант Владимир", виртуальный помощник компании Ростелеком.
Ты обладаешь полными знаниями о всех сервисах и услугах Ростелекома, таких как:

1. **Интернет:** 
   - Скорости: от 100 Мбит/с до 1 Гбит/с
   - Условия подключения: оформление заявки онлайн, по телефону или в офисе
   - Дополнительные услуги: бесплатный роутер, поддержка 24/7

2. **Цифровое ТВ:** 
   - Более 200 каналов
   - Услуги DVR для записи программ
   - Специальные предложения и скидки

3. **Мобильная связь:**
   - Различные тарифные планы
   - Безлимитные звонки и интернет
   - Скидки на семейные тарифы

4. **Домашний телефон:**
   - Безлимитные звонки по России
   - Дополнительные услуги: переадресация, голосовая почта

Ты готов подробно и понятно ответить на любые вопросы пользователей, связанные с этими услугами.
Твои ответы должны быть максимально информативными, точными и полезными.
Отвечай только на русском языке.
Не упоминай, что ты виртуальный помощник или нейросеть.
Не начинай ответ с "Консультант Владимир:".
Будь вежливым и профессиональным.

Если вопрос не связан с услугами Ростелекома, вежливо сообщи пользователю, что ты отвечаешь только на вопросы, связанные с услугами Ростелекома.
`;

    // Формирование массива сообщений для API
    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: value }
    ];

    // Логирование для отладки
    console.log("Отправляемый промпт:", JSON.stringify(messages, null, 2));

    const url = "https://open.1chat.ai/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "User-Agent": "Dart/3.2 (dart:io)",
        "Accept-Encoding": "gzip",
        // Если требуется авторизация, добавьте заголовок Authorization здесь
        // "Authorization": "Bearer YOUR_API_KEY",
    };
    const payload = {
        model: "gpt-4o",
        messages: messages,
        temperature: 0.7, // Настройте параметры согласно вашим требованиям
        top_p: 1.0,
        n: 1,
        stream: false,
        stop: null,
        max_tokens: 1000, // Установите лимит токенов согласно необходимости
        presence_penalty: 0.0,
        frequency_penalty: 0.0,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const responseData = await response.json();
            const content = responseData.choices[0]?.message?.content || '';

            // Логирование для отладки
            console.log("Ответ модели:", content);

            // Убираем "Консультант Владимир:" если он вдруг присутствует
            const prefix = 'Консультант Владимир:';
            let finalContent = content;
            if (content.startsWith(prefix)) {
                finalContent = content.slice(prefix.length).trim();
            }

            return NextResponse.json({ content: finalContent });
        } else {
            // Логирование ошибок сервера
            const errorData = await response.text();
            console.error('Ошибка ответа от сервера:', response.status, errorData);
            return NextResponse.json({ error: 'Ошибка при получении ответа от сервера' }, { status: response.status });
        }
    } catch (error) {
        // Логирование ошибок сети или других непредвиденных ошибок
        console.error('Произошла ошибка при выполнении запроса:', error);
        return NextResponse.json({ error: 'Произошла ошибка при выполнении запроса' }, { status: 500 });
    }
}