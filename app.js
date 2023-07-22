require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require("path");
const connectDB = require('./server/config/db');


const app = express();
const port = 8000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
//Template Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
//Connect database
connectDB().then(r => console.log('Connect Database Success'));
//Set routes
app.use('/', require('./server/routes/main'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

