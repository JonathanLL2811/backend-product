const express = require('express');
const Product = require('./modelos/Product');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express(); // Debe estar primero
app.use(cors()); // Esto permite las solicitudes desde diferentes orígenes
app.use(express.json());

const port = 5000;

// valor minimo
app.get('/producto/valor-minimo', async (req, res) => {
    try {
        const result = await Product.findOne({
            attributes: ['partNumber', 'name', 'value'],
            order: [['value', 'ASC']],
        });

        res.json(result);
    } catch (error) {
        res.status(200).json({ error: 'Error: ' + error.message });
    }
});

// valor total de los productos por productType
app.get('/producto/valor-total-tipo', async (req, res) => {
    try {
        const result = await Product.findAll({
            attributes: [
                'productType',
                [sequelize.fn('SUM', sequelize.col('value')), 'ValorTotal'],
            ],
            group: ['productType'],
        });

        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'No se conectó: ' + error.message });
    }
});

// valor alto
app.get('/producto/valor-maximo', async (req, res) => {
    try {
        const result = await Product.findOne({
            attributes: ['partNumber', 'name', 'value'],
            order: [['value', 'DESC']],
        });

        // Devolver solo el valor máximo
        res.json({ valor: result ? result.value : 0 });
    } catch (error) {
        res.status(500).json({ error: 'Error: ' + error.message });
    }
});

// conexión con el servidor y BD
sequelize.sync({ force: false })
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch(err => console.error('Error al conectarse con la BD:', err));
