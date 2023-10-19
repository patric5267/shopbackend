const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const connect = async()=>{
    try {
        const connection = await mongoose.connect(process.env.DATABASE)
        if(connection){
            console.log('Connected Successfully');
        }
    } catch (error) {
        console.log(error);
    }  
}

module.exports=connect