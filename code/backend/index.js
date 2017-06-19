///CONSTANTS///

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

///API_ROUTE///
const hotelsApi = require('./resultHotels/resultHotels-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

///PROJECT_FOLDER///

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/../frontend/index.html')));
app.use('/api/v1/hotels', hotelsApi);

////STATIC_ROUTES///

app.use('/code', express.static(path.join(__dirname, './../../code')));
app.use('/dist', express.static(path.join(__dirname, './../../dist')));

///PORT///

app.listen(3000);
console.log('The application is heard on port 3000');
