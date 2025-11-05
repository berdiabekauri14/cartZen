/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const API_URL = process.env.CLIENT_URL;

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

            alert("You have succesfully signed up!");
        } catch (err) {
            alert("Signup failed");
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

            alert("You have succesfully logged in!")
        } catch (err) {
            alert("Login failed");
            throw new Error(err.message)
        }
    };


    const logout = async () => {
        setUser(null);
        alert("You have successfully logged out");
    };

    return (
        <AuthContext.Provider value={{ signup, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}
