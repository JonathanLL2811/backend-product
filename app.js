const express = require('express');
const Product = require('./modelos/Product');
const sequelize = require('./config/database');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos `prueba1` exitosa');
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos:', err);
    });
    
app.get('/producto/valor-promedio-categoria', async (req, res) => {
    try {
        const result = await Product.findAll({
            attributes: [
                'category_code',
                [sequelize.fn('AVG', sequelize.cast(sequelize.col('value'), 'DECIMAL')), 'ValorPromedio'],
            ],
            group: ['category_code'],
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos: ' + error.message });
    }
});
app.get('/producto/cantidad-por-marca', async (req, res) => {
    try {
        const result = await Product.findAll({
            attributes: [
                'brand_code',
                [sequelize.fn('COUNT', sequelize.col('partNumber')), 'Cantidad'],
            ],
            group: ['brand_code'],
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos: ' + error.message });
    }
});


app.get('/producto/valor-total-categoria', async (req, res) => {
    try {
        const result = await Product.findAll({
            attributes: [
                'category_code',
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('value'), 'DECIMAL')), 'ValorTotal'],
            ],
            group: ['category_code'],
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos: ' + error.message });
    }
});

sequelize.sync({ force: false })
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });
