const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const laptopRouter = require('./routers/laptop.router');
const globalErrorHandler = require('./controllers/error.controller');
const authRouter = require('./routers/auth.router');
const rateLimit = require("rateLimit")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet");
const stripeRouter = require('./routers/stripe.router');

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(rateLimit({
    windowsMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests, Please try again later."
}))
app.use(mongoSanitize())
app.use(helmet())
app.use("/payment", stripeRouter);

app.use('/api/laptops', laptopRouter);
app.use('/api/auth', authRouter)

app.use(globalErrorHandler); 

mongoose.connect(process.env.DB)
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });
