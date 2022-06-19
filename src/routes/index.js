// IMPORT PACKAGES
const express = require("express")
const router  = express.Router()


// CONTROLLER
const { addUsers , getUsers , getUser , updateUser , deleteUser , getProfile , addProfile , updateProfile , getProfiles } = require("../controllers/user")
const { getProducts , getDetailProduct , addProduct , deleteProduct , updateProduct } = require('../controllers/product')
const { getTransactions , addTransaction , deleteTransaction } = require('../controllers/transaction')
const { getCategory , addCategory , getDetailCategory , deleteCategory,updateCategory } = require('../controllers/category')
const { register , login , checkAuth } = require('../controllers/auth')


// MIDDLEWARE
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')


// ROUTES FOR USER
router.post("/user" , addUsers)
router.get("/users", auth , getUsers)
router.get("/user/:id" , getUser)
router.patch("/update-user/:id" , updateUser)
router.delete("/user/:id" , deleteUser)


// ROUTES FOR PROFILE
router.get("/profile/:id" , getProfile)
router.patch("/update-profile/:id" , updateProfile)
router.post("/profile" , auth , uploadFile('image') , addProfile)
router.get("/profiles" , auth , getProfiles)


// ROUTE FOR PRODUCT
router.get("/products" , getProducts)
router.get("/detail-product/:id" , auth , getDetailProduct)
router.post("/product" , auth , uploadFile('image') , addProduct)
router.delete("/product/:id",auth , deleteProduct)
router.patch("/update-product/:id",auth , updateProduct)


// ROUTE FOR TRANSACTION
router.get('/transactions' , auth , getTransactions)
router.post('/transaction' , auth , addTransaction)
router.delete('/transaction/:id' , auth , deleteTransaction)


// ROUTE FOR CATEGORY
router.get('/categories' , getCategory)
router.post('/category' , auth , addCategory)
router.get("/detail-category/:id" , auth , getDetailCategory)
router.delete("/category/:id" , auth , deleteCategory)
router.patch("/update-category/:id" , auth , updateCategory)


// ROUTE FOR AUTH
router.post("/register" , register)
router.post("/login" , login)
router.get("/auth" , auth , checkAuth)

module.exports = router
