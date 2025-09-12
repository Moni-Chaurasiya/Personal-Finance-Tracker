const mongoose=require('mongoose');

const transactionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required :true
    },
    category:{
        type:String,
        required:true,
        enum:['Food','Transport','Entertainment','Shopping','Bills','Salary','Other']
    },
    date:{
        type:Date,
        required:true
    },
    type:{
        type:String,
        enum:['income','expense'],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Transaction',transactionSchema)