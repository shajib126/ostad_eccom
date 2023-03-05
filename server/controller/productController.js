const cloudinary = require('cloudinary')
const Product = require('../models/productModel')
const ApiFeatures = require('../utils/apiFeatures')
exports.createProduct = async(req,res)=>{
    try {
      let images = []
      if(typeof req.body.images === 'string'){
        images.push(req.body.images)
      }else{
        images = req.body.images
      }
      const imageLinks = []
      for(let i =0; i<images.length;i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder:'products'
        })

        imageLinks.push({
            public_id:result.public_id,
            url:result.secure_url
        })
      }
      req.body.images = imageLinks
      req.body.user = req.user.id
      const product = await Product.create(req.body)
      res.status(201).json({
        success:true,
        product
      })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllProduct = async(req,res)=>{
    try {
        const resultPerPage = 8
        const productsCount = await Product.countDocuments()
        const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter()

        let products = await apiFeature.query
        let filteredProductsCount = products.length
        apiFeature.pagination(resultPerPage)
        products = await apiFeature.query

        res.status(200).json({
          success:true,
          products,
          productsCount,
          resultPerPage,
          filteredProductsCount
        })
    } catch (error) {
        res.status(500).json({
          success:false,
          message:error.message
        })
    }
}

exports.getAllProductAdmin = async(req,res)=>{
  try {
    const products = await Product.find()
    res.status(200).json({
      success:true,
      products
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.getProductDetails = async(req,res)=>{
  try {
    const product = await Product.findById(req.params.id)
    if(!product){
      res.status(404).json({
        success:false,
        message:'Product not found'
      })
    }
    res.status(200).json({
      success:true,
      product
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.updateProduct = async(req,res)=>{
  try {
    let product = await Product.findById(req.params.id)
    if(!product){
      res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }
    let images = []
    if(typeof req.body.images === 'string'){
      images.push(req.body.images)
    }else{
      images = req.body.images
    }
    if(images !== undefined){
      for(let i = 0; i<images.length;i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
      }
      const imagesLinks = []
      for(let i = 0; i<images.length;i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
          folder:'products'
        })
        imagesLinks.push({
          public_id:result.public_id,
          url:result.secure_url
        })
      }
      req.body.images = imagesLinks
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModifie:false
    })
    res.status(200).json({
      success:true,
      product
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.deleteProduct = async(req,res)=>{
  const product = await Product.findById(req.params.id)
  if(!product){
    res.status(404).json({
      success:false,
      message:"Product not found"
    })
  }

  for(let i = 0; i<product.images.length;i++){
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
  }
  await product.remove()
  res.status(200).json({
    success:true,
    message:"Product delete successfully"
  })
}

exports.createProductReview = async(req,res)=>{
  try {
    const {rating,comment,productId} = req.body
    const review = {
      user:req.user._id,
      name:req.user.name,
      rating:Number(rating),
      comment
    }
    const product = await Product.findById(productId)
    if(!product){
      res.status(404).json({
        success:false,
        message:'Product not found'
      })
    }
    const isReviewed = product.reviews.find((rev)=>rev.user.toString() === req.user._id.toString())
    if(isReviewed){
      product.reviews.forEach((rev)=>{
        if(rev.user.toString() === req.user._id.toString())
          (rev.rating = rating),(rev.comment = comment)
      })
    }else{
      product.reviews.push(review)
      product.numOfReviews = product.reviews.length
    }
    let avg = 0
    product.reviews.forEach((rev)=>{
      avg += rev.rating
    })
    product.rating = avg/product.reviews.length
    await product.save({validateBeforeSave:false})
    res.status(200).json({
      success:true,
      product
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.getProductReviews = async(req,res)=>{
  const product = await Product.findById(req.query.id)
  if(!product){
    res.status(404).json({
      success:false,
      message:'product not found'
    })
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
}

exports.deleteReview = async(req,res)=>{
  try {
    const product = await Product.findById(req.query.productId)
    if(!product){
      res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }
    const reviews = product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString())
    let avg = 0
    reviews.forEach((rev)=>{
      avg += rev.rating
    })
    let ratings = 0
    if(reviews.length === 0){
      ratings = 0
    }else{
      ratings = avg / reviews.length
    }

    const numOfReviews = reviews.length
    await Product.findByIdAndUpdate(req.query.productId,{
      reviews,
      ratings,
      numOfReviews
    },{
      new:true,
      runValidators:true,
      useFindAndModifie:false
    })
    res.status(200).json({
      success:true,
      message:"Product revirew delete successfully"
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}