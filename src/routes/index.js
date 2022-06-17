const express = require("express");

const router = express.Router();

// Controller
const {addUsers, getUsers, getUser, updateUser, deleteUser, getProfile} = require ("../controllers/user")
const {getProducts,getDetailProduct, addProduct, deleteProduct, updateProduct} = require ('../controllers/product')
const {getTransactions, addTransaction} = require('../controllers/transaction')
const {getCategory,addCategory,getDetailCategory, deleteCategory,updateCategory} = require('../controllers/category')
const {register} = require('../controllers/auth')

// Route untuk user
router.post("/user", addUsers)
router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.patch("/update-user/:id", updateUser)
router.delete("/user/:id", deleteUser)
router.get("/profile/:id", getProfile)

// Route untuk produk
router.get("/products", getProducts)
router.get("/detail-product/:id", getDetailProduct)
router.post("/product", addProduct)
router.delete("/product/:id", deleteProduct)
router.patch("/update-product/:id", updateProduct)

// Route untuk transaksi
router.get('/transactions', getTransactions)
router.post('/transaction', addTransaction)

// Route untuk category
router.get('/categories', getCategory)
router.post('/category', addCategory)
router.get("/detail-category/:id", getDetailCategory)
router.delete("/category/:id", deleteCategory)
router.patch("/update-category/:id", updateCategory)

// Route AUTH
router.post("/register", register)

module.exports = router;
