"use strict";

const nodemailer	= require('nodemailer'),
	path 			= require('path'),
	config 			= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
	fs 				= require('fs'),
	template 		= require(path.resolve('./config/lib/template-render'));

// Send mail by GMAIL SMTP
function gmailSMTP(opt, cb) {
	var poolConfig = config.mail.poolConfig,
	transporter = nodemailer.createTransport(poolConfig);
	sendMailer(opt, transporter, cb);
}

function sendMailer(opt, transporter, cb) {
	var newUserRegistration = transporter.templateSender({
		subject: opt.subject || 'New Mail',
		html: fs.readFileSync(opt.html, 'utf-8'),
	}, {
		from: opt.from || config.mail.from, // sender address
	});
	transporter.verify((error, success) => {
	   	if (error) {
	        cb(error);
	   	} else {
	   		// use template based sender to send a message
	   		newUserRegistration({
	   		    to: opt.to
	   		}, opt.emailData, (err, info) => {
	   		    if(err){
	   		        cb(err);
	   		    }else{
	   		    	if (process.env.NODE_ENV === 'test') {
	   		    		//console.log(info.response.toString());
	   		    	}
	   		    	cb(err, info);
	   		    }
	   		});
	   	}
	});
}

exports.send = function (opt, cb) {
	gmailSMTP(opt, cb);	
};