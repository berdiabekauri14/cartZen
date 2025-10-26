const express = require("express")
const { getProducts, createProduct, getProduct, deleteProduct, updateProduct } = require("../controllers/product.controller")

const ProductRouter = express.Router()

ProductRouter
    .route("/")
    .get(getProducts)
    .post(createProduct)

ProductRouter
    .route("/:id")
    .get(getProduct)
    .delete(deleteProduct)
    .patch(updateProduct)

module.exports = ProductRouter