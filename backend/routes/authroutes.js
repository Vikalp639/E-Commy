import express from "express";
const router=express.Router();
import {login, register,test,forgot, updateprofile, getOrders, getAllOrders, updateorder, studenttest} from '../controllers/authcontroller.js';
import { isAdmin, requireSignin,isStudent, isS } from "../middlewares/authmiddleware.js";
// router.post('/delet',delet);
router.post('/register',register);
router.post('/login',login);
router.get('/test',requireSignin,isStudent,test);
router.get('/admin',requireSignin,isAdmin,test);
router.post('/forgot',forgot);
router.put('/update',updateprofile);
router.post('/order',requireSignin,isStudent,getOrders)
router.get('/adminorder',requireSignin,isAdmin,getAllOrders)
router.put('/updateorder',updateorder)
export default router;