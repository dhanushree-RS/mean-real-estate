// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        // process.exit(1); // Exit with an error code if connection fails
    });

app.use(express.json());
app.use(cookieParser());``
// Use routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Start server
app.listen(4000, () => {
    console.log('Server running on port 4000!');
});


app.use((err,req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});