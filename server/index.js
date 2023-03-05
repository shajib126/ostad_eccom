const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cloudinary = require('cloudinary')

const cors = require('cors')
const app = express()

dotenv.config()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//router middleware
app.use('/api/v1',userRoutes)
app.use('/api/v1',productRoutes)

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`DB connected ${mongoose.connection.host}`)
}).catch((err)=>{
    console.log(`${err}`)
}).finally(()=>{
    const port = process.env.PORT
    app.listen(port,()=>console.log(`server running in port ${port}`))
})