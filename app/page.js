'use client';

import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import './styles/chatgpt-blue.css';

export default function Home() {
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