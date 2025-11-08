import { useContext } from "react";
import { LaptopContext } from "../context/laptop.context";

export default function Products() {
    const { laptops } = useContext(LaptopContext)

    return (
        <div>
            {
                laptops.map(laptop => {
                    return (
                        <div key={laptops}>
                            <h1>{laptop.brand}</h1>
                            <p>{laptop.price}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}