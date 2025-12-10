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
const http = require("http")
const { Server } = require("socket.io")

dotenv.config();

const app = express();
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.emit('greet', { message: 'Welcome to the Socket.IO server!' });

    socket.on('greet', (data) => {
        console.log('Client greeted:', data);
        socket.emit('greet', { message: 'Hello from server!' });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

app.get('/', (req, res) => {
    res.send('Socket.IO server is running');
});

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

        server.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });
