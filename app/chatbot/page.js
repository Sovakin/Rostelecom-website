'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import styles from './chatbot.module.css';

export default function ChatbotPage() {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    return (
        <div className={styles.chatContainer}>
            <Sidebar />
            <ChatInterface messages={messages} addMessage={addMessage} />
        </div>
    );
}