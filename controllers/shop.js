const Product = require('../models/product');
const cart = require('../models/cart')
const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/shop',

        });
    });

}
const getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.findbyId(prodId, detail => {
        res.render('shop/product-details', {
            mydetail: detail,

            pageTitle: 'details ',
            path: '/shop'
        })

    })



}
const postCart = (req, res, next) => {
    const prodId = req.params.productId
    Product.findbyId(prodId, product => {
        cart.addProductCart(prodId, product.price)
    })

    res.redirect('/cart')
}

// const getProduct = async(req, res, next) => {
//     const prodId = req.params.productId;
//     try {
//         const product = await Product.findById(prodId);
//         console.log(product);
//         res.render('product-detail', { product }); // Render the product detail page
//     } catch (error) {
//         console.error(error);
//         res.status(404).send('Product not found');
//     }
// };
//adding the index for the shop
//note the path is the href path
const getIndex = (req, res, next) => {
        Product.fetchAll(product => {
            res.render('shop/index', {
                pageTitle: 'page index',

                prods: product,
                path: '/index'

            })

        })
    }
    //getting the cart page
const getCart = (req, res, next) => {

    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'shop cart'
    })
}
const getChekout = (req, res, next) => {

    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'shop checkout'
    })
}
const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/order',
        pageTitle: 'orders'
    })
}
module.exports = {
    'shopProducts': getProducts,
    'index': getIndex,
    'cart': getCart,
    'checkout': getChekout,
    'orders': getOrders,
    'oneProduct': getProduct,
    'postCart': postCart
}