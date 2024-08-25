const Joi = require('joi');
const utility = require('../utils/utility');

/*   ##############################################################
               Validator for ValidateFeild and Access Token Start 
	################### ######################################     */

	const validateFields = function (req, res, schema) {
		const validation = schema.validate(req.body);
		if (validation.error) {
			let errorName = validation.error.name;
			let errorReason =
				validation.error.details !== undefined
					? validation.error.details[0].message
					: 'Parameter missing or parameter type is wrong';
					utility.sendError(new Error(errorName + ' ' + errorReason), res);
			return false;
		}
		return true;
	};
	
	const validateAccessTokenFields = function (req, res, method) {
	
		
		if (req.headers.authorization == undefined || req.headers.authorization == null || req.headers.authorization == '') {
			let errorReason = 'Authorization is required';
			utility.sendError(new Error(errorReason), res);
			return false;
		}
	
		var split = req.headers.authorization.split(" ");
		if (!(split.length == 2 && split[0] === "Bearer")) {
			let errorReason = 'Authorization is required';
			utility.sendError(new Error(errorReason), res);
			return false;
		}
	
		if (method == 'GET') {
			req.query.access_token = split[1];
		}
		else {
			req.body.access_token = split[1];
		}
	
		return true;
	}
	
	/*   #########3#####################################################
				   Validator for ValidateFeild and Access Token END 
		################### ######################################     */
	





exports.validateUserRegistration = function (req, res, next) {

	const schema = Joi.object().keys({
		user_name: Joi.string().required(),
		email_id: Joi.string().email().required(),
		password: Joi.string().required(),
		phone_number: Joi.string().allow(""),
		user_role: Joi.string().valid( 'user','admin')
	});

	let validFields = validateFields(req.body, res, schema);
	console.log(`Ok validates here`)
	if (validFields) {
		console.log("validation check ")
		next()
	}
} 



exports.validateUserLogin = function (req, res, next) {
	console.log("In validator")
	const schema = Joi.object().keys({
		email_id: Joi.string().email().required(),
		password: Joi.string().required()
	});



	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		
		next()
	}
}


exports.forgotPasswordEmailValidation = function (req, res, next) {
	
	const schema = Joi.object().keys({
		email_id: Joi.string().trim().email().required(),
	});



	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		next()
	}
}
exports.varifyOtpAndUpdatePassword = function (req, res, next) {
	const schema = Joi.object().keys({
		email_id: Joi.string().email().required(),
		otp: Joi.number().required(),
		new_password: Joi.string().required(),
		confirm_password: Joi.string().required(),
	});
	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		next()
	}
}

exports.getUserDetails = function (req, res, next) {
	const schema = Joi.object().keys({
		page: Joi.number().optional().allow("")
	});
	let validFields = validateFields(req.query, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res, 'GET')) {
			next()
		} else {
			console.log(`access token error`)
		}
	}
}


exports.updateUserProfile = function (req, res, next) {
	
	const schema = Joi.object().keys({
		user_id:Joi.number().required(),
		user_name: Joi.string().optional(), 
		email_id: Joi.string().email().optional(),
	});
	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			next()
		} else {
			console.log(`access token error`)
		}
	}

}


exports.deleteUserbyid = function (req, res, next) {
	
	const schema = Joi.object().keys({
		user_id: Joi.number().required()
	});
	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			next()
		} else {
			console.log(`access token error`)
		}
	}

}