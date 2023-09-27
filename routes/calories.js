// routes/calories.js
const express = require('express');
const router = express.Router();
const { getNotAllowedFoods } = require('../controllers/caloriesController'); // Importa el controlador correspondiente

// Ruta para obtener alimentos no saludables
router.get('/api/not-allowed-foods', getNotAllowedFoods);

module.exports = router;
