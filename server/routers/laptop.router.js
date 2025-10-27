const express = require("express")
const { getLaptops, createLaptop, getLaptop, deleteLaptop, updateLaptop } = require("../controllers/laptop.controller")
const upload = require("../config/multer")

const laptopRouter = express.Router()

laptopRouter
    .route("/")
    .get(upload.array("images", 4), getLaptops)
    .post(createLaptop)

laptopRouter
    .route("/:id")
    .get(getLaptop)
    .delete(deleteLaptop)
    .patch(updateLaptop)

module.exports = laptopRouter