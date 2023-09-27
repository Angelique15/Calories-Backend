const express = require("express");
const router = express.Router();
const signupCtrl = require("../controller/signup");
const loginCtrl = require("../controller/login");
const logoutCtrl = require("../controller/logout");
const updateUserCtrl = require("../controller/updateUser");
const validToken = require("../middleware/validToken");
const auth = require("../middleware/auth");
const { getNotAllowedFoods } = require("../controller/caloriesController"); // Importa el controlador correspondiente
const getUserInfoCtrl = require("../controller/getUserInfo");
const getAllowedFoods = require("../controller/getAllowedFoods");
const updateConsumeCtrl = require("../controller/updateConsume");
const getProductsConsumedCtrl = require("../controller/getProductsConsumed");

require("dotenv").config();

router.post("/users/signup", signupCtrl);

router.post("/users/login", loginCtrl);

router.post("/users/logout", validToken, auth, logoutCtrl);

// Ruta para obtener alimentos no permitidos
router.get("/not-allowed-foods", getNotAllowedFoods);

// Ruta para guardar info de calculadora
router.post("/users/current/:id", validToken, auth, updateUserCtrl);

// Ruta para guardar productos consumidos
router.post("/users/current", validToken, auth, updateConsumeCtrl);

// Ruta para traer la información del Usuario
router.get("/users/current/:id", validToken, auth, getUserInfoCtrl);

// Ruta para obtener alimentos permitidos
router.get("/allowed-foods/:userBloodType", getAllowedFoods);

// Ruta para obtener alimentos del día
router.get("/diary/:date", validToken, auth, getProductsConsumedCtrl );

module.exports = router;
