const express = require('express');

const exphbs = require('express-handlebars');

const app = express();

const path = require('path');


const PORT =  process.env.PORT || 8000;

//Set Handlebars Middleware

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


//Set handlebar routes

app.get('/', function (req, res){
	res.render('home');
})


//Set Static Folder

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on Port' +  PORT ));