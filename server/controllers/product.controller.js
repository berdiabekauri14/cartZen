const Product = require("../models/product.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

const getProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find()

    res.status(200).json(products)
})

const getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        return next(new AppError("Product not found", 404))
    }
})

const createProduct = catchAsync(async (req, res, next) => {
    const { name, price, description } = req.body;

    const newProduct = Product.create(
        {
            name,
            price,
            description
        }
    )

    res.status(201).json(newProduct)
})

const deleteProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const product = Product.findById(id)

    if (!product) {
        return next(new AppError("Product not found", 404))
    }

    await Product.findByIdAndDelete(id)

    res.send(`Product ${product} is deleted succesfuly!`)
})

const updateProduct = catchAsync(async (req, res, next) => {
    const { id } = req.parans
    
    const { name, price, description } = req.body;

    const product = Product.findById(id)

    if (!product) {
        return next(new AppError("Product not found", 404))
    }

    if(name) product.name = name
    if(price) product.price = price
    if(description) product.description = description

    await product.save()

    res.json(product)
})

module.exports = { getProducts, getProduct, createProduct, deleteProduct, updateProduct }