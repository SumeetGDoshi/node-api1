const express = require('express')
const session = require('express-session');
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql');
const port = 3011
const router = require('./routes/router')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./database/connect');
app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const swaggerDefinition = {
  info: {
    title: 'Test Development', 
    version: '1.0.0',
    description: 'A sample API', 
  },
  host: "ec2-13-57-231-82.us-west-1.compute.amazonaws.com:3011",
  basePath: '/', 
};

const options = {
  swaggerDefinition: swaggerDefinition,
  explorer: true,
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', router)

app.get('/', (req,res) => res.send('Hello World'))

app.listen(port, ()=> console.log('port is running successfully'))

module.exports = app;
