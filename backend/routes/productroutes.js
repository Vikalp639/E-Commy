import express from "express";
import { createproduct, deleteproduct, getphoto, getproduct, getproductbyid, getsingleproduct, paymentcontroller, productFiltersController, relatedproducts, searchProductController, updateproduct } from  "../controllers/productcontroller.js";
import formidable from 'express-formidable';
import { isAdmin, isStudent, requireSignin } from "../middlewares/authmiddleware.js";

const router=express.Router();
router.post('/createproduct',requireSignin,isAdmin,formidable(),createproduct);
router.get('/getproducts',getproduct);
router.get('/getsingleproduct/:slug',getsingleproduct)
router.post('/getproductbyid',getproductbyid)
router.get('/getphoto/:pid',getphoto)
router.delete('/deleteproduct/:pid',deleteproduct)
router.put('/updateproduct/:pid',requireSignin,isAdmin,formidable(),updateproduct);
router.post("/filterproducts", productFiltersController);
router.post('/search',searchProductController)
router.get('/getrelatedproducts/:pid/:cid',relatedproducts)
router.post('/make',paymentcontroller)

export default router;