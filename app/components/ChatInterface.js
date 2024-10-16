import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatInterface({ messages, addMessage }) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const prevMessagesLengthRef = useRef(messages.length);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (messages.length > prevMessagesLengthRef.current) {
            scrollToBottom();
        }
        prevMessagesLengthRef.current = messages.length;
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { type: 'user', content: input };
        addMessage(userMessage);
        setInput('');
        setIsLoading(true);

        // Формирование истории диалога
        const history = messages.map(msg => {
            return msg.type === 'user' ? `Пользователь: ${msg.content}` : `Консультант Владимир: ${msg.content}`;
        }).join('\n');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: `${history}\nПользователь: ${input}` }),
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
    };

    return (
        <div className="chat-interface">
            <header className="chat-header">
                <h1>Консультант Владимир</h1>
            </header>
            <div className="chat-messages-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-container ${message.type}-container`}>
                            <div className={`message-label ${message.type}-label`}>
                                {message.type === 'bot' ? 'Консультант Владимир' : 'Пользователь'}
                            </div>
                            <div className={`message message-${message.type}`}>
                                <ReactMarkdown
                                    children={message.content}
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        a: ({node, ...props}) => (
                                            <a {...props} target="_blank" rel="noreferrer" />
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
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
                        <FiSend size={20} />
                    </button>
                </form>
            </footer>
        </div>
    );
}