import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    }
    ,
    image:{
        type:String,
        required:true
    }
    
},
{timestamps:true}
);
const Product=mongoose.model('Product',productSchema);
//why putting Product why not products->because moongose wants you to write in capital and prural rest it handles it will convert it to->products
export default Product;