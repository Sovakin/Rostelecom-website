'use client';

import { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import Sidebar from '../components/Sidebar';
import '../styles/chatbot.css';

export default function ChatbotPage() {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages(prev => [...prev, message]);
    };

    return (
        <div className="chat-container">
            <Sidebar />
            <ChatInterface
                messages={messages}
                addMessage={addMessage}
            />
        </div>
    );
}