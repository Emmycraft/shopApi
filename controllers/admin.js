const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false

    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl

    const price = req.body.price
    const description = req.body.description
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/shop');
};
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/')
    }
    const proId = req.params.productId
    Product.findbyId(proId, product => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product

        });

    })

};
exports.postEditProduct = (req, res, next) => {
    const proId = req.body.productId
    const updatedTitle = req.body.title
    const updatedImageUrl = req.body.imageUrl
    const updatedDescription = req.body.description
    const updatedPrice = req.body.price
    const updated = new Product(proId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice)
    updated.save()
    res.redirect('/admin/product-list')

}
exports.allProduct = (req, res, next) => {
    Product.fetchAll(product => {
        res.render("admin/products", {
            path: '/admin/product-list',
            pageTitle: 'Admin product',
            prods: product

        })
    })
}