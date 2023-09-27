const { getUserById } = require("../service/user");

const getUserInfoCtrl = async (req, res, next) => {
  const { id } = req.user;

  try {
    const result = await getUserById(id);

    if (result) {
      res.json({
        status: "success",
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

module.exports = getUserInfoCtrl;
