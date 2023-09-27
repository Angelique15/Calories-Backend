const { getProductsAllows } = require("../service/products");

const getAllowedFoods = async (req, res, next) => {
  const { userBloodType } = req.params;

  try {
    const products = await getProductsAllows();
    const productsAllows = products.filter(
      (product) => product.groupBloodNotAllowed[userBloodType] === false
    );
    if (productsAllows) {
      res.json({
        status: "success",
        code: 200,
        data: productsAllows,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getAllowedFoods;
