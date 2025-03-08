import usermodel from "../models/usermodel.js";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";
import dotenv from 'dotenv';
import ordermodel from "../models/ordermodel.js";
dotenv.config();
 const register = async(req,res)=>{
    try{
        const {name,password,phone,address,role,email,secret}=req.body;
        if(!name||!password||!phone||!address||!email||!secret){
            return res.send({
                success:false,
                message:"enter all fields properly"
            });
        }
        const q=await usermodel.findOne({email});
        if(q){
            return res.send({
                success:false,
                message:"already registered user"
            })
        }
        // if(!email.contains('@')){
        //     return res.send({
        //         message:"incorrect format of mail id"
        //     })
            // if(phone.length()<10){
            //     return res.send({
            //         message:"phone no is not of 10 digits"
            //     })
            // }
        const hashed=await bcrypt.hash(password,10);
        await usermodel.create({name,password:hashed,phone,address,role,email,secret});
        res.status(200).send({
            success:true,
            message:"Create succesfully"
        })
    }
    catch(e){
        res.status(404).send({
            success:false,
            message:"error in catck block of controller",
            e
        })
    }
  
}


//  const delet=async(req,res)=>{
// try{
//     const {name}=req.body;
//     const d=await usermodel.findOne({name});
//     console.log(d);
//     if(d){
//         console.log(d._id);
//         const i=d._id;
//         await usermodel.findByIdAndDelete(d._id);
//         res.status(200).send({
//             message:"successfully deleted"
//         })
//     }
// else{
//     res.status(400).send({
//         message:"error in delet else block"
        
//     });
// }
// }
// catch(e)
// {
//     res.status(400).send({
//     message:"error in delet catch block",
//     e
// })
// }
// }
const login=async(req,res)=>{
    try{
      const {email,password}=req.body;
      if(!email||!password){
        return res.send({
            success:false,
            message:"enter all fields properly"
        })
      }
      const d=await usermodel.findOne({email});
      if(!d){
        return res.send({
            success:false,
            message:"email is wrong"
        })
      };
      const newpassword=d.password;
      const f=await bcrypt.compare(password,newpassword);
      if(!f){
        return res.send({
            success:false,
           message:"password is wrong"
        });
            
        }

        const token = await JWT.sign({ _id: d._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          d.token = token;
        return res.send({
            success:true,
            message:"user logged in successfully",
           token,
            d
        });
      }
    
    catch(e){
   return res.send({
    success:false,
    message:"error in"
   })
    }
};
const test=async(req,res,next)=>{
    try{
        res.send({
            success:true,
            ok:true,
            message:"testing"
        });
        next();
    }
    catch(e){

        res.send({
            success:false,
            ok:false,
            message:"error in test"
        })
    }
};
const studenttest=async(req,res,next)=>{
   
    try{
        res.send({
            success:true,
            ok:true,
            message:"testing"
        });
        next();
    }
    catch(e){

        res.send({
            success:false,
            ok:false,
            message:"error in test"
        })
    }
};
const forgot=async(req,res)=>{
    try{
      const {email,secret,newpassword}=req.body;
      const d=await usermodel.findOne({email});
      if(!d){
        return res.send({
            success:false,
            message:"email is wrong"
        })
      };
      if(d.secret!==secret){
        return res.send({
            success:false,
            message:"secret question is wrong"
        })
      }
      const hashed=await bcrypt.hash(newpassword,10);
      await usermodel.findByIdAndUpdate(d._id,{password:hashed});
    
    
        return res.send({
            success:true,
            message:"password reset successfully",
           
            d
        });
      }
    
    catch(e){
   return res.send({
    success:false,
    message:"error in reset password"
   })
    }
};
const updateprofile=async(req,res)=>{
try {
    const {name,email,address,secret,password,phone,i}=req.body;
    // const up=await usermodel.findOne({email});
    const up=await usermodel.findById(i);
    if(!up){
      return res.send({
          success:false,
          message:"email is wrong"
      })
    };
    if(password.length>0){
       const hashed=await bcrypt.hash(password,10);
        const d=await usermodel.findByIdAndUpdate(up._id,{name,password:hashed,email,address,phone,secret},{new:true});
        // const token = await JWT.sign({ _id: d._id }, process.env.JWT_SECRET, {
        //     expiresIn: "7d",
        //   });
        //   d.token = token;
        return res.send({
            success:true,
            message:"profile updated successfully",
        // token,
            d
        });
    }
   else{
    const d=await usermodel.findByIdAndUpdate(up._id,{name,email,address,phone,secret},{new:true});
    // const token = await JWT.sign({ _id: d._id }, process.env.JWT_SECRET, {
    //     expiresIn: "7d",
    //   });
    //   d.token = token;
    return res.send({
        success:true,
        message:"profile updated successfully",
    //  token,
        d
    });
   }

    
   
   
    
} catch (error) {
    return res.send({
        success:false,
        message:"error in reset password"
       })
}
}

  export const getOrders=async(req,res)=>{
    try {
        const {buyerid}=req.body;
        const d=await ordermodel.find({buyer:buyerid}).populate("products","-photo").populate("buyer");
        if(d.length>0){
            return res.status(200).send({
                d,
                success:true,
                message:"all orders fetched"
            }) 
        }
        else{
            return res.status(200).send({
                
                success:false,
                message:"no orders fetched"
            })
        }
        
    } catch (error) {
        return res.send({
            success:false,
            message:"error in getting orders"
           })
    }
  }
  export const getAllOrders=async(req,res)=>{
    try {
        const {buyerid}=req.body;
        const d=await ordermodel.find().populate("products","-photo").populate("buyer");
        if(d.length>0){
            return res.status(200).send({
                d,
                success:true,
                message:"all orders fetched"
            }) 
        }
        else{
            return res.status(200).send({
                
                success:false,
                message:"no orders fetched"
            })
        }
        
    } catch (error) {
        return res.send({
            success:false,
            message:"error in getting orders"
           })
    }
  }
  export const updateorder=async(req,res)=>{
    try {
        const {id,stat}=req.body;
    const d=await ordermodel.findByIdAndUpdate(id,{
        status:stat
    },{new:true})
        if(d){
            return res.status(200).send({
                d,
                success:true,
                message:"updated"
            }) 
        }
            
       else{
        return res.status(200).send({
           
            success:false,
            message:"not updated"
        }) 
       }
        
        
    } catch (error) {
        return res.send({
            success:false,
            message:"error in updating orders"
           })
    }
  }
export  {register,login,test,forgot,updateprofile,studenttest};

