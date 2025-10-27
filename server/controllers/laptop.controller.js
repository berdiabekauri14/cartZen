
const Laptop = require("../models/laptop.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

const getLaptops = catchAsync(async (req, res, next) => {
    const laptop = await Laptop.find()

    res.status(200).json(laptop)
})

const getLaptop = catchAsync(async (req, res, next) => {
    const laptop = await Laptop.findById(req.params.id)

    if (laptop) {
        res.json(laptop)
    } else {
        return next(new AppError("Laptop not found", 404))
    }
})

const createLaptop = catchAsync(async (req, res, next) => {
    const { brand, model, processor, ram, storage, graphics, display, os, price, stock, description, isAvaible } = req.body;
    const { file } = req;

    const newLaptop = Laptop.create(
        {
            laptopImg: file ? file.filename : null,
            brand, 
            model, 
            processor, 
            ram, 
            storage, 
            graphics, 
            display, 
            os, 
            price, 
            stock, 
            description, 
            isAvaible
        }
    )

    res.status(201).json(newLaptop)
})

const deleteLaptop = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const laptop = Laptop.findById(id)

    if (!laptop) {
        return next(new AppError("laptop not found", 404))
    }

    await laptop.findByIdAndDelete(id)

    res.send(`Laptop ${laptop} is deleted succesfuly!`)
})

const updateLaptop = catchAsync(async (req, res, next) => {
    const { id } = req.parans
    
    const { brand, model, processor, ram, storage, graphics, display, os, price, stock, description, isAvaible } = req.body;

    const laptop = Laptop.findById(id)

    if (!product) {
        return next(new AppError("Laptop not found", 404))
    }

    if(brand) laptop.brand = brand
    if(price) laptop.price = price
    if(description) laptop.description = description
    if(model) laptop.model = model
    if(processor) laptop.processor = processor
    if(ram) laptop.storage = storage
    if(graphics) laptop.graphics = graphics
    if(display) laptop.display = display
    if(os) laptop.os = os
    if(stock) laptop.stock = stock
    if(isAvaible) laptop.isAvaible = isAvaible

    await laptop.save()

    res.json(laptop)
})

module.exports = { getLaptops, getLaptop, createLaptop, deleteLaptop, updateLaptop }