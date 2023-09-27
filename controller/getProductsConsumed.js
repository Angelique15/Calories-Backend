const { getAllConsumes } = require("../service/consumes");

const getProductsConsumedCtrl = async (req, res, next) => {
  const { date } = req.params;
  const owner = req.user._id;
  try {
    const products = await getAllConsumes({ owner, date });
    res.json({
      status: "success",
      code: 200,
      data: products,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getProductsConsumedCtrl;
