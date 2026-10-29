const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API Documentation',
            version: '1.0.0',
            description: 'API documentation for the REST API'
        },
        servers: [{ url: 'http://localhost:3000' }]
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
app.use(errorHandler);
module.exports = app;