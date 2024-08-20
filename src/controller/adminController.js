const utility = require('../utils/utility')

const adminDao = require('../dao/adminDao').adminDetails;

const bcrypt = require("bcrypt");

const email = require('../utils/notificationServices')

const config = require("../../config/config")

const responseMessage = require('../utils/response_message')

const authjwt = require('../middleware/auth_check').authFunction;

const constant = require('../utils/constant');

const universalFunc = require('../utils/utility');

const jwt = require("jsonwebtoken");
const randomOtp = require('../utils/utility').sendOtp




exports.getUserdetails = async (payload, res) => {
    try {
        let validateUser = await authjwt.authCheck(payload.access_token);
        
        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            if (!payload.page) {
                payload.page = 0
            }
            let offset = (payload.page) * constant.pagination.NUMBER
            let userDetails = await adminDao.getuserdetails(offset);
            utility.sendSuccess(responseMessage.SUCCESS.RETRIEVE_USER_DATA, userDetails, res);

        } else {
            utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, res);
        }
    } catch (error) {
        return utility.sendError(error, res);
    }
}

exports.updateUserProfile = async (payload, res) => {
    try {
        let validateUser = await authjwt.authCheck(payload.body.access_token);

        if (validateUser.data.user_role === constant.userRole.ADMIN) {
            let params = {
                user_id: payload.body.user_id
            };
            if (payload.body.user_name) {
                params.user_name = payload.body.user_name;
            }
            if (payload.body.email_id) {
                params.email_id = payload.body.email_id;
            }
            


            let checkUserExist = await adminDao.checkUserExistbyId(params.user_id);
            
            if (checkUserExist) {
                let user = await adminDao.updateUserProfile(params);
                if (user) {
                    let updatedUser = await adminDao.checkUserExistbyId(params.user_id);

                    return utility.sendSuccess(responseMessage.SUCCESS.UPDATE_PROFILE_SUCCESS, updatedUser.dataValues, res);
                }
            } else {
                return utility.sendError(responseMessage.Error.USER_NOT_EXIST, res);
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, res);
        }
    } catch (error) {
        return utility.sendError(responseMessage.Error.DEFAULT, res);
    }
};

exports.deleteUserbyId = async (payload, res) => {
    try {
        let validateUser = await authjwt.authCheck(payload.body.access_token);

        if (validateUser.data.user_role === constant.userRole.ADMIN) {

            let params = {
                user_id: payload.body.user_id
            };
            let checkUserExist = await adminDao.checkUserExistbyId(params.user_id);

            if (checkUserExist) {
                let user = await adminDao.deleteUserProfile(params);

                return utility.sendSuccess(responseMessage.SUCCESS.USER_DELETED, user, res);

            } else {
                return utility.sendError(responseMessage.Error.USER_NOT_EXIST, res);
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, res);
        }
    } catch (error) {
        return utility.sendError(responseMessage.Error.DEFAULT, res);
    }
};



