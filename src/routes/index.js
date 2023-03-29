const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const productImgRouter = require('./productImg.router');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const router = express.Router();

router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/productsImg', productImgRouter)
router.use('/cart', routerCart)
router.use('/purchase', routerPurchase)

module.exports = router;