const User = require("user.model");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken")

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.lt;

        if (!token) {
            return next(new AppError("user is not logged in!", 401))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return next(new AppError("token is invalid", 400))
        }

        console.log(decoded)

        const user = await User.findById(decoded.id)

        if (!user) {
            return next(new AppError("user cam't be found!", 404))
        }

        if (!user.isVerified) {
            return next(new AppError("User is not verified! please verify your email", 401))
        }

        console.log(user)

        req.user = user;
        
        next()

    } catch(err) {
        if (err.name === "TokenExpiredError") {
            return next(new AppError("you are not authorized", 401))
        }
    }
}

module.exports = { protect, allowedTo }