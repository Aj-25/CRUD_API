
const { SUCCESS,Error  }      = require('./response_message');

const logging          = require('./logging');
const _                = require('underscore');
const config           = require('../config/config');
const bcrypt = require("bcrypt");
const CryptoJS           = require("crypto-js");
const responseMessage = require('../utils/response_message');
const express = require('express');


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
	logging.logResponse(responseObj);
	// return res.status(statusCode).send(responseObj);
	return responseObj
	// return res.status(400).json({
	// 	customMessage:errorMessage,
	// 	data: responseObj
	// })
};

exports.sendSuccess = function (successMsg, data, res, receivedResponseObj) {
	let statusCode = successMsg.statusCode || 200;
	
	let message = successMsg.customMessage || SUCCESS.DEFAULT.customMessage;
	
	let responseObj = receivedResponseObj ? receivedResponseObj : { statusCode: statusCode, message: message, data: data || {} };

	logging.logResponse(responseObj);
	// return res.status(statusCode).send(responseObj);
		return responseObj




	// if (origin && origin != config.swagger_origin) {
	// 	logging.logResponse(responseObj);
	// 	// responseObj = CryptoJS.AES.encrypt(JSON.stringify(responseObj), config.encrypt_key).toString();

	// 	return res.status(statusCode).send(responseObj);

	// } else {
	// 	// logging.logResponse(responseObj);
	// 	// let responseObj = { statusCode: statusCode, message: errorMessage, type: err.type || Error.DEFAULT.type };
	// 	// responseObj = CryptoJS.AES.encrypt(JSON.stringify(responseObj), config.encrypt_key).toString();
		
	// 	// return responseObj
	// 	return res.status(statusCode).send(responseObj);
	// 	    // return res.status(200).json({
	// 		//         customMessage:message,
	// 		//         data: responseObj
	// 		//     })
	// }
};

exports.validateEmailIdAndPassword = function (payload) {
	console.log('validate Email and password')
	// console.log(payload)
	return new Promise((resolve, reject) => {
		try {
			// console.log(payload,'payload')
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

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.!@#$%&*?';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

exports.sendOtp=between(1000,9999)
  
exports.sendPassword=generateString(8)
  
