import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.control.js";

const router = express.Router();

router.get("/", getProducts);

// create rout (listen for get method)
// if we gonna say router.get("/products") - and then it's gonna give us all the products that we have in the database 
// make the method as async so we can use await keyword
router.post("/", createProduct);

// patch - when want to update some fields on the resource 
// if update all the fields then use put 
router.put("/:id", updateProduct);

// to check this out without frontend we use postman desktop application 

// if we save this it will display as undifined in the console (we cannot access to it by default)  we installed package called ENV to solve this problem
// then we can import dotenv and calling dotenv.config(); function then will be able to see the content in the terminal
// that means we can access to it and just read it from the terminal
// so we will use this to connect out database (create config/db.js)
// console.log(process.env.MONGO_URI);

// :id- dynamic can be any value
// we can delete any product by id 
// copy the id in the db and paste the url /api/products/id
router.delete("/:id", deleteProduct);

export default router;