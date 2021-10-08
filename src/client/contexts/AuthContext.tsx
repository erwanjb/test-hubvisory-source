import React, { FC, createContext, useState, useEffect } from 'react';
import useApi from "../hooks/useApi";
import { useDispatch } from "react-redux";
import { setToken, clearToken } from "../store/auth/actions";
import { clearGameOver } from "../store/activeGameOver/actions";
import useToken from "../hooks/useToken";
import { toast } from 'react-toastify';

export interface Props {
    verifyToken: () => Promise<boolean>
    login: (email: string, passsword: string) => Promise<void>;
    logout: Function;
    isLogged: boolean;
}

const AuthContext = createContext<Props>(null as Props);


export const AuthProvider: FC = ({ children }) => {
    const token = useToken();
    const dispatch = useDispatch();
    const api = useApi();

    const [isLogged, setIsLogged]  = useState(false);
    useEffect(() => {
        verifyToken();
    }, [token])

    const verifyToken = async () => {
        if (token) {
            try {
                const response = await api.get('/api/auth/verifytoken');
                const exp: number = Math.floor(new Date((response.data as any).exp * 1000).getTime());
                const now = Math.floor(new Date().getTime());

                setTimeout(() => {
                    dispatch(clearToken());
                    dispatch(clearGameOver());
                    setIsLogged(false);
                }, exp - now);

                setIsLogged(true);
                return true;
            } catch (err) {
                console.log(err);
                dispatch(clearToken());
                dispatch(clearGameOver());
                setIsLogged(false);
                return false;
            }
            
        } else {
            setIsLogged(false);
            return false;
        }
    }

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await api.post('/api/auth/login', {
                username: email,
                password
            });
    
            const tokenNow = (response.data as any).access_token;
            dispatch(setToken(tokenNow));
            setIsLogged(true);
        } catch (err) {
           console.log(err);
           setIsLogged(false);
           toast.error('Identifiants non valides', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    const logout = () => {
        dispatch(clearToken());
        dispatch(clearGameOver());
        setIsLogged(false);
    }

    
    return (
        <AuthContext.Provider value={{verifyToken, login, logout, isLogged}} >{children}</AuthContext.Provider>
    )
  }
  export default AuthContext;