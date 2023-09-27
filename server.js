const express = require('express');
const cors = require('cors');
const corsOptions = {
  origin: 'https://pioher02.github.io/',
  credentials: true,
};

require('dotenv').config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Rutas para obtener alimentos no permitidos por tipo de sangre
const notAllowedFoodsRoutes = require('./routes/notAllowedFoodsRoutes');
app.use('/api/not-allowed-foods', notAllowedFoodsRoutes);

app.use(
  cors({
    origin: 'https://pioher02.github.io/',
    credentials: true,
  })
);

require('./config/config-passport');

const routerApi = require('./api');
app.use('/api', routerApi);

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `Use api on routes: 
  /api/signup - registration user {username, email, password}
  /api/login - login {email, password}`,
    data: 'Not found',
  });
});

app.use((err, _, res) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

// Ruta para obtener los alimentos no recomendados según el tipo de sangre
app.get('/api/not-allowed-foods/:bloodType', (req, res) => {
  const { bloodType } = req.params;
  // Lee el archivo JSON con los alimentos no recomendados desde la carpeta models
  const notAllowedFoodsData = require('./models/es-productos.json');

  // Filtra los alimentos no recomendados según el tipo de sangre
  const foodsForBloodType = notAllowedFoodsData[bloodType] || [];

  res.json(foodsForBloodType);
});

// Exporta la aplicación Express como una función
module.exports = app;


