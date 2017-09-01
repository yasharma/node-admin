'use strict';
const path 	 	= require('path'),
	async 	 	= require('async'),
	lo 			= require('lodash'),
	mongoose 	= require('mongoose'),
	CMS 	 	= require(path.resolve('./models/Cms')),
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
		for (var i = result.records.length - 1; i >= 0; i--) {
			result.records[i] = {
				id:`<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
						<input name="id[]" type="checkbox" class="checkboxes" value="${result.records[i]._id}"/>
						<span></span>
					</label>`,
				title: result.records[i].title,
				type: result.records[i].type,
				created_date: result.records[i].created_at,
				status: `<span class="label label-sm label-${status_list.class[result.records[i].status]}">${status_list.status[result.records[i].status]}</span>`,
				action: `<a href="#!/view-cms/${result.records[i].type}" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-search"></i> View</a>`
			};
		}
		res.json({
			recordsTotal: result.count,
			data: result.records,
			recordsFiltered: result.records.length
		});
	});
};