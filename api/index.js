import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.
connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to MongoDB!');
})
.catch((error)=>{
    console.error('Error connecting to MongoDB:', error);
     // Exit with an error code if connection fails.
});


const app = express();

app.listen(4000, () =>{
    console.log('Server running on port 4000 ');
})