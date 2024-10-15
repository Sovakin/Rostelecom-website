'use client';

import { useState } from 'react';
import ChatInterface from './components/ChatInterface';

export default function Home() {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages(prev => [...prev, message]);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="bg-white shadow p-4">
                <h1 className="text-2xl font-bold">Nikita Sonnet 3.5 Chat</h1>
            </header>
            <ChatInterface messages={messages} addMessage={addMessage} />
        </div>
    );
}