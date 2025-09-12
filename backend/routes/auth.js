const express= require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const User= require("../models/User")
const auth= require("../middleware/auth")

router.post('/register',async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:'User already exists'})
        } 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        user=new user({
            name,
            email,
            password:hashedPassword
        });
        await user.save()

        const payload={
            user:{
              id:user.id
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {expiresIn:'7d'},
            (error,token)=>{
            if(error) throw error;
            res.json({
                token,
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email
                }})
        })

    } catch (error) {
        console.log("Error while registering the user",err);
        res.status(500).send({
            message: 'Some error happened while registering the user'
        })
    }
})

router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'User is not registered'})
        }
        const hashedPassword= user.password.toString();
        const enteredPassword=password.toString();

        const isPasswordValid=await bcrypt.compare(enteredPassword,hashedPassword);
        if(!isPasswordValid){
            return res.status(401).send({
                message:'Wrong password entered'
            })
        }
        const payload={
            user:{
                id:user.id
            }
        };

        jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'7d'},
            (err,token)=>{
                if(err) throw err;
                res.json({token,user:{id:user.id,name:user.name,email:user.email}})
            }
        )
    } catch (error) {
        console.log("Error while login the user",error.message)
        res.status(500).send("server error")
        
    }
})

router.get('./user',auth ,async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
         console.log("Error getting user", error.message)
         res.status(500).send('Server error');
    }
})

module.exports=router;