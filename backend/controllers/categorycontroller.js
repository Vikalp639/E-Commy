import slugify from "slugify";
import categorymodel from "../models/categorymodel.js";
const updatecategory=async(req,res)=>{
    try{
      const {name}=req.body;
      const {id}=req.params;
      const category=await categorymodel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    //   if(!category){
    //     return res.status(400).send({
    //         success:false,
    //         message:"category not found",
           
    //       })
    //   }
     res.status(200).send({
        success:true,
        message:"Category updated successfully",
        category
      })
    }
    catch(e){
        return res.send({
            success:false,
           message:"error in catch block of updatecategory"
        })
     
      
    }
}
const deletecategory=async(req,res)=>{
    try{
     
      const {id}=req.params;
      await categorymodel.findByIdAndDelete(id);
   
     res.status(200).send({
        success:true,
        message:"Category deleted successfully",
        
      })
    }
    catch(e){
        return res.status(404).send({
            success:false,
           message:"error in catch block of updatecategory"
        })
     
      
    }
}
const getcategory=async(req,res)=>{
    try{
     const category=await categorymodel.find({});
     res.status(200).send({
        success:true,
        category
     })
    }
    catch(e){
        return res.status(404).send({
            success:false,
           message:"error in catch block of getcategory"
        })
    }
}
const getsinglecategory=async(req,res)=>{
    try{
        const {name}=req.body;
     const cate=await categorymodel.findOne({name});
     if(!cate){
        res.send({
            success:false
        })
     }
     else{
        res.status(200).send({
            success:true,
            cate
         })
    
     }
    }
    catch(e){
        return res.status(404).send({
            success:false,
           message:"error in catch block of getsinglecategory"
        })
    }
}
const createcategory=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.send({
                success:false,
                message:"name is required"
            })
        }
        const existing=await categorymodel.findOne({name});
        if(existing){
            return res.send({
                success:false,
                message:"Category already exists"
            })
        }
        const q=await categorymodel.create({name});
       return res.status(200).send({
            message:"Category created",
            success:true
        })
    }
    catch(e){
        console.log(e);
       return res.status(404).send({
            success:false
        })
    }
}
export {createcategory,updatecategory,getcategory,getsinglecategory,deletecategory};