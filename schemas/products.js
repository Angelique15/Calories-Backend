const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  categories: {
    type: String,
    required: [true, "Categorie required"],
  },
  weight: {
    type: Number,
    required: [true, "Weight required"],
  },
  title: {
    type: String,
    required: [true, "Title required"],
  },
  calories: {
    type: Number,
    required: [true, "Calories required"],
  },
  groupBloodNotAllowed: {
    type: Array,
  },
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;