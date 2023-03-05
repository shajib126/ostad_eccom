const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
exports.isAuth = async(req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        res.status(401).json({
            success:false,
            message:"Please Login to access this resource"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_KEY)
    req.user = await User.findById(decoded.id)
    next()
}

exports.authRole = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                success:false,
                message:`Role: ${req.user.role} is not allowed to access this resource`
            })
        }
        next()
    }
}