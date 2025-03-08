import productmodel from "../models/productmodel.js";
import mongoose from "mongoose";

import fs from "fs";
import slugify from "slugify";
import ordermodel from "../models/ordermodel.js";
// import braintree from "braintree";
// import dotenv from "dotenv";



 const createproduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productmodel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getproduct = async (req, res) => {
  try {
    const products = await productmodel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// // get single product
export const getsingleproduct = async (req, res) => {
  try {
    const product = await productmodel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};
export const getproductbyid = async (req, res) => {
  try {
    const {productid}=req.body;
    const product = await productmodel
      .findOne({_id:  productid })
      .select("-photo")
      .populate("category");
      if(product){
        res.status(200).send({
          success: true,
          message: "Single Product Fetched",
          product,
        });
      }
      else{
        res.status(402).send({
          success: false,
          message: "No product found",
          
        });
      }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// // get photo
export const getphoto = async (req, res) => {

  try {
    // console.log("PID:", req.params.pid);
    const product = await productmodel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

// //delete controller
export const deleteproduct = async (req, res) => {
  try {
    await productmodel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

// //upate producta
export const updateproduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    
  
    const {photo} = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required"});
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productmodel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    
    let args = {};
    if (checked.length > 0) args.category = checked;
    
   
      if (radio.length) args.price = { "$gte": radio[0], "$lte": radio[1] };
    const products = await productmodel.find(args);
    res.status(200).send({
      success: true,
      products
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.body;
    const results = await productmodel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};
export const relatedproducts=async(req,res)=>{
  try {
    const {cid,pid}=req.params;
    const related=await productmodel.find({category:cid});
    // related=related.filter((c)=>c!==pid);
    res.status(200).send({
      success:true,
      related
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
}
export const paymentcontroller=async(req,res)=>{
  try {
    const {arr,aa}=req.body;
    if(arr.length==0)
    {
      return res.send({
       
            message:"Cart is Empty",
            success:false
        })
    }
    if(!aa){
      return res.send({
        message:'user is not found',
        success:false
      })
    }
     const q=await ordermodel.create({products:arr,buyer:aa});
           return res.status(200).send({
            q,
                message:"Order created",
                success:true
            })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error In payment",
      error,
    });
  }
}
export  {createproduct};