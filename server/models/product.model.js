const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },

    description: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Product = mongoose.model("product", productSchema)

module.exports = Product;