const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.newOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({
        success:true,
        order
    })
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
  }
};

exports.getSingleOrder = async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate('user','name email')
        if(!order){
            res.status(404).json({
                success:false,
                message:'order not found'
            })
        }
        res.status(200).json({
            success:true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.myOrders = async(req,res)=>{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json({
        success:true,
        orders
    })
}

exports.getAllOrders = async(req,res)=>{
    const orders = await Order.find()
    let totalAmount = 0
    orders.forEach((order)=>{
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
}

exports.updateOrder = async(req,res)=>{
    const order =await Order.findById(req.params.id)
    if(!order){
        res.status(404).json({
            success:false,
            message:'order not found'
        })
    }
    if(order.orderStatus === 'Delivered'){
        res.status(400).json({
            success:false,
            message:"You've already Delivered this Order"
        })
    }
    if(req.body.status === 'Shipped'){
        order.orderItems.forEach(async (o)=>{
            await updateStock(o.product,o.quantity)
        })
    }
    order.orderStatus = req.body.status
    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now()
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })
    async function updateStock(id,quantity){
        const product = await Product.findById(id)
        product.Stock -= quantity
        await product.save({validateBeforeSave:false})
    }
}

exports.deleteOrder = async(req,res)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        res.status(404).json({
            success:false,
            message:'order not found'
        })
    }
    res.status(200).json({
        success:true
    })
}