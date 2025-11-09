/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

export const LaptopContext = createContext()

export const UseLaptop = useContext(LaptopContext)

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

    const updateLaptops = async () => {
        try {
            const res = await fetch(`${API_URL}/laptops/:id`, {
                method: "PATCH",
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

    const addLaptop = async () => {
        try {
            const res = await fetch(`${API_URL}/laptops/:id`, {
                method: "POST",
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
        <LaptopContext.Provider value={ { laptops, deleteLaptops, updateLaptops, addLaptop } }>
            { children }
        </LaptopContext.Provider>
    )
}