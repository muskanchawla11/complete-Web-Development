//const express=require('express');
//old way of doing
import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"
import cors from "cors";
import path from 'path'

// 1️⃣ Load env variables BEFORE anything else that needs them
dotenv.config();
const _dirname=path.resolve();
const app=express();
app.use(cors());
const PORT=process.env.PORT||5000
//you need a parser to parce request.body 
app.use(express.json());//allows us to accept JSON data in req.body



//how we get something that is present in env?
console.log(process.env.MONGO_URI)

app.use("/api/products",productRoutes);
//process.env.MONGO_URI(but when you try to console it , it will give undefined so for that reason we have downloaded dotenv)
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname,"frontend/frontend/dist")))
    app.get(/.*/,(req,res)=>{
        res.sendFile(path.resolve(_dirname,"frontend","frontend","dist","index.html"))


    })
}
app.listen(PORT,()=>{
    connectDB();
    console.log("server started at 5000");
})
