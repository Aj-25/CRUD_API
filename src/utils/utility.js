const { SUCCESS,Error  }      = require('./response_message');
const bcrypt = require("bcrypt");


exports.response = (res, status, message, result) => {
	let response;
	response = {
		status,
		message,
		data: result,
	}
	return res.json({ 'res': response });
};


exports.sendError = function (err, res) {
	const errorMessage = err.customMessage || err.message || err.DEFAULT.customMessage;
	if (typeof err == 'object' && err.hasOwnProperty('rescode') && err.hasOwnProperty('customMessage')) {
		return res.status(err.statusCode).send({ statusCode: err.statusCode, message: errorMessage, type: err.type || Error.DEFAULT.type });
	}
	let statusCode = err.hasOwnProperty('statusCode') ? err.statusCode : 400;
	let responseObj = { statusCode: statusCode, message: errorMessage, type: err.type || Error.DEFAULT.type };
	return res.status(statusCode).send(responseObj);
};

exports.sendSuccess = function (successMsg, data, res, receivedResponseObj) {
	let statusCode = successMsg.statusCode || 200;
	
	let message = successMsg.customMessage || SUCCESS.DEFAULT.customMessage;
	
	let responseObj = receivedResponseObj ? receivedResponseObj : { statusCode: statusCode, message: message, data: data || {} };

	return res.status(statusCode).send(responseObj);
};

exports.validateEmailIdAndPassword = function (payload) {
	console.log('validate Email and password')
	// console.log(payload)
	return new Promise((resolve, reject) => {
		try {
			console.log(bcrypt.compareSync(payload.raw_password, payload.password))
			if(bcrypt.compareSync(payload.raw_password, payload.password)) {
				resolve({status : true})
			}else{
				 resolve({status: false})
			}
		} catch (err) {
			return reject(err);
		}
	})
}


function between(min, max) {  
  return Math.floor(
	Math.random() * (max - min) + min
  )
}




exports.sendOtp=between(1000,9999)
  

