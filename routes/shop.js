const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/shop', shopController.shopProducts);
//getting other routes
router.get('/index', shopController.index)
router.get('/cart', shopController.cart)
router.post('/cart', shopController.postCart)
router.get('/checkout', shopController.checkout)
router.get('/product/:productId', shopController.oneProduct)
router.get('/orders', shopController.orders)

module.exports = router;