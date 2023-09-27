const Products = require("../schemas/products");

const getProductsAllows = async () => {
    return Products.find();
 
};

module.exports = {
    getProductsAllows
};