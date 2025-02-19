import mongoose from 'mongoose';

// create a schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
}, {
    timestamps: true   // whenever created a product this timestamps just make sure it has created at and 
    //updated as fields on each document  (createdAt, updatedAt)
});

// here we use mongoose.model('Product', productSchema) 'Product' as singular and uppercase
// mongoose going to convert it to  'products' as plural and lowercase
const Product = mongoose.model('Product', productSchema);

export default Product;