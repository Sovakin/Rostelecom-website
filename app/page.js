import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="home-page">
            {/* Герой-секция */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Добро пожаловать в Ростелеком</h1>
                    <p>Мы рады представить нашего нового чат-помощника, который ответит на любой ваш вопрос о наших услугах!</p>
                    <Link href="/chatbot" className="cta-button">Начать чат</Link>
                </div>
                <div className="hero-image">
                    <Image
                        src="/bot.png" // Убедитесь, что файл существует в public
                        alt="Чат-помощник Ростелеком"
                        width={300}
                        height={400}
                    />
                </div>
            </section>

            {/* Раздел услуг */}
            <section className="services-section">
                <h2>Наши услуги</h2>
                <div className="services-container">
                    <div className="service-card">
                        <h3>Быстрый интернет</h3>
                        <p>Скорость до 1 Гбит/с для всех ваших нужд.</p>
                    </div>
                    <div className="service-card">
                        <h3>Цифровое ТВ</h3>
                        <p>Более 200 каналов и услуги DVR для записи программ.</p>
                    </div>
                    <div className="service-card">
                        <h3>Мобильная связь</h3>
                        <p>Выгодные тарифы и безлимитные звонки.</p>
                    </div>
                    <div className="service-card">
                        <h3>Домашний телефон</h3>
                        <p>Безлимитные звонки по России и дополнительные услуги.</p>
                    </div>
                </div>
            </section>

            {/* Раздел Telegram-бота */}
            <section className="telegram-bot-section">
                <h2>Наш Telegram-бот</h2>
                <div className="telegram-content">
                    <div className="telegram-info">
                        <p>Теперь у нас есть свой бот в Telegram! Вы можете быстро и удобно получать информацию о наших услугах, оформлять заявки и получать поддержку прямо в мессенджере.</p>
                        <a
                            href="https://t.me/hakaton20_bot" // Замените на ссылку вашего бота
                            target="_blank"
                            rel="noopener noreferrer"
                            className="telegram-button"
                        >
                            Перейти в Telegram-бот
                        </a>
                    </div>
                    <div className="telegram-qr">
                        <Image
                            src="/tg.jpg" // Убедитесь, что файл существует в public
                            alt="QR-код Telegram-бота Ростелеком"
                            width={350}
                            height={400}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}