const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter your Name'],
        maxLength:[30,'Name cannot be exceed 30 charecter'],
        minLength:[4,'Name should have more than 4 charecters']
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid email"]
    },
    password:{
        type:String,
        required:[true,'Please Enter your password'],
        minLength:[6,"password should be greater than 6 charecter"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:String
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_KEY,{expiresIn:'7d'})
}

//Generating Password Reset token
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    //hashing
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 15 + 60 * 1000
    return resetToken
}

//compare password

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password,this.password)
}
const User = mongoose.model('User',userSchema)
module.exports = User