import Product from "../model/product.model.js";
import mongoose from "mongoose";

export const getProduct=async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json({success:"true",data:products});
    }
    catch(error){
        console.log("error in fetching products: ", error.message);
        res.status(500).json({success:false,message:"server error"});
    }
}

export const postProduct=async(req,res)=>{
    const product=req.body;//user will send this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"Please provide all fields"});
    }
    const newProduct=new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch(err){
        console.error("Error in Create product:",err.message);
        res.status(500).json({success:false,message:"server error"});
    }
}

export const putProduct=async(req,res)=>{
    //first get the id from req body
    const {id}=req.params;
    const product=req.body;
    //check if the id was not valid 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid product id"});
    }
    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        //what is this new:true? by default findByIdAndUpdate returns the document as it was before update was routerlied, if we set new:true then it will give object after update was applied
        res.status(200).json({success:true,data:updatedProduct});
    }
    catch(error){
        res.status(500).json({success:false,message:"server error"});
    }
}
export const deleteProduct=async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    try{
        await Product.findByIdAndDelete(id);
        
        res.status(200).json({success:true,message:"Product deleted"})
    }
    catch(err){
        res.status(500).json({success:false,message:"SERVER ERROR+-"})

    }
}