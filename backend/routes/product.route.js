import express from "express";
const router=express.Router();
import { deleteProduct,getProduct,postProduct,putProduct } from "../controller/product.controller.js";

router.get("/",getProduct)

router.post("/",postProduct);
//if you want to update all the fields use put or use patch
router.put("/:id",putProduct)
router.delete("/:id",deleteProduct)



export default router;