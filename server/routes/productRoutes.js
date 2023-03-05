const { createProduct, getAllProduct, getAllProductAdmin, getProductDetails, updateProduct, deleteProduct, createProductReview, deleteReview, getProductReviews } = require('../controller/productController')
const { isAuth, authRole } = require('../middleware/auth')

const router = require('express').Router()
router.post('/product/new',isAuth,authRole('admin'),createProduct)
router.get('/products',getAllProduct)
router.get('/admin/products',isAuth,authRole('admin'),getAllProductAdmin)
router.get('/product/:id',getProductDetails)
router.put('/product/:id',isAuth,authRole('admin'),updateProduct)
router.delete('/product/:id',isAuth,authRole('admin'),deleteProduct)
router.put('/product/review',isAuth,createProductReview)
router.delete('/product/reviews/delete',isAuth,deleteReview)
router.get('/product/reviews',getProductReviews)
module.exports = router