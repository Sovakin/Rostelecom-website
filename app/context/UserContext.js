import {createContext} from 'react';

export const UserContext = createContext({
    user: {},
    isAuth: false,
    setUser: () => {}
})