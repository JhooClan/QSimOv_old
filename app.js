var express = require('express');

var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');


var port = process.env.PORT || 8042;
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs'); // set up ejs for templating


//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

app.use(session({
    secret: 'Potatoes are great!',
    resave: true,
    saveUninitialized: true
}));

app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport


//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});


//var db = require('./config/db.js');

/*
var QGate = require("./app/models/qgate.js")

var identity = new QGate({id: 0, matrix: [[1,0],[0,1]], size: 1, name: 'Identity', desc: 'miau'});
console.log("QGate is: ", identity);
identity.save();

var fnd = QGate.findById(0);
if (fnd !== null) {
	console.log(JSON.stringify(fnd.data))
}

var fnd = QGate.findById(1);
if (fnd !== null) {
	console.log(JSON.stringify(fnd.data))
}
*/

var math = require('mathjs')
var QCircuit = require("./app/models/qcircuit.js")
var QGate = require("./app/models/qgate.js")
var QGInstance = require("./app/models/qginstance.js")

var circuit = new QCircuit
(
	{
		id: 0,
		name: 'Teleportation Algorithm',
		desc: 'Baka survivor!',
		gates: 
		[
			new QGate
			(
				{
					id: 0,
					matrix: [
						[1,0],
						[0,1]
						],
					multiplier: 1,
					size: 1,
					name: 'Identity',
					desc: 'Identity Gate'
				}
			),
			new QGate
			(
				{
					id: 1,
					matrix:  [
					[1,0,0,0],
					[0,1,0,0],
					[0,0,0,1],
					[0,0,1,0]
					],
					multiplier: 1,
					size: 2,
					name: 'C-NOT',
					desc: 'Controlled-NOT Gate'
				}
			),
			new QGate
			(
				{
					id: 2,
					matrix: [
						[1,1],
						[1,-1]
						],
					multiplier: 1 / Math.sqrt(2),
					size: 1,
					name: 'Hadamard',
					desc: 'Hadamard Gate'
				}
			),
		],
		nQBits: 3,
		initV:
		[
			(math.complex(1 / Math.sqrt(2)), math.complex(1 / Math.sqrt(2))),
			(math.complex(0), math.complex(0)),
			(math.complex(0), math.complex(0))
		],
		timeLine:
		[
			[
				new QGInstance
				(
					{
						id: 0,
						qgateid: 2,
						qbits: [1]
					}
				)
			],
			[
				new QGInstance
				(
					{
						id: 0,
						qgateid: 1,
						qbits: [1, 2]
					}
				)
			],
			[
				new QGInstance
				(
					{
						id: 0,
						qgateid: 1,
						qbits: [0, 1]
					}
				)
			],
			[
				new QGInstance
				(
					{
						id: 0,
						qgateid: 2,
						qbits: [0]
					}
				)
			]
		]
	}
)
console.log("Circuit: ", circuit)

exports = module.exports = app;