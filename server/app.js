const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const laptopRouter = require('./routers/laptop.router');
const globalErrorHandler = require('./controllers/error.controller');
const authRouter = require('./routers/auth.router');

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

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
