const cloudinary = require('cloudinary')
const User = require('../models/userModel')
exports.registerUser = async(req,res)=>{
    const {name,email,password,avatar} = req.body
    try {
        const isExist = await User.findOne({email})
        if(isExist){
            res.status(400).json({
                success:false,
                message:'User already registered by this email, please login'
            })
        }
        const myCloud = await cloudinary.v2.uploader.upload(avatar,{
            folder:"ecomUsers",
            width:150,
            crop:"scale"
        })
        const user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        })
        const token = user.getJWTToken()
        const options = {
            httpOnly:true
        }
        res.status(201).cookie('token',token,options).json({
            success:true,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.loginUser = async(req,res)=>{
    try {
        const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            success:false,
            message:"Please enter email and password"
        })
      }
      const user = await User.findOne({ email }).select("+password");
      if(!user){
        res.status(404).json({
            success:false,
            message:"Use not found"
        })
      }
      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
       res.status(401).json({
        success:false,
        message:"Invalid email or password"
       })
      }
      const token = user.getJWTToken()
        const options = {
            httpOnly:true
        }
        res.status(201).cookie('token',token,options).json({
            success:true,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}
exports.logoutUser = async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out",
      });
}

exports.getUserDetails = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            res.status(404).json({
                success:false,
                message:'user not found'
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        
    }
}

exports.getAllUser = async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getSingleUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).json({
                success:false,
                message:'user not found'
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateUserRole = async(req,res)=>{
    try {
        const roleData = {
            role:req.body.role
        }
        const user = await User.findByIdAndUpdate(req.params.id,roleData,{
            new:true
        })
        
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}