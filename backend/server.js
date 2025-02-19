// const express = require('express');  // tradition way
import express from 'express'; // modern way (we need to add type = "module" in the package.json file to use import and export)
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js"
// import Product from './models/product.model.js';
// import mongoose from 'mongoose';

// call config function
dotenv.config();

const app = express(); // call the function 

app.use(express.json());  // allows us  to accept JSON data in the body (req.body) of the request

app.use("/api/products",productRoutes)

// listen for a port
// local host 5000 - root rout (homepage)
// if it localhost:5000/login then login rout will be app.get("/login")
// and call the call back function once it is ready 
app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
});   



