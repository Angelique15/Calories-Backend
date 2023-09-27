// controllers/caloriesController.js
const fs = require('fs/promises');
const path = require('path');
const Joi = require('joi'); // Importa Joi

// Ruta al archivo con datos de alimentos no saludables
const notAllowedFoodsFilePath = path.join(__dirname, '../modals/es-productos.json');

// Define el esquema de validación con Joi
const schema = Joi.object({
    bloodType: Joi.string()
        .valid('A', 'B', 'AB', 'O') // Define los valores válidos para bloodType
        .required(), // Indica que es un campo obligatorio
});

// Controlador para obtener alimentos no saludables
const getNotAllowedFoods = async (req, res) => {
    try {
        // Valida la solicitud contra el esquema
        const { error, value } = schema.validate(req.query);

        if (error) {
            // Si la validación falla, devuelve un error de validación
            return res.status(400).json({ error: error.details[0].message });
        }

        // Leer el archivo con alimentos no saludables
        const rawData = await fs.readFile(notAllowedFoodsFilePath);
        const notAllowedFoods = JSON.parse(rawData);

        // Obtener el tipo de sangre desde la solicitud (deberías enviarlo desde tu frontend)
        const { bloodType } = value;

        // Filtrar alimentos no saludables por el tipo de sangre
        const foodsForBloodType = notAllowedFoods[bloodType] || [];

        // Obtener 4 alimentos aleatorios
        const randomFoods = shuffleArray(foodsForBloodType).slice(0, 4);

        res.json(randomFoods);
    } catch (error) {
        console.error('Error al obtener alimentos no saludables:', error);
        res.status(500).json({ error: 'Error al obtener alimentos no saludables' });
    }
};

// Función para mezclar un array aleatoriamente
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = { getNotAllowedFoods };


