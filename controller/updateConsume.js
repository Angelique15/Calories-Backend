const {
  addConsumes,
  getAllConsumes,
  updateConsumesDate,
} = require("../service/consumes");

const updateConsumeCtrl = async (req, res, next) => {
  const { date, products } = req.body;

  const owner = req.user._id;
  try {
    const data = await getAllConsumes({ owner, date });

    if (data.length === 0) {
      const result = await addConsumes({ date, products, owner });
      res.json({
        status: "success",
        code: 200,
        data: result,
      });
    } else {
      const id = data[0]._id;
      const resultUpdate = await updateConsumesDate(id, products);
      res.json({
        status: "success",
        code: 200,
        data: resultUpdate,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = updateConsumeCtrl;
