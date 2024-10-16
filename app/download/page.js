import Image from 'next/image';
import '@/app/styles/download.css'; // Убедитесь, что путь корректен

export default function Download() {
    return (
        <main className="download-page">
            <section className="download-section">
                <h1>Скачать приложение Ростелеком</h1>
                <p>Наше новое приложение поможет вам управлять услугами Ростелеком быстро и удобно прямо с вашего компьютера.</p>
                <a
                    href="/rostelecom.exe"
                    download
                    className="download-button"
                >
                    Скачать для Windows (EXE)
                </a>
                <div className="download-image">
                    <Image
                        src="/prog.jpg" // Убедитесь, что файл существует в public
                        alt="Скриншот приложения Ростелеком"
                        width={700}
                        height={430}
                    />
                </div>
            </section>
        </main>
    );
}