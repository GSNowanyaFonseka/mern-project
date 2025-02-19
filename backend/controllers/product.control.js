import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,data: products})
    }catch(error){
        console.log("error in fetching products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const createProduct = async(req, res) => {
    const product = req.body;  // get the data from the request body (user will send the data in the body) postman data that we send

    // if product name is empty can be done by this if(!product.name)
    if(!product.name ||!product.price || !product.image){
        return res.status(400).json({success:false, message:"Please provide all fields"});
    }

    // if passes the validation we can create the new product 
    // the Product come from product model.js file
    const newProduct = new Product(product)

    try{
        // save the product in a database
        await newProduct.save();
        // once we save we use (201) which means something was created and return the new product
        res.status(201).json({ success:true, data: newProduct });
    }catch(error){
        console.error("Error: ", error.message);
        res.status(500).json({success: false, message: "Server Error "});
    }

};

export const updateProduct =  async (req,res) => {
    const{id} = req.params;

    const product = req.body;  // fields like name, image and price whatever user wants to update

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product Id"});
    }

    try{
    const updatedProduct = await Product.findByIdAndUpdate(id, product,{new:true});  // returns old document before the update happen if say tru the it will give the updated object 
        res.status(200).json({success:true, data: updatedProduct});
    }catch(error){
        res.status(500).json({success:false, message:"Server Error" });
    }
};

export const deleteProduct = async(req, res)=>{
    const{id} = req.params
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product deleted"});
    }catch(error){
        console.log("error in deleting product:", error.message);
        res.status(404).json({success:false, message:"Product id is not foundd"});
    }
};