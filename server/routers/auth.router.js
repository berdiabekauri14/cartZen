const express = require("express")
const { SignUp, logIn } = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/signUp", SignUp)

authRouter.post("/logIn", logIn)

module.exports = authRouter