
const router = require('express').Router()
const { registerUser, loginUser, logoutUser, updateUserRole, getUserDetails, getSingleUser } = require('../controller/userController')
const { isAuth, authRole } = require('../middleware/auth')

router.post('/user/register',registerUser)
router.post('/user/login',loginUser)
router.get('/user/logout',logoutUser)
router.get('/user/me',isAuth,getUserDetails)
router.get('/user/:id',isAuth,authRole('admin'),getSingleUser)
router.put('/user/role/:id',isAuth,authRole('admin'),updateUserRole)
module.exports = router