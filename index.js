const express = require('express')
const app = express()
const connect = require('./db/connection')
const cors = require('cors')

connect()
app.use(cors())
          

app.use(express.json())
app.get('/' ,async(req,res)=>{
   res.send('Home')
})

app.use(require('./routes/product'))
app.use(require('./routes/Cart'))
app.use(require('./routes/Payment'))


app.listen(5000 , ()=>{
    console.log('Server started at port 5000');
})