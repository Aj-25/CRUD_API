const utility = require('../utils/utility')

const userDao = require('../dao/userDao').userDetails;

const bcrypt = require("bcrypt");

const email = require('../utils/email')


const responseMessage = require('../utils/response_message')

const authjwt = require('../middleware/auth_check').authFunction;

const constant = require('../utils/constant');

const universalFunc = require('../utils/utility');

const jwt = require("jsonwebtoken");
const randomOtp = require('../utils/utility').sendOtp






/** USER REGISTER API */
/**
 * @typedef user_register
 * @property {string} user_name.data.required - user first name
 * @property {string} email_id.data.required - user email id
 * @property {string} password.data.required - password
 * @property {string} phone_number - mobile number
 * @property {string} profile_pic.data.required - user profile pic
 */
/**
 * This function is used for signup of users.
 * @route POST /user/api/register
 * @group User 
 * @param {user_register.model} user_register.body.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response} 200 - response object containing data, message and status code
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef Response
 * @property {integer} status
 * @property {string} message.required - response message
 * @property {data} response data payload
 */


exports.createUser = async (payload, res) => {
    try {
        const userParams = {
            user_name: payload.body.user_name,
            email_id: payload.body.email_id,
            password: payload.body.password,
            phone_number: payload.body.phone_number,
            profile_pic: payload.body.profile_pic,
            user_role: constant.userRole.USER,
        };


        let checkUserExist = await userDao.checkUserExist(userParams.email_id);
        if (checkUserExist == null) {

            let user = await userDao.addUser(userParams);
            console.log("Come out from dao")

            return utility.sendSuccess(responseMessage.SUCCESS.REGISTER, user, res);
        } else {
            return utility.sendError(responseMessage.Error.USER_EXIST, res)
        }
    } catch (error) {
        return utility.sendError(error, res)
    }
}

/** VIEW USERS PROFILE WITH ACCESS TOKEN API */
/**
* This function is used to get user profile by access token
* @route GET /user/api/viewUserProfile
* @security JWT
* @group User
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/

exports.viewUserProfile = async (payload, res) => {
    try {

        console.log(payload)
        let userdetails = await authjwt.authCheck(payload.access_token);

        if (userdetails.data.user_role == constant.userRole.USER || userdetails.data.user_role == constant.userRole.ADMIN) {
            console.log(userdetails)


            let UserDetails = await userDao.getUserDetailByUserId(userdetails.data.user_id);

            return utility.sendSuccess(responseMessage.SUCCESS.VIEW_USER_PROFILE, UserDetails, res);
        }
    } catch (error) {
        return utility.sendError(error, res);
    }
}

/** USER LOGIN API*/
/**
 * @typedef login_user
 * @property {string} email_id.data.required - user email id
 * @property {string} password.data.required - password
 */
/**
 * This function is used for login to users.
 * @route POST /user/api/login
 * @group User 
 * @param {login_user.model} login_user.body.required 
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response} 200 - response object containing data, message and status code
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef Response
 * @property {integer} status
 * @property {string} message.required - response message
 * @property {data} response data payload
 */
exports.login = async (payload, res) => {
    try {
        let checkUserExist = await userDao.checkUserExist(payload.email_id);


        if (checkUserExist != null && checkUserExist != undefined && checkUserExist != 'undefined') {

            checkUserExist = checkUserExist.dataValues;

            checkUserExist.raw_password = payload.password;


            let checkValidPassword = await universalFunc.validateEmailIdAndPassword(checkUserExist)
            console.log(checkValidPassword, 'checkValidPassword')
            if (checkValidPassword.status == true) {

                let jwtSecretKey = "kDLz4XXiulksjcSHkZATj10stOpU2UJ/1GxiHtGo";
                let randomString = new Date() + checkUserExist.id;
                let accessTokenExpiryDays = constant.accessTokenExpiryDays.days;




                let token = jwt.sign({
                    user_id: checkUserExist.id,
                    user_role: checkUserExist.user_role,
                    email_id: checkUserExist.email_id,
                    string: randomString
                }, jwtSecretKey, { expiresIn: accessTokenExpiryDays });
                
                accessTokenData = {
                    user_id: checkUserExist.id,
                    access_token: token
                }

                await userDao.insertUserAccessToken(accessTokenData);


                let login = {
                    data: {
                        user_id: checkUserExist.id,
                        user_name: checkUserExist.user_name,
                        email_id: checkUserExist.email_id,
                        user_role: checkUserExist.user_role,
                        phone_number: checkUserExist.phone_number,
                        profile_pic: checkUserExist.profile_pic,
                        is_active: checkUserExist.is_active,
                        access_token: token
                    }

                }
                return utility.sendSuccess(responseMessage.SUCCESS.LOGIN_SUCCESS, login, res);
            }else{
                return utility.sendError(responseMessage.Error.INVALID_PASSWORD, res);
            }
          }else {
            return utility.sendError(responseMessage.Error.INVALID_EMAIL_ID, res);
        }
    } catch (error) {
        return utility.sendError(error, res);
    }
}

/** UPDATE USER PROFILE API */
/**
 * @typedef update_user_profile
 * @property {string} user_name.data.required - user name 
 * @property {string} phone_number.required - user mobile number
 * @property {string} profile_pic.required - user profile pic
 * @property {string} password.data.required - user password
 */

/**
 * This function is used to update the users profile.
 * @route PUT /user/api/updateUserProfile
 * @group User 
 * @security JWT
 * @param {update_user_profile.model} update_user_profile.body.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response} 200 - response object containing data, message and status code
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef Response
 * @property {integer} status
 * @property {string} message.required - response message
 * @property {data} response data payload
 */



exports.updateUserProfile = async (payload, resp) => {
    try {
        let validateUser = await authjwt.authCheck(payload.body.access_token);

        

        if (validateUser.data.user_role == constant.userRole.USER || validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                user_id: validateUser.data.user_id,
                user_name: payload.body.user_name,
                phone_number: payload.body.phone_number,
                profile_pic: payload.body.profile_pic,
                password: payload.body.password,
                access_token: payload.body.access_token
            }

            let checkUserExist = await userDao.checkidExist(params.user_id);

            if (checkUserExist != null) {
                console.log("Entered in checkuserexist")

                let user = await userDao.updateUserProfile(params)

                if(user){

               let checkUserExist = await userDao.checkidExist(params.user_id);

                return utility.sendSuccess(responseMessage.SUCCESS.UPDATE_PROFILE_SUCCESS, checkUserExist.dataValues, resp);
            }}

           } 
        
        else {
           return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }
    } catch (error) {
        return utility.sendError(error, resp);
    }
}