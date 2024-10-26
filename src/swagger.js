const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: ' API',
        description: 'API documentation',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{
        bearerAuth: [],
    }],
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./routes/web.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./routes/web.js');
});