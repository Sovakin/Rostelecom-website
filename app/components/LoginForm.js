'use client';

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../http/index';
import { UserContext } from '../context/UserContext';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault(); // Предотвращает стандартное поведение отправки формы
        try {
            const data = await login(email, password);
            setUser({
                ...user,
                isAuth: true,
                user: data
            });
            navigate('/'); // Перенаправление на главную страницу после успешного входа
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <form>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" onClick={handleClick}>Войти</button>
        </form>
    );
}

export default LoginForm;