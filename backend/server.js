import express from 'express';
import cors from 'cors';
const app=express();
import authroutes from './routes/authroutes.js';
import productroutes from './routes/productroutes.js'
import categoryroutes from './routes/categoryroutes.js'
import dotenv from 'dotenv';
import connectdb from './config/dbconfig.js';
import path from 'path';
dotenv.config();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.use(express.json());
app.use(cors());
const corsOptions = {
    origin: 'https://e-commy.onrender.com', // Replace with your frontend URL
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));
// app.get('http://https://e-commy-1.onrender.com/host:3000/api/v1/make', (req, res) => {
//     res.send('OK');
//   });
const PORT=process.env.PORT||4000;


app.listen(PORT,()=>{
    connectdb();
    console.log("Sever created");
});


app.use('/api/v1',authroutes);
app.use('/api/v1',categoryroutes);
app.use('/api/v1',productroutes)