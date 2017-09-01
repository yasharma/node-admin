'use strict';
const path 	= require('path'),
lo 			= require('lodash'),
config 		= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
fs 			= require('fs');

/* Require All the controllers */
let ctrls = {};
fs.readdirSync(path.resolve('./controllers/Admin')).forEach(file => {
	let name = file.substr(0,file.indexOf('.'));
	ctrls[name] = require(path.resolve(`./controllers/Admin/${name}`));
});


module.exports = {
  	routes: [
  		{ url: '/login', method: ctrls.adminCtrl.login, type: 'POST' },
  		{ url: '/cms/add', method: ctrls.cmsCtrl.add, type: 'POST' },
  		{ url: '/cms/list', method: ctrls.cmsCtrl.list, type: 'POST' },
  		{ url: '/cms/edit', method: ctrls.cmsCtrl.edit, type: 'PUT' },
  		{ url: '/cms/view/:type', method: ctrls.cmsCtrl.view, type: 'GET' }
	]
};
