const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');

dotenv.config();
const app=express();

app.use(cors({
    origin:'*'
}));

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