var express = require('express');
var http = require('http');
//var https = require('https');

var env = require('dotenv').config({ path: './.env' });

var compression = require('compression');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var path = require('path');
var rfs = require('rotating-file-stream');
var cookieParser = require('cookie-parser');
var Group = require('./models/groups')
var app = express();


var logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const WHITELIST = process.env.whitelist.split(',');

// create a rotating write stream
var accessLogStream = rfs('access.log', {
	interval: '1d', // rotate daily
	path: logDirectory
});



app.set('superSecret', process.env.secret); // secret variable

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' })); // use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json({ limit: '50mb' }));
mongoose.connect(process.env.mongoose, {useMongoClient: true});

const allowCrossDomain = function(req, res, next) {
	let origin = req.headers.origin;
	if (WHITELIST.indexOf(origin) > -1) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	//res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.status(200).send();
	} else {
		next();
	}
};
app.use(allowCrossDomain);

//users
require('./routes/groups/groups.js')(express, app, mongoose, Group);

var port = process.env.PORT || 8081;
var server = http.createServer(app);

server.listen(port, () => {
	console.log('http running on ' + port);
});
