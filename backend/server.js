import express from 'express';
import cors from 'cors';
const app=express();
import authroutes from './routes/authroutes.js';
import productroutes from './routes/productroutes.js'
import categoryroutes from './routes/categoryroutes.js'
import dotenv from 'dotenv';
import connectdb from './config/dbconfig.js';

dotenv.config();
app.use(express.json());
app.use(cors());
// app.get('http://localhost:3000/api/v1/make', (req, res) => {
//     res.send('OK');
//   });
const PORT=process.env.PORT;


app.listen(PORT,()=>{
    connectdb();
    console.log("Sever created");
});


app.use('/api/v1',authroutes);
app.use('/api/v1',categoryroutes);
app.use('/api/v1',productroutes)