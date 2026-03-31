import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/dbConnection.js';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();
const app = express();
connectDB()
// parsing json data in request body
app.use(express.json());

// Implimenting user route
app.use('/users',userRoute);

// Implimenting post route
app.use('/posts', postRoute);

// home route
app.use('/', (req, res) => {
     res.status(201).json({
    status: "success",
    messaage:"Welcome to the home"
  });
});

// Implimenting error handler
app.use(errorHandler)
export default app;