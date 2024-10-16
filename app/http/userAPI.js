import {$authHost, $host} from "./index";
import { default as jwtDecode } from 'jwt-decode';


export const registration = async (email, password) => {
    const {data} = await $host.post('api/auth/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password})
    localStorage.setItem('token', data.token)
    console.log(data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/auth/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
