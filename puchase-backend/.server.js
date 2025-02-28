const express = require('express');
const connectDB = require('./config/db');
const purchaseRoutes = require('./routes/purchaseRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Agregando cors
const cors = require('cors');
app.use(cors());

// Rutas
app.use('/api', purchaseRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});