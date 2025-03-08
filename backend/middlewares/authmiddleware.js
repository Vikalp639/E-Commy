import jwt from "jsonwebtoken";
import usermodel from '../models/usermodel.js';
import dotenv from 'dotenv';
dotenv.config();
export const requireSignin = async(req, res, next) => {
    try{
        const token=req.headers.authorization;
        if(token){
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
            
        }
        else{
           return res.status(400).send({
                success:false,
                message:"user not verified"
            })
        };
        next();
    }
    catch(e){
       return res.status(400).send({
            success:false,
            message:"error in requireSignin"
        });
    }
   
}
export const isStudent = async (req, res, next) => {
    try {
        const id = req.user._id;
        const d = await usermodel.findOne({ _id: id });
        if (!d) {
            return res.send({
                success: false,
                message: "user not found"
            });
        }
        if(d.role!==0) {
            return res.send({
                 success: false,
                message: "user is not student"
            });
        } 
        next();
    } catch (e) {
        return res.status(400).send({
            success: false,
            message: "error in isStudent"
        });
    }
};
export const isAdmin = async(req, res, next) => {
    try{
        const id=req.user._id;
        const d=await usermodel.findOne({_id:id});
        if(!d){
        return res.send({
                success:false,
                message:"user not found"
            });
        }
        if(d.role!==1){
          return  res.send({
                 success:false,
                message:"user is not admin"
            });
        }
       
        next();
    }
    catch(e){
       return  res.status(400).send({
            success:false,
            message:"error in isAdmin"
        });
    }
}
export const isS = async(req, res, next) => {
    try{
        const id=req.user._id;
        const d=await usermodel.findOne({_id:id});
        if(!d){
        return res.send({
                success:false,
                message:"user not found"
            });
        }
        if(d.role!==0){
            
          return  res.send({
                 success:false,
                message:"user is not admin"
            });
        }
       
        next();
    }
    catch(e){
       return  res.status(400).send({
            success:false,
            message:"error in isAdmin"
        });
    }
}