const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001; // Define el puerto en el que escuchará el servidor

// Configura las opciones de CORS para permitir solicitudes desde tu sitio en GitHub Pages y Netlify
const corsOptions = {
  origin: ['https://angelique15.github.io', 'https://rad-vacherin-853b41.netlify.app'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas para obtener alimentos no permitidos por tipo de sangre
const notAllowedFoodsRoutes = require('./routes/notAllowedFoodsRoutes');
app.use('/api/not-allowed-foods', notAllowedFoodsRoutes);

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

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

// Exporta la aplicación Express como una función
module.exports = app;


