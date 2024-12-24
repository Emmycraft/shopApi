const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};
// const getProductsFromFile = async() => {
//     try {
//         const fileContent = await fs.promises.readFile(p, 'utf-8');
//         return JSON.parse(fileContent);
//     } catch (err) {
//         console.error('Error reading products file:', err);
//         return []; // Return an empty array on error
//     }
// };

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.title = title;
        this.id = id
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProIndex = products.findIndex(prod => prod.id === this.id)
                const updatedpro = [...products]
                console.log('updatedpro', updatedpro);
                updatedpro[existingProIndex] = this
                fs.writeFile(p, JSON.stringify(updatedpro), err => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString()

                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                })
            }

        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    static findbyId(id, callback) {
            getProductsFromFile(products => {
                const product = products.find(p => p.id === id)
                callback(product)
            })


        }
        //     static async findById(id) {
        //         const products = await getProductsFromFile();
        //         const product = products.find(p => p.id === id);
        //         if (product) {
        //             return product;
        //         } else {
        //             throw new Error('Product not found');
        //         }
        //     }
};