import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href="/" className="navbar-logo">
                    <Image
                        src="/logo.png"
                        alt="Ростелеком"
                        width={150}
                        height={55}
                        priority
                    />
                </Link>
                <ul className="navbar-links">
                    <li><Link href="/">Главная</Link></li>
                    <li><Link href="/download">Приложение</Link></li>
                    <li><Link href="/chatbot">Чат-бот</Link></li>
                    <li><Link href="/login" className="navbar-button">Войти</Link></li>
                </ul>
            </div>
        </nav>
    );
}