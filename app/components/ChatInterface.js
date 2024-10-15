'use client';

import { useState } from 'react';

export default function ChatInterface({ messages, addMessage }) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        addMessage({ type: 'user', content: input });

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: input }),
            });

            if (!response.ok) {
                throw new Error('Ошибка сети');
            }

            const data = await response.json();
            addMessage({ type: 'bot', content: data.content });
        } catch (error) {
            console.error('Error:', error);
            addMessage({ type: 'error', content: 'Произошла ошибка при получении ответа.' });
        }

        setIsLoading(false);
        setInput('');
    };

    return (
        <>
            <main className="flex-grow overflow-auto p-4">
                <div className="max-w-3xl mx-auto space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`p-3 rounded-lg ${
                            message.type === 'user' ? 'bg-blue-100 ml-auto' :
                                message.type === 'bot' ? 'bg-green-100' : 'bg-red-100'
                        } max-w-sm`}>
                            {message.content}
                        </div>
                    ))}
                </div>
            </main>
            <footer className="bg-white p-4">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Введите ваше сообщение..."
                        className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Отправка...' : 'Отправить'}
                    </button>
                </form>
            </footer>
        </>
    );
}