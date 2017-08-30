"use strict";

const 	express 	= require('express'),
		path 		= require('path'),
		expressJWT 	= require('express-jwt'),
		config 		= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
		userRoutes 	= require(path.resolve('./config/user_router')),
		adminRoutes = require(path.resolve('./config/admin_router')),
		router 		= express.Router(),
		admin 		= express.Router();



/* Express JWT middleware for user routes */
router.use(expressJWT({
	secret: new Buffer(config.secret).toString('base64'),
}).unless({
	// Define your path/routes that does not need any authentication
	path:[
		/^\/admin\/.*/,
		'/favicon.ico',
		'/register',
		'/login',
		/^\/verifyEmail\/.*/,
		/^\/reset\/.*/
	]
}));
/*
* These are our base routes that will call simple prefixed by '/'
* eg. /login
*/
userRoutes.routes.forEach(x => {

	switch(x.type){
		case 'GET':
		router.get(x.url, x.method);	
		break;

		case 'POST':
		router.post(x.url, x.method);	
		break;

		case 'PUT':
		router.put(x.url, x.method);	
		break;

		case 'DELETE':
		router.delete(x.url, x.method);	
		break;

		case 'SPECIALPUT': // Special Type of Routes which hold files
		router.put(x.url, x.mwear, x.method);
		break;

		case 'SPECIALPOST': // Special Type of Routes which hold files
		router.post(x.url, x.mwear, x.method);
		break;

		default:
		throw new Error('Invalid method type');
	}
	
});

/*
* All the routes of admin will requests using admin prefix
* eg. /admin/login and so on
*/
/* Express JWT middleware for admin routes */
admin.use(expressJWT({
	secret: new Buffer(config.secret).toString('base64'),
}).unless({
	// Define your path/routes that does not need any authentication
	path:[
		'/admin/register',
		'/adminapi/login',
		'/admin/forgot',
		/^\/admin\/reset\/.*/,
		/^\/admin\/generate-password\/.*/
	]
}));
/*Admin Routes*/
adminRoutes.routes.forEach(function (x) {
	switch(x.type){
		case 'GET':
		admin.get(x.url, x.method);	
		break;

		case 'POST':
		admin.post(x.url, x.method);	
		break;

		case 'PUT':
		admin.put(x.url, x.method);	
		break;

		case 'DELETE':
		admin.delete(x.url, x.method);	
		break;

		case 'SPECIALPUT': // Special Type of Routes which hold files
		admin.put(x.url, x.mwear, x.method);
		break;

		case 'SPECIALPOST': // Special Type of Routes which hold files
		admin.post(x.url, x.mwear, x.method);
		break;

		default:
		throw new Error('Invalid method type');
	}
	
});

module.exports = {
	router: router,
	admin: admin
};