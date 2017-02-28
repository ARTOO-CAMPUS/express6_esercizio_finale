var express = require('express');
var path = require('path');
var users = require('./users/router');
var bodyParser = require('body-parser');

//PORTA
const PORT = 3000;

//CREO L' APPLICAZIONE
var app = express();

//MIDDLEWARE PER IL BODY PARSER DEL JSON CHE MANDO IN POST
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.text());


//SERVE INDEX.HTML
app.get('/', function (req, res) {
    console.log('sono nella home');
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

//SERVE I FILES STATIC
app.use('/public', express.static(path.join(__dirname, '..', 'client', 'files')));

//SERVE USERS
app.use('/users', users);

//START DEL SERVER
app.listen(PORT, function () {
    console.log('http://localhost:' + PORT);
});