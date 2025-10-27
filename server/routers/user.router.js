const express = require("express")
const { getUsers, createUser, getUser, deleteUser, updateUser } = require("../controllers/user.controller")

const userRouter = express.Router()

userRouter
    .route("/")
    .get(getUsers)
    .post(createUser)

userRouter
    .route("/:id")
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser)

module.exports = userRouter