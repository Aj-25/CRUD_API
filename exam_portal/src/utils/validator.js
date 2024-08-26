const Joi = require('joi');
const logging = require('../utils/logging');
const universalFun = require('../utils/utility');
const utility = require('../utils/utility');


/*   #########3#####################################################
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
		universalFun.sendError(new Error(errorName + ' ' + errorReason), res);
		return false;
	}
	return true;
};

const validateAccessTokenFields = function (req, res, method) {

	logging.consolelog('REQUEST HEADERS :' + req.headers);
	
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

/*   #########3#####################################################
               Validator for GET,GET by ID, and DELTE API  Start 
	################### ######################################     */


exports.viewList = function (req, res, next) {
	logging.startSection('Get full list ');
	logging.logRequest(req);
	const schema = Joi.object().keys({
	});


	let validFields = validateFields(req.query, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res, 'GET')) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}

exports.viewListbyId = function (req, res, next) {
	logging.startSection('Get Details by ID ');
	logging.logRequest(req);
	const schema = Joi.object().keys({
	});


	let validFields = validateFields(req.query, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res, 'GET')) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}

exports.deletedetailsbyId = function (req, res, next) {
	logging.startSection('Delete Details by ID ');
	logging.logRequest(req);
	const schema = Joi.object().keys({
	});


	let validFields = validateFields(req.query, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res, 'GET')) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}

/*   #########3#####################################################
               Validator for GET,GET by ID, and DELTE API END
	################### ######################################     */

/*   #########3#####################################################
               Validator for User Start
	################### ######################################     */




exports.validateUserRegistration = function (req, res, next) {

	logging.startSection('validateUserRegistration');
	logging.logRequest(req);

	const schema = Joi.object().keys({
		user_name: Joi.string().required(),
		email_id: Joi.string().email().required(),
		password: Joi.string().required(),
		phone_number: Joi.string().required(),
		profile_pic: Joi.string().required(),
	});

	let validFields = validateFields(req.body, res, schema);
	console.log(`Ok validates here`)
	if (validFields) {
		console.log("validation check ")
		next()
	}
}


exports.validateUserLogin = function (req, res, next) {
	logging.startSection('validateUserLogin');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		email_id: Joi.string().trim().email().required(),
		password: Joi.string().required()
	});



	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		console.log("return to route")
		next()
	}
}

exports.updateUserProfile = function (req, res, next) {

	logging.startSection('UpdateUserProfile');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		user_name: Joi.string().required(),
		phone_number: Joi.string().required(),
		profile_pic: Joi.string().required().allow(null, ""),
		password: Joi.string().required()
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}

/*   #########3#####################################################
               Validator for User END
	################### ######################################     */



/*   #########3#####################################################
			   Validator for Company Details Start  
	################### ######################################     */








exports.validateaddcompanyDetails = function (req, res, next) {

	logging.startSection('Add Company Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		company_name: Joi.string().required(),
		company_details: Joi.string().required(),
		exam_name: Joi.string().required(),
		exam_details: Joi.string().required(),
		designation: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}


exports.validateeditcompanyDetails = function (req, res, next) {

	logging.startSection('Update Company Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		company_name: Joi.string().required(),
		company_details: Joi.string().required(),
		exam_name: Joi.string().required(),
		exam_details: Joi.string().required(),
		designation: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	};
}


/*   #########3#####################################################
			   Validator for Company Details END 
	################### ######################################     */



/*   #########3#####################################################
			   Validator for Time Slot Details Start 
	################### ######################################     */


	exports.validateaddtimeSlot = function (req, res, next) {

	logging.startSection('Add time Slot Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		company_id: Joi.string().required(),
		date: Joi.string().required(),
		time: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}

exports.validateeditTimeSlotbyID = function (req, res, next) {

	logging.startSection('Update Company Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		company_id: Joi.string().required(),
		date: Joi.string().required(),
		time: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	};
}



/*	##############################################################
	Validator for Time Slot END 
################### ######################################     */




/*   #########3#####################################################
			   Validator for Question Details Start 
	######################################################     */

exports.validateaddquestion = function (req, res, next) {

	logging.startSection('Add Questions Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		question: Joi.string().required(),

	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}



exports.validateeditquestionbyID = function (req, res, next) {

	logging.startSection('Update Company Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		question: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	};
}




/*   ##############################################################
			   Validator for Questions Details END 
	###############################################     */


/*   ##############################################################
		   Validator for OPTION Details START 
###############################################     */

exports.validateaddoptionDetails = function (req, res, next) {

	logging.startSection('Add Company Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		question_id: Joi.string().required(),
		option_1: Joi.string().required(),
		option_2: Joi.string().required(),
		option_3: Joi.string().required(),
		option_4: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}



exports.validateeditoptionDetails = function (req, res, next) {

	logging.startSection('Update Company Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		question_id: Joi.string().required(),
		option_1: Joi.string().required(),
		option_2: Joi.string().required(),
		option_3: Joi.string().required(),
		option_4: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	};
}



/*   ##############################################################
			   Validator for OPTION Details END 
	###############################################     */

/*   ##############################################################
		   Validator for ANSWER Details START 
###############################################     */




exports.validateAddAnswer = function (req, res, next) {

	logging.startSection('Add ANSWER Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		question_id: Joi.string().required(),
		answer: Joi.string().required(),

	});

	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}

}

exports.EditAnswerDetailsbyID = function (req, res, next) {

	logging.startSection('Edit Answer Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		question_id: Joi.string().required(),
		answer: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	};
}


/*   ##############################################################
			   Validator for Answer Details END 
	###############################################     */

/* ##############################################################
			   Validator for Result Details Start 
	###############################################     */


exports.validateaddresult = function (req, res, next) {

	logging.startSection('Add Result Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		user_name: Joi.string().required(),
		exam_name: Joi.string().required(),
		total_question: Joi.string().required(),
		question_attempted: Joi.string().required(),
		correct_attempts: Joi.string().required(),
		total_marks: Joi.string().required(),
		passing_marks: Joi.string().required(),
		marks_obtained: Joi.string().required(),
		declarations: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}

exports.validateeditresultbyID = function (req, res, next) {

	logging.startSection('Edit Result Details');
	logging.logRequest(req);
	const schema = Joi.object().keys({
		user_name: Joi.string().required(),
		exam_name: Joi.string().required(),
		total_question: Joi.string().required(),
		question_attempted: Joi.string().required(),
		correct_attempts: Joi.string().required(),
		total_marks: Joi.string().required(),
		passing_marks: Joi.string().required(),
		marks_obtained: Joi.string().required(),
		declarations: Joi.string().required(),
	});


	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		if (validateAccessTokenFields(req, res)) {
			console.log(`valid access token`)
			next()
		} else {
			console.log(`access token error`)
		}
	}
}




