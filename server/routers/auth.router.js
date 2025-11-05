const express = require("express")
const { SignUp, logIn } = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/signUp", SignUp)

authRouter.post("/logIn", logIn)

authRouter.post("/auto-login", (req, res, next) => {
    res.status(200).json(req)
})

module.exports = authRouter