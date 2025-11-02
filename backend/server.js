const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');

dotenv.config();
const app=express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://personal-finance-trackers-hazel.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



// app.use(cors({
//     origin:'*'
// }));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('MongoDB connected')).catch((err)=>console.log('MongoDB connection error:',err))

app.use('/api/auth',require('./routes/auth'));
app.use('/api/transaction',require('./routes/transactions'))

app.get('/',(req,res)=>{
    res.json({message:'Finance Tracker API is running'})
})

const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})