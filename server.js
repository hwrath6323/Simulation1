const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./server/controller.js');
const app = express();


require('dotenv').config()

massive( process.env.CONNECTION_STRING)
    .then(db => {
        console.log('connected to db')
        app.set('db', db)

    })

app.use(cors());

app.use(bodyParser.json());

// app.use(express.static(__dirname + /../build))


app.get('/api/products', controller.get_inventory)

app.post('/api/products', controller.create_product)

app.get('/api/products/:id', controller.get_product)


app.put('/api/products/:id', controller.edit_product)

app.delete('/api/products/:id', controller.delete_product)

const port = process.env.SERVICE_PORT || 3005;

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});