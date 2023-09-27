const Consumes = require("../schemas/consumes");

const addConsumes = async ({ date, products, owner }) => {
  return Consumes.create({ date, products, owner });
};

const getAllConsumes = async ({ owner, date }) => {
  return Consumes.find({ owner, date });
};

const updateConsumesDate = async (id, products) => {
  return Consumes.findByIdAndUpdate(
    { _id: id },
    { products: products },
    { new: true }
  );
};

module.exports = {
  addConsumes,
  getAllConsumes,
  updateConsumesDate,
};
