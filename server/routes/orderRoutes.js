const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controller/orderController')
const { isAuth, authRole } = require('../middleware/auth')

const router = require('express').Router()
    router.post('/order/new',isAuth,newOrder)
    router.get('/order/:id',isAuth,getSingleOrder)
    router.get('/orders/me',isAuth,myOrders)
    router.get('/admin/orders',isAuth,authRole('admin'),getAllOrders)
    router.put('/admin/order/:id',isAuth,authRole('admin'),updateOrder)
    router.delete('/admin/order/:id',isAuth,authRole('admin'),deleteOrder)

module.exports = router