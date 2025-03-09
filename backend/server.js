// import express from 'express';
// import cors from 'cors';

// import authroutes from './routes/authroutes.js';
// import productroutes from './routes/productroutes.js'
// import categoryroutes from './routes/categoryroutes.js'
// import dotenv from 'dotenv';
// import connectdb from './config/dbconfig.js';
// import path from 'path';
// dotenv.config();
// const app=express();
// app.use(express.json());
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) =>{
//     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });

// app.use(cors({
//     origin:"http://localhost:8000",
//     credentials:true
// }));
// // const corsOptions = {
// //     origin: 'https://e-commy.onrender.com', // Replace with your frontend URL
// //     optionsSuccessStatus: 200,
// //   };
  
// //   app.use(cors(corsOptions));

// const PORT=process.env.PORT;


// app.listen(PORT,()=>{
//     connectdb();
//     console.log("Sever created");
//     console.log(`Server is running on port ${PORT}`);
// });


// app.use('/api/v1',authroutes);
// app.use('/api/v1',categoryroutes);
// app.use('/api/v1',productroutes)



import express from 'express';
import cors from 'cors';
import authroutes from './routes/authroutes.js';
import productroutes from './routes/productroutes.js';
import categoryroutes from './routes/categoryroutes.js';
import dotenv from 'dotenv';
import connectdb from './config/dbconfig.js';
import path from 'path';

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(express.json());

const corsOptions = {
  origin: 'https://e-commy.onrender.com', // Replace with your frontend URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect to the database
connectdb();

// Define API routes
app.use('/api/v1', authroutes);
app.use('/api/v1', categoryroutes);
app.use('/api/v1', productroutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/dist")));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server created");
  console.log(`Server is running on port ${PORT}`);
});