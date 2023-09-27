const express = require("express");
const router = express.Router();
const notAllowedFoodsData = require('../models/es-productos.json');

const userBloodTypeMap = {
    1: 'A',
    2: 'B',
    3: 'AB',
    4: 'O',
};

router.get('/:userBloodType', (req, res) => {
    try {
        const { userBloodType } = req.params;

        if (!userBloodTypeMap[userBloodType]) {
            return res.status(400).json({ error: 'Tipo de sangre no válido' });
        }

        if (notAllowedFoodsData && Array.isArray(notAllowedFoodsData)) {
            const foodsForUserBloodType = notAllowedFoodsData.filter(food => {
                const groupBloodNotAllowed = food.groupBloodNotAllowed;
                const userBloodTypeIndex = userBloodTypeMap[userBloodType] === 'A' ? 1 :
                    userBloodTypeMap[userBloodType] === 'B' ? 2 :
                        userBloodTypeMap[userBloodType] === 'AB' ? 3 :
                            userBloodTypeMap[userBloodType] === 'O' ? 4 : -1;

                return groupBloodNotAllowed && groupBloodNotAllowed[userBloodTypeIndex] === true;
            });

            res.json(foodsForUserBloodType);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Error al obtener alimentos no permitidos desde el backend:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
