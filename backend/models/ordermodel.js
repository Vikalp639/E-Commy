import mongoose from "mongoose";
const orderschema=new mongoose.Schema({
  products:[{
    type:mongoose.ObjectId,
    ref:'Products'
  }],
  payment:{},
  buyer:{
    type:mongoose.ObjectId,
    ref:'vik'
  },
  status:{
    type:String,
    default:'Not Process',
    enum:['Not Process','Processing','Shipped','delievered','cancel']
  }
   
});
export default mongoose.model("Order",orderschema);