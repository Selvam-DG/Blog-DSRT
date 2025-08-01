import { createContext, useEffect, useState } from "react";

const BaseURL = import.meta.env.VITE_API_URL;
export const  AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser ] = useState(null);
    const [token , setToken ] = useState(localStorage.getItem('token'));

    useEffect( () => {
        if(token){
            fetch(`${BaseURL}/auth/user/`, {
                headers:{
                    'Authorization' : `Token ${token}`
                }
            })
            .then( res => res.json())
            .then( data => setUser(data))
            .catch( () => setUser(null));
        }
    }, [token]);

    const login = (token) =>{
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}