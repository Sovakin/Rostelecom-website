import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api' // Замените на ваш реальный URL
});

export const registration = async (username, password, email, role) => {
    const response = await api.post('/registration', {
        username,
        password,
        email,
        role
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post('/login', {
        email,
        password
    });
    return response.data.token; // Возвращаем JWT token
};