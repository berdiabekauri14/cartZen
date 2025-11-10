/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const LaptopContext = createContext();

export const UseLaptop = useContext(LaptopContext);

const API_URL = import.meta.env.CLIENT_URL;

export function LaptopProvider({ children }) {
  const [laptops, setLaptops] = useState([]);

  const getLaptops = async () => {
    try {
      const res = await fetch(`${API_URL}/laptops`);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const result = await res.json();
      setLaptops(result);
      toast.success("Laptops fetched successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch laptops!");
    }
  };

  const deleteLaptops = async (id) => {
    try {
      const res = await fetch(`${API_URL}/laptops/${id}`, {
        method: "DELETE",
        credentials: true,
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const result = await res.json();
      setLaptops(result);
      toast.success("Laptop deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete laptop!");
    }
  };

  const updateLaptops = async (id, data) => {
    try {
      const res = await fetch(`${API_URL}/laptops/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: true,
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const result = await res.json();
      setLaptops(result);
      toast.success("Laptop updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update laptop!");
    }
  };

  const addLaptop = async (data) => {
    try {
      const res = await fetch(`${API_URL}/laptops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: true,
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const result = await res.json();
      setLaptops(result);
      toast.success("Laptop added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add laptop!");
    }
  };

  const addToCart = async () => {
    try {
        const res = await fetch(`${API_URL}/laptops`)

        if (!res.ok) {
            throw new Error("Something went wrong")
        }

        const result = await res.json()

        alert(`${result.id} has been added to cart`)
    } catch(err) {
        console.error(err)
    }
  }

  useEffect(() => {
    getLaptops();
  }, []);

  return (
    <>
      <ToastContainer />
      <LaptopContext.Provider
        value={{ laptops, deleteLaptops, updateLaptops, addLaptop, addToCart }}
      >
        {children}
      </LaptopContext.Provider>
    </>
  );
}
