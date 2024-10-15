import { FiPlusCircle, FiMessageSquare } from 'react-icons/fi';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Чаты</h2>
            <button className="sidebar-button new-chat-button">
                <FiPlusCircle />
                <span>Новый чат</span>
            </button>
            <div className="sidebar-chats">
                <button className="sidebar-button">
                    <FiMessageSquare />
                    <span>Чат 1</span>
                </button>
                {/* Добавьте больше чатов по необходимости */}
            </div>
            <button className="sidebar-button sidebar-logout">
                Выход
            </button>
        </aside>
    );
}