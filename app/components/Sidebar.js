import { FiPlusCircle } from 'react-icons/fi';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Чаты</h2>
            <button className="sidebar-button new-chat-button">
                <FiPlusCircle />
                <span style={{margin: '5px'}}>  Новый чат</span>
            </button>
            <button className="sidebar-button sidebar-logout">
                Назад
            </button>
        </aside>
    );
}