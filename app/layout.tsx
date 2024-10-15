import Navbar from './components/Navbar';
import './styles/globals.css';

export const metadata = {
    title: 'Ростелеком',
    description: 'Официальный сайт Ростелеком',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
        <body>
        <Navbar />
        <main>{children}</main>
        </body>
        </html>
    );
}