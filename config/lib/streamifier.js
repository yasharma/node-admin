/* 
* Read data from buffer stream, object stream and string stream
* https://github.com/gagle/node-streamifier
*/
'use strict';

var util 			= require('util');
var _ 				= require('lodash');
var path 			= require('path');
var fs 				= require('fs');
var stream 			= require('stream');
var async 			= require('async');
var Thumbnail 		= require('thumbnail');
const THUMB_SIZE 	= 600;

var createReadStream = function (object, options) {
	return new MultiStream (object, options);
};

var MultiStream = function (object, options) {
	if (object instanceof Buffer || typeof object === 'string') {
		options = options || {};
		stream.Readable.call(this, {
			highWaterMark: options.highWaterMark,
			encoding: options.encoding
		});
	} else {
		stream.Readable.call(this, { objectMode: true });
	}
	this._object = object;
};

/* Handle buffer files */
var handleFile = function(obj, cb){

	async.waterfall([
		async.apply(readBuffer, obj),
		async.apply(genrateThumbs,obj)
	], function (err, image) {
		cb(err, image);
	});
	
};

/*
* Read files from buffer and move to destination directory using stream
*/
function readBuffer(obj, done) {
	var image = [], original_name, filename, finalPath, outStream, ext, thumbDestination;

	// create destination directory
	checkDirectorySync(path.resolve(obj.destination));

	/* Iterate over the buffer */
	obj.files.forEach(function (file, index) {
	    original_name = _.trimEnd(file.originalname, `.${obj.file_extensions[file.mimetype]}`);
	    filename = `${Date.now()}${index}`;
	    ext = obj.file_extensions[file.mimetype];
	    finalPath = path.join(obj.destination, `${filename}.${ext}`);
	    outStream = fs.createWriteStream(finalPath);
	    createReadStream(file.buffer).pipe(outStream);

	    /* create image array  */
    	image.push({
        	original_name: original_name,
        	name: `${filename}.${ext}`,
        	path: obj.display_path
        });
	});
	
	/* end when stream is finished */    
	outStream.on('finish', function () {
        done(null, image);
    });
}


// Node thumbnail will helps us to generate file thumbs
function genrateThumbs(obj, images, done){
	var source = obj.destination;
	var imageThumb = [],
	destination = `${obj.destination}thumb`;

	// create thumbs directory
	checkDirectorySync(path.resolve(destination));
	
	// generate thumbs
	var thumbnail = new Thumbnail(source, destination); 
	async.each(images, function(image, callback){
		thumbnail.ensureThumbnail(image.name, THUMB_SIZE, null, function (err, filename) {
			imageThumb.push({
				original_name: image.original_name,
				name: image.name,
				path: image.path,
				thumb_path: `${image.path}thumb/`,
				thumb_name: filename
			});
			callback();
		});
	}, function(err){
		done(err, imageThumb);
	});
}

/* Check if directory exists or not 
* if not create directory (synchronously)
*/
function checkDirectorySync(directory) {  
	try {
    	fs.statSync(directory);
  	} catch(e) {
    	fs.mkdirSync(directory);
  	}
}

util.inherits(MultiStream, stream.Readable);

MultiStream.prototype._read = function () {
	this.push(this._object);
	this._object = null;
};

module.exports = {
	createReadStream :createReadStream,
	handleFile: handleFile
};	