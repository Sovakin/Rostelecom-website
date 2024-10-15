export default function Home() {
    return (
        <main className="home-page">
            <h1>Добро пожаловать в Ростелеком</h1>
            <p>Мы предоставляем высококачественные телекоммуникационные услуги для вас.</p>
            <div className="features">
                <div className="feature">
                    <h2>Быстрый интернет</h2>
                    <p>Скорость до 1 Гбит/с</p>
                </div>
                <div className="feature">
                    <h2>Цифровое ТВ</h2>
                    <p>Более 200 каналов</p>
                </div>
                <div className="feature">
                    <h2>Мобильная связь</h2>
                    <p>Выгодные тарифы</p>
                </div>
            </div>
        </main>
    );
}