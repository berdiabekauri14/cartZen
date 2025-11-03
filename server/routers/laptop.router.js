const express = require("express")
const { getLaptops, createLaptop, getLaptop, deleteLaptop, updateLaptop } = require("../controllers/laptop.controller")
const upload = require("../config/multer")
const protect = require("../middlewares/auth.middlewares")
const allow = require("../middlewares/roles.middlewares")

const laptopRouter = express.Router()

laptopRouter
    .route("/")
    .get(upload.array("images", 4), getLaptops)
    .post(protect, allow("admin", "moderator"), createLaptop)
laptopRouter
    .route("/:id")
    .get(getLaptop)
    .delete(protect, allow("admin", "moderator"), deleteLaptop)
    .patch(protect, allow("admin", "moderator"), updateLaptop)

module.exports = laptopRouter