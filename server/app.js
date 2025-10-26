const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const mongoose = require("mongoose")
const globalErrorHandler = require("./controllers/error.controller")
const ProductRouter = require("./routers/product.router")

const app = express()

dotenv.config()

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(globalErrorHandler)

app.use("/products", ProductRouter)

mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log("MongoDB is succesfully running")
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(`Error has been appeared in your code: ${err}`))

