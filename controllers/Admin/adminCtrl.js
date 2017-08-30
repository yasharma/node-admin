'use strict';
const jwt 	 	= require('jsonwebtoken'),
	path 	 	= require('path'),
	crypto 	 	= require('crypto'),
	async 	 	= require('async'),
	_ 			= require('lodash'),
	mongoose 	= require('mongoose'),
	Admin 	 	= require(path.resolve('./models/User')),
	mail 	 	= require(path.resolve('./config/lib/mail')),
  	config 		= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
  	paginate    = require(path.resolve('./config/lib/paginate'));

exports.login = (req, res, next) => {
	if(!req.body.email || !req.body.password) {
		res.status(401).json({
			errors: {
				message: 'Email and password are required', 
				name: 'Authentication failed', 
				success: false,
			}	
		});
		return;
	}	 

	Admin.findOne({ email: req.body.email },(err, user) => {
		if(err){
			next(err);                                              
		} else {
			let errors = {}, error = false;
			switch(_.isNull(user) || !_.isNull(user)){
				// 1. IF User Not Found in Database
				case _.isNull(user):
					errors = { name: 'Authentication failed', message: 'Authentication failed. User not found.', success: false};
					error = true;
					break;

				default: 
					error = false;
			}
			
			if(error){
				res.status(401).json({ errors: errors });
			} else {
				if(user.comparePassword(req.body.password)){
					// Remove sensitive data before sending user object
					user.password = undefined;
					let token = jwt.sign(user, new Buffer(config.secret).toString('base64'), {expiresIn: '1 day'});
					res.json({
						user: user, 
						token: token, 
						success: true, 
						message: 'login success'
					});
				} else {
					res.status(401).json({
						errors: {
							name: 'Authentication failed', 
							message: 'Authentication failed. Wrong password.',
							success: false	
						}
					});
				}
			}
		}
	});
};


exports.register = function(req, res, next) {
	let adminUser = config.defaultAdmin;
	async.waterfall([
		// check if default admin already created
		function (done) {
			Admin.count({email: adminUser.email}, function (err, count) {
				done(err, count);
			});
		},
		function (count, done) {
			if(count > 0){
				done(null, true);
			} else {
				let user = new Admin(adminUser);
				user.save(function(err, user) {
					done(err, user);
				});
			}
		}
	],function(err, user) {
		if(err){
			console.log(err);
		}
	});
};