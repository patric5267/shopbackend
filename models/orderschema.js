const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    email:{
        type:String,
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
    img:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
})

const order = mongoose.model('order' , orderSchema)
module.exports=order