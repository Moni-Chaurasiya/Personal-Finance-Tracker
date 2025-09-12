const mongoose= require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    cretedAt:{
        type:Date,
        default:Date.now
    }

});
module.exports=mongoose.model('User',userSchema);