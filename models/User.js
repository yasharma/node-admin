'use strict';

const 
    mongoose        = require('mongoose'),
    path            = require('path'),
    _               = require('lodash'),
    config          = require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
    uniqueValidator = require('mongoose-unique-validator'),
    crypto			= require('crypto'),
    Schema          = mongoose.Schema,

UserSchema 	= new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: 'The Email address you have entered already exists.',
        uniqueCaseInsensitive:true,
        required: 'E-mail is required',
        validate: {
            validator: function(email) {
                return /^([\w-\.+]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: '{VALUE} is not a valid email address'
        }
    },
    password: {
        type: String,
    },
    passwordReset: {
        type: Object
    },
    status: {
        type: String,
        enum: ['active','inactive','delete'],
        default: 'inactive'
    },
	profilePic:{
		name: {
			type: String,
		},
        thumb_image: {
            type: String,
        },
        absolute_thumb_path: String, // for unlink purpose
        absolute_original_image_path: String, // for unlink purpose
		original_image:  {
			type: String
		}
	},
	emailVerificationStatus: {
        type: String,
        enum: ['verified','unverified'],  // not verified to uunverified
        default: 'unverified'
    },
});


/* Mongoose beforeSave Hook : To hash a password */
UserSchema.pre('save', function(next) {
    let user = this;
    
    if (this.isModified('password') || this.isNew) {
    	if(this.isNew){
            user.emailVerificationKey = crypto.createHash('md5').update((user.email + Math.floor((Math.random() * 1000) + 1))).digest("hex");
        }
        user.password = this.hashPassword(user.password);
        next();
    } else {
        return next();
    }
});

/* To check a password */
UserSchema.methods.comparePassword = function(password) {
    return this.password === this.hashPassword(password);
};

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
    if (password) {
        return crypto.createHash('md5').update(password).digest("hex");
    } else {
        return password;
    }
};

UserSchema.set('autoIndex', config.db.autoIndex);
UserSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});
module.exports = mongoose.model('User', UserSchema);