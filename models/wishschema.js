const mongoose = require('mongoose')

const wishSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    originalprice:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productid:{
        type:Number,
        required:true
    }
})

const wish = mongoose.model('wish' , wishSchema)
module.exports=wish