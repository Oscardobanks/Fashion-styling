import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';

const app = express()
dotenv.config()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use("/role", roleRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

// Response Handler Middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: errorMessage,
        stack: err.stack,
    })
})

//DB connection
const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch(error) {
        throw error
    }
}

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    connectMongoDB();
})