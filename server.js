const express = require('express');
const cors = require('cors');
const connection = require("./db/connection");
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

require("dotenv").config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

//ruta para obtener alimentos no permitidos por tipo de sangre
const notAllowedFoodsRoutes = require('./routes/notAllowedFoodsRoutes');

app.use('/api/not-allowed-foods', notAllowedFoodsRoutes);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Permite el uso de credenciales en las solicitudes
}));


require("./config/config-passport");

const routerApi = require("./api");
app.use("/api", routerApi);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Use api on routes: 
    /api/signup - registration user {username, email, password}
    /api/login - login {email, password}`,
    data: "Not found",
  });
});

app.use((err, _, res) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3001;

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error .message ${err.message}`);
    process.exit(1);
  });


// // Ruta para obtener los alimentos no recomendados según el tipo de sangre
app.get('/api/not-allowed-foods/:bloodType', (req, res) => {
  const { bloodType } = req.params;
  // Lee el archivo JSON con los alimentos no recomendados desde la carpeta models
  const notAllowedFoodsData = require('./models/es-productos.json');

  // Filtra los alimentos no recomendados según el tipo de sangre
  const foodsForBloodType = notAllowedFoodsData[bloodType] || [];

  res.json(foodsForBloodType);
});

