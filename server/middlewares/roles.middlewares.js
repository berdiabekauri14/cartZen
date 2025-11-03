const AppError = require("../utils/appError")

const allow = (...roles) => {
    return (req, res, next) => {
        if (!roles.include(req.user.role)) {
            return next(new AppError("You dont have permission!", 401))
        }

        next()
    }
}

module.exports = allow