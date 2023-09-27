const { updateUserInfo } = require("../service/user");

const updateUserCtrl = async (req, res, next) => {
  const { id } = req.user;
  const { calorie, notRecommendedProduct, data } = req.body;

  try {
    const result = await updateUserInfo({id: id, fields: {
      calorie,
      notRecommendedProduct,
      data,
    }});
    if (result) {
      res.json({
        status: "success update",
        code: 200,
        data: result,
      });
    } else {
      
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact not found by id ${id}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = updateUserCtrl;
