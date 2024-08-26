const utility = require('../utils/utility')
const userDao = require('../dao/userDao').userDetails;
const config = require("../../config/config")
const responseMessage = require('../utils/response_message')
const constant = require('../utils/constant');
const universalFunc = require('../utils/utility');
const jwt = require("jsonwebtoken");
const randomOtp = require('../utils/utility').sendOtp




exports.createUser = async (payload, res) => {
    try {
        const userParams = {
            user_name: payload.body.user_name,
            email_id: payload.body.email_id,
            password: payload.body.password,
            phone_number: payload.body.phone_number,
            user_role: payload.body.user_role,
        };


        let checkUserExist = await userDao.checkUserExist(userParams.email_id);
        if (checkUserExist == null) {

            let user = await userDao.addUser(userParams);
            return utility.sendSuccess(responseMessage.SUCCESS.REGISTER, user, res);
        } else {
            return utility.sendError(responseMessage.Error.USER_EXIST, res)
        }
    } catch (error) {
        return utility.sendError(error, res)
    }
}


exports.login = async (payload, res) => {
    try {
        let checkUserExist = await userDao.checkUserExist(payload.email_id);
        // console.log(checkUserExist)

        if (checkUserExist != null && checkUserExist != undefined && checkUserExist != 'undefined') {

            checkUserExist = checkUserExist.dataValues;

            checkUserExist.raw_password = payload.password;


            let checkValidPassword = await universalFunc.validateEmailIdAndPassword(checkUserExist)
            if (checkValidPassword.status == true) {

                
                let jwtSecretKey = config.jwt_key;

                let randomString = new Date() + checkUserExist.user_id;
                let accessTokenExpiryDays = constant.accessTokenExpiryDays.days;




                let token = jwt.sign({
                    user_id: checkUserExist.user_id,
                    user_role: checkUserExist.user_role,
                    email_id: checkUserExist.email_id,
                    string: randomString
                }, jwtSecretKey, { expiresIn: accessTokenExpiryDays });

                accessTokenData = {
                    user_id: checkUserExist.user_id,
                    access_token: token,
                    expiresAt:accessTokenExpiryDays
                }

                await userDao.insertUserAccessToken(accessTokenData);


                let login = {
                    data: {
                        user_id: checkUserExist.user_id,
                        user_name: checkUserExist.user_name,
                        email_id: checkUserExist.email_id,
                        user_role: checkUserExist.user_role,
                        is_active: checkUserExist.is_active,
                        access_token: token
                    }

                }
                return utility.sendSuccess(responseMessage.SUCCESS.LOGIN_SUCCESS, login, res);
            } else {
                return utility.sendError(responseMessage.Error.INVALID_PASSWORD, res);
            }
        } else {
            return utility.sendError(responseMessage.Error.INVALID_EMAIL_ID, res);
        }
    } catch (error) {
        return utility.sendError(error, res);
    }
}


exports.validateEmailIdandSendOtp = async (payload, res) => {
    try {

        const userParams = {
            email_id: payload.email_id,
        };


        let checkUserExist = await userDao.checkUserExist(userParams.email_id);
        if (checkUserExist != null) {
            let createdOtp = randomOtp
            let params = {
                user_id: checkUserExist.dataValues.user_id,
                otp: createdOtp,
            }
            let otpStored = await userDao.otpStored(params);
            setTimeout(() => {
                userDao.updateOtp(params.user_id);
            }, 180000)

            let emailParams = {
                user_id: params.user_id,
                otp: createdOtp,
                email_id: userParams.email_id
            }
            // email.sendMail(emailParams, res)
            return utility.sendSuccess(responseMessage.SUCCESS.OTP_SEND_SUCCESSFULLY, otpStored, res);
        } else {
            return utility.sendError(responseMessage.Error.USER_NOT_EXIST, res)
        }
    } catch (error) {
        return utility.sendError(error, res)
    }
}

exports.varifyOtpAndUpdatePassword = async (payload, res) => {
    try {
        let checkUserExist = await userDao.checkUserExist(payload.body.email_id);
        let is_otp = await userDao.checkOtp(checkUserExist.dataValues.user_id);
        let v_otp = payload.body.otp
        if(checkUserExist==null){ 

            return utility.sendError(responseMessage.Error.USER_NOT_EXIST)

        }else if(payload.new_password!=payload.confirm_password){

            return utility.sendError(responseMessage.Error.NEW_PASSWORD_AND_CONFIRM_PASSWORD_EQUAL)

        }else if(v_otp.length>4 || v_otp.length<4){

            return utility.sendError(responseMessage.Error.OTP_LENGTH_ERROR)

        }else if(v_otp == is_otp.dataValues.otp){

            let updatePassword = await userDao.updatePassword(payload.body)
            
            return utility.sendSuccess(responseMessage.SUCCESS.UPDATE_PASSWORD_SUCCESS,updatePassword,res)


        }else{
            return utility.sendError(responseMessage.Error.WRONG_OTP)
        }
    } catch (error) {
        return utility.sendError(error, res);
    }
}


















