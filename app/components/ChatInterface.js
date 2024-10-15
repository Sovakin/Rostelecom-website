'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';

export default function ChatInterface({ messages, addMessage }) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

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
        <main className="main-content">
            <header className="chat-header">
                <h1>Помощник Владимир</h1>
            </header>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.type === 'user' ? 'message-user' : 'message-bot'}`}>
                        <p>{message.content}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <footer className="input-area">
                <form onSubmit={handleSubmit} className="input-box">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Введите ваше сообщение..."
                        className="input-field"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="send-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading"></span>
                        ) : (
                            <FiSend size={20} />
                        )}
                    </button>
                </form>
            </footer>
        </main>
    );
}