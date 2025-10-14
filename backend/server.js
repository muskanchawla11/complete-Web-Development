//const express=require('express');
//old way of doing
import express from 'express';
const app=express();

//creating a route
app.get("/",(req,res)=>{
    res.send("server is ready");
})
app.listen(5000,()=>{
    console.log("server started at 5000");
})