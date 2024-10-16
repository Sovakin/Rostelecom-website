'use client';

import { useState } from 'react';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Пароли не совпадают');
            return;
        }

        try {
            // Здесь вы должны заменить эту строку на ваш код регистрации
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Ошибка регистрации');
                return;
            }

            // Если регистрация прошла успешно, то можно сделать редирект на другую страницу
            // Например, на страницу авторизации
            // window.location.href = '/login';

            // Или вы можете просто показать сообщение об успешной регистрации
            setErrorMessage('Регистрация прошла успешно!');

        } catch (error) {
            setErrorMessage('Ошибка сети');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
                <label htmlFor="username">Имя пользователя:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Подтверждение пароля:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit" className="login-button">
                Зарегистрироваться
            </button>
        </form>
    );
}