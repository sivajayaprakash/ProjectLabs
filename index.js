const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser =require('body-parser');

const app = express();

const PORT =  process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended: true}));

//API pk_d91db140673041d38de5e2caf74067aa
//Create Call API function

var stockticker = 'goog';


function call_api(finishedAPI) {
request(`https://cloud.iexapis.com/stable/stock/${stockticker}/quote?token=pk_d91db140673041d38de5e2caf74067aa`, {json: true}, (err, res, body) => {

	if(err) {return console.log (err);}

		if (res.statusCode === 200) {
		// console.log(body);
		finishedAPI(body);
	};
});

};


//Set handlebar index GET route

app.get('/', function (req, res){
	call_api(function(doneAPII) {
		res.render('home', {
		stock:doneAPII
		});
	});
});


//Set handlebar routes

app.get('/about', function (req, res){

	call_api(function(doneAPII) {
		res.render('about', {
		stock:doneAPII
		});
	});
	
})



app.get('/livealerts', function (req, res){

	call_api(function(doneAPII) {
		res.render('livealerts', {
		stock:doneAPII
		});
	});
	
})



app.get('/login', function (req, res){

	call_api(function(doneAPII) {
		res.render('login', {
		stock:doneAPII
		});
	});
	
})


// app.post('/submit-form', (req, res) => {
// 	const stock_ticker = req.body.stock_ticker;
// 	//...
// 	res.end()
//   })


app.listen(PORT, () => console.log('Server Listening on Port' +  PORT ));