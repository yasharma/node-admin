'use strict';
require('dotenv').config({silent: true});
/*
* All the required node packages
*/
const express 	= require('express'),
	app 		= express(),
	path 		= require('path'),
	bodyParser 	= require('body-parser'),
	morgan 		= require('morgan'),
	mongoose 	= require('mongoose'),
	helmet 		= require('helmet'),
	compress 	= require('compression'),
	routes 		= require(path.resolve('./config/routes')),
	config 		= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
	adminCtrl 	= require(path.resolve('./controllers/Admin/adminCtrl'));

mongoose.set('debug', config.db.DEBUG);
mongoose.connect(config.db.URL, {autoReconnect: true});

/* Node.js compression middleware
* The middleware will attempt to compress response bodies for all request that traverse through the middleware
* Should be placed before express.static
*/

app.use(compress({
    filter: function (req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

app.use(express.static(path.resolve('./build')));
app.use(express.static(path.resolve('./admin')));
app.use(express.static(path.resolve('./assets')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

/* Register all your routes */
app.use('/api', routes.router);
app.use('/adminapi', routes.admin);

//http://stackoverflow.com/questions/35216601/angular-url-removing-using-express-to-route-request
app.get(/^((?!\/(api|admin)).)*$/, function (req, res) {
	res.sendFile(path.resolve('./build/index.html'));
});
app.get(/^((?!\/(adminapi)).)*$/, function (req, res) {
	res.sendFile(path.resolve('./admin/index.html'));
});


/*
* Start the node server using node 'http' package
*/
// if( process.env.NODE_ENV === 'production' ){
app.listen(config.server.PORT, () => {
	adminCtrl.register();
    console.log(`Listening on server port:${config.server.PORT}`);
});

// Todos
// Enable CSRF protection

/*
* we need app package for tests so we are exporting this for our tests
*/
module.exports = app;