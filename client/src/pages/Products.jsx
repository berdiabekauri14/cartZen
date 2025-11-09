import { UseLaptop } from "../context/laptop.context";

export default function Products() {
    const { laptops, deleteLaptops, updateLaptops, addLaptop } = UseLaptop()

    return (
        <div>
            {
                laptops.map(laptop => {
                    return (
                        <div key={laptops}>
                            <h1>{laptop.brand}</h1>
                            {
                                laptops.images.map(image => {
                                    return <img key={image.id} src={image} alt="img" />
                                })
                            }
                            <p>{laptop.price}</p>
                            <button onClick={alert("Laptop has been bought!")}>Buy</button>
                            <button onClick={deleteLaptops}>Delete</button>
                            <button onClick={updateLaptops}>Update</button>
                        </div>
                    )
                })
            }
            <button onClick={addLaptop}>Add laptop</button>
        </div>
    )
}