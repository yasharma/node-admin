'use strict';
const path 	 	= require('path'),
	async 	 	= require('async'),
	lo 			= require('lodash'),
	mongoose 	= require('mongoose'),
	CMS 	 	= require(path.resolve('./models/Cms')),
	datatable 	= require(path.resolve('./config/lib/datatable')),
  	config 		= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
  	paginate    = require(path.resolve('./config/lib/paginate'));

exports.add = (req, res, next) => {
	if(!req.body.title || !req.body.type) {
		res.status(422).json({
			errors: {
				message: 'Title and type is required', 
				success: false,
			}	
		});
		return;
	}	 
    
    let cms = new CMS(req.body);
    cms.save()
    .then(result => res.json({success: true}))
    .catch(error => res.json({errors: error}));
};

exports.edit = (req, res, next) => {
	if(!req.body._id) {
		res.status(422).json({
			errors: {
				message: 'Title and type is required', 
				success: false,
			}	
		});
		return;
	}	 
    
    
    CMS.update({_id: req.body._id},{$set: { title: req.body.title, type: req.body.type, description: req.body.description }}, 
    	function (error, result) {
    		if(error){
    			res.json({errors: error});
    		}
    		res.json({success: true});
    	}
    );
};

exports.view = (req, res, next) => {
	if(!req.params.type) {
		res.status(422).json({
			errors: {
				message: 'Type is required', 
				success: false,
			}	
		});
		return;
	}	 
    
    
    CMS.findOne({type: req.params.type}, 
    	function (error, result) {
    		if(error){
    			res.json({errors: error});
    		}
    		res.json({success: true, result: result});
    	}
    );
};

exports.list = (req, res, next) => {
	async.parallel({
		count: (done) => {
			CMS.count(done);
		},
		records: (done) => {
			CMS.find(done);	
		}
	}, (err, result) => {
		if(err){
			return res.json({errors: err});
		}
		let status_list = {
			class: {
				true : "info",
				false : "danger"	
			},
			status: {
				true : "Active",
				false : "InActive"	
			}
		};
		
		let dataTableObj = datatable.table(status_list, result.count, result.records);
		res.json(dataTableObj);
	});
};