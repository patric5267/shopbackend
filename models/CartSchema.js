const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    image:{
       type:String,
       required:true
    },
    oldp:{
       type:Number,
       required:true
    },
    name:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    productid:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    originalprice:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }

})

const cart = mongoose.model('cart' , cartSchema)
module.exports=cart