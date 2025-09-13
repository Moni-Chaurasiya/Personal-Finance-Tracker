const express= require('express');
const router = express.Router()
const Transaction=require('../models/Transaction');
const auth= require('../middleware/auth');

router.post('/',auth, async(req,res)=>{
    try {
        const {title,amount,category,date,type} = req.body;
        const newTransaction= new Transaction({
            user:req.user.id,
            title,
            amount,
            category,
            date,
            type
        })
        const transaction = await newTransaction.save();
        res.json(transaction);
    } catch (error) {
        console.error("Error while posting transaction ",error.message)
        res.status(500).send('Server error')
    }
})

router.put('/:id',auth,async(req,res)=>{
    try {
        const {title,amount,category,date,type}= req.body;
        const transaction=await Transaction.findByIdAndUpdate(
            {
                _id: req.params.id,
                user:req.user.id
            },
            {
                title, amount,category,date,type
            },
            {
                new:true
            }
        )
        if(!transaction){
            return res.status(404).json({message:'Transaction not found'})
        }
        res.json(Transaction);
    } catch (error) {
        console.error("Error while updating transaction ",error.message)
        res.status(500).send('Server error')
    }
})

router.get('/:id',auth,async(req,res)=>{
    try {
        const transaction= await Transaction.findOne({
            _id:req.params.id,
            user:req.user.id
        })
        if(!transaction){
            return res.status(404).json({message: 'Transaction not found'})
        }
        res.json(transaction);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})

router.delete('/:id' ,auth,async (req,res)=>{
    try {
        const transaction=await Transaction.findByIdAndDelete({
            _id:req.params.id,
            user:req.user.id
        })
        if(!transaction){
            return res.status(404).json({message:'Transaction not found'})
        }
        res.json({message:'Transaction deleted'});
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error');
    }
})

router.get('/',auth,async (req,res)=>{
    try {
        const {category,type,startDate,endDate}=req.query;
        let query={user:req.user.id};

        if(category) query.category=category;
        if(type) query.type=type;
        if(startDate || endDate){
            query.date={};
            if(startDate) query.date.$gte=new Date(startDate);
            if(endDate) query.date.$lte=new Date(endDate)
        }
        const transaction=await Transaction.find(query).sort({date:-1})
        res.json(transaction);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})

module.exports=router;
