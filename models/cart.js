const fs = require('fs')
const { Module } = require('module')
const path = require('path')
const { mainModule } = require('process')
const p = path.join(path.dirname(mainModule.filename), 'data', 'cart.json')
class cart {

    static addProductCart(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent)

            }
            //checking for existing product in cart
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct

            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = cart.totalPrice + productPrice
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })

    }
}
module.exports = cart