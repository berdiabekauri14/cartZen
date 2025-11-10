/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const useAuth = useContext(AuthContext)

const API_URL = import.meta.env.CLIENT_URL;

export function AuthProvider({ children }) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URL}/auth/auto-login`, {
                method: "POST",
                credentials: true
            })

            const result = await res.json()

            if (res.ok) {
                setUser(result)
            }
        })
    }, [])

    const signup = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/auth/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setUser(data);

            toast.success("You have successfully signed up!");
        } catch (err) {
            toast.error("Signup failed");
            throw new Error(err.message);
        }
    };

    const login = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/auth/logIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj),
                credentials: "include"
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            setUser(result);

            toast.success("You have successfully logged in!");
        } catch (err) {
            toast.error("Login failed");
            throw new Error(err.message)
        }
    };

    const logout = async () => {
        setUser(null);
        toast.info("You have successfully logged out");
    };

    return (
        <AuthContext.Provider value={{ signup, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}
