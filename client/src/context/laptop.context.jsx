/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const LaptopContext = createContext()

const API_URL = import.meta.env.CLIENT_URL

export function LaptopProvider({ children }) {
    const [laptops, setLaptops] = useState([])

    const getLaptops = async () => {
        try {
            const res = await fetch(`${API_URL}/laptops`)

            if (!res.ok) {
                throw new Error("Something went wrong")
            }

            const result = await res.json()

            setLaptops(result)
        } catch(err) {
            console.error(err)
        }
    }

    const deleteLaptops = async () => {
        try {
            const res = await fetch(`${API_URL}/laptops/:id`, {
                method: "DELETE",
                credentials: true
            })

            if (!res.ok) {
                throw new Error("Something went wrong")
            }

            const result = await res.json()

            setLaptops(result)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getLaptops()
    }, [])

    return (
        <LaptopContext.Provider value={ { laptops, deleteLaptops } }>
            { children }
        </LaptopContext.Provider>
    )
}