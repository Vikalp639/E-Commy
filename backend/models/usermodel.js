import mongoose from "mongoose";
const user=new mongoose.Schema({
   name: {
    type:String,
    required:true
    },
    secret:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    phone:{
        type:String,
        required:true
        },
        address:{
            type:String,
            required:true
            },
     role:{
          type:Number,
         default:0
           }
});
export default mongoose.model("vik",user);