/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AuthContext = createContext();

const API_URL = "https://localhost:8009";

export function AuthProvider({ children }) {
    const [user, setUser] = useState([]);

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

            setUser(data.data?.user || data.user || data);

            alert("You have succesfully signed up!");
        } catch (err) {
            console.error(err);
            alert(err.message || "Signup failed");
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

            const loggedInUser = result?.data?.user || result?.user || result;

            setUser(loggedInUser);

            alert("You have succesfully logged in!")
        } catch (err) {
            alert(err.message || "Login failed");
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
