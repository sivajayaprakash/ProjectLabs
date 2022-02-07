const express = require('express');

const exphbs = require('express-handlebars');

const app = express();

const path = require('path');

const request = require('request');

const bodyParser =require('body-parser');


const PORT =  process.env.PORT || 8000;

//use body parser middleware

app.use(bodyParser.urlencoded({extended:false}));



//API pk_d91db140673041d38de5e2caf74067aa
//Create Call API function

function call_api(finishedAPI) {
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_d91db140673041d38de5e2caf74067aa', {json: true}, (err, res, body) => {

	if(err) {return console.log (err);}

		if (res.statusCode === 200) {
		//console.log(body);
		finishedAPI(body);
	};
});

};



//Set Handlebars Middleware

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


const otherstuff ="hello there, this is other stuff";


//Set handlebar index GET route

app.get('/', function (req, res){
	call_api(function(doneAPI) {

	res.render('home', {
		stock:doneAPI
	});
		
});

});

//Set handlebar index POST route

app.get('/', function (req, res){
	call_api(function(doneAPI) {
		
	res.render('home', {
		stock:doneAPI,
		
	});
		
});

});

//Set handlebar routes

app.get('/about.html', function (req, res){
	res.render('about');
})



//Set Static Folder

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on Port' +  PORT ));