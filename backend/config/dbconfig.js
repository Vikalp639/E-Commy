import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
 const connectdb=async()=>{
    await mongoose.connect(process.env.DB_URL);
    console.log('database connected successfully');
}
export default connectdb;