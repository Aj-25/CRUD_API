const utility = require('../utils/utility');

const OptionDetailDao = require('../dao/optionDao').optionDetails;

const responseMessage = require('../utils/response_message');

const authjwt = require('../middleware/auth_check').authFunction;

const constant = require('../utils/constant');

/** Add Option Details API */
/**
 * @typedef add_Option_details
 * @property {string} question_id.data.required - company ID 
 * @property {string} option_1.data.required - Option 1 
 * @property {string} option_2.data.required - Option 2 
 * @property {string} option_3.data.required - Option 3 
 * @property {string} option_4.data.required - Option 4 
 */
/**
 * This function is used for Add Option Details
 * @route POST /options/api/addoptiondetails
 * @group Option Details 
 * @security JWT
 * @param {add_Option_details.model} add_Option_details.body.required
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


exports.addOption = async (payload, resp) => {
    try {
        console.log("in the controler")
        let validateUser = await authjwt.authCheck(payload.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            let checkUserExist = await OptionDetailDao.checkOtpionAlreadyExist(payload.question_id);

            if (checkUserExist == null) {

                let user = await OptionDetailDao.addOptionDetail(payload);

                console.log("Come out from DAO")

                return utility.sendSuccess(responseMessage.SUCCESS.ADD_OPTIONS, user, resp)
            } else {
                return utility.sendError(responseMessage.Error.OPTION_ALREADY_EXIST, resp)
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }
    } catch (error) {
        return utility.sendError(error, resp);
    }
}


/** GET OptionLIST API */
/**
* This function is used to get Option list
* @route GET /options/api/getoptionList
* @security JWT
* @group Option Details
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/



exports.viewoptionList = async (payload, resp) => {
    try {
        console.log("come in controller")

        let validateUser = await authjwt.authCheck(payload.query.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            const OptionDetails = await OptionDetailDao.getOptionList();

            let OptionList = []

            for (let i in OptionDetails) {
                OptionList.push({
                    id: OptionDetails[i].id,
                    question_id: OptionDetails[i].question_id,
                    option_1: OptionDetails[i].option_1,
                    option_2: OptionDetails[i].option_2,
                    option_3: OptionDetails[i].option_3,
                    option_4: OptionDetails[i].option_4,
                })
            }
            return utility.sendSuccess(responseMessage.SUCCESS.GET_OPTIONS_LIST, OptionList, resp);
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }

    } catch (err) {
        return utility.sendError(err, resp);
    }
}



/** GET Option Details API BY ID */
/**
* This function is used to get Option list by ID
* @route GET /options/api/getoptionDetailsbyID/{id}
* @security JWT
* @param {number} id.path.required
* @group Option Details
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/





exports.viewoptionDetailsbyId = async (payload, resp) => {
    try {

        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")
        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            console.log("Checking the User Role")
            let params = {
                option_id: payload.params.id,
            }
            const checkUserExist = await OptionDetailDao.checkidExist(params.option_id);

            if (checkUserExist != null) {
                const OptionDetails = await OptionDetailDao.getoptionDetailsbyId(params);

                let OptionList = []
                for (let i in OptionDetails) {
                    OptionList.push({
                        id: OptionDetails[i].id,
                        question_id: OptionDetails[i].question_id,
                        option_1: OptionDetails[i].option_1,
                        option_2: OptionDetails[i].option_2,
                        option_3: OptionDetails[i].option_3,
                        option_4: OptionDetails[i].option_4,
                    })
                }
                return utility.sendSuccess(responseMessage.SUCCESS.GET_OPTIONS_DETAILS_BY_ID, OptionList, resp);
            }
            else {
                return utility.sendError(responseMessage.Error.ID_NOT_EXIST, resp);
            }
        }
        else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }

    } catch (err) {
        return utility.sendError(err, resp);
    }
}

/** Edit Company Details API */
/**
 * @typedef edit_option_details
 * @property {string} question_id.data.required - Question ID 
 * @property {string} option_1.data.required - Option 1
 * @property {string} option_2.data.required - Option 2
 * @property {string} option_3.data.required - Option 3
 * @property {string} option_4.data.required - Option 4
 */
/**
 * This function is used for Edit Option 
 * @route PUT /options/api/editoptionDetailsbyID/{id}
 * @group Option Details 
 * @security JWT
 * @param {number} id.path.required
 * @param {edit_option_details.model} edit_option_details.body.required
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




exports.editOptionDetails = async (payload, resp) => {
    try {
        console.log("in the controler")
        console.log(payload.body)
        let validateUser = await authjwt.authCheck(payload.body.access_token);
        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            console.log(payload.params.id, + "After check the user is admin")
            let params = {
                option_id: payload.params.id,
                question_id: payload.body.question_id,
                option_1: payload.body.option_1,
                option_2: payload.body.option_2,
                option_3: payload.body.option_3,
                option_4: payload.body.option_4,
            }




            let checkUserExist = await OptionDetailDao.checkidExist(params.option_id);
            if (checkUserExist != null) {

                let user = await OptionDetailDao.editOptionDetail(params);
                let optionDetails = await OptionDetailDao.checkidExist(params.option_id);

                return utility.sendSuccess(responseMessage.SUCCESS.EDITED_OPTION_DETAILS, optionDetails, resp);
            }

            else {
                return utility.sendError(responseMessage.Error.ID_NOT_EXIST, resp)
            }
        }
        else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }
    } catch (error) {
        return utility.sendError(error, resp);
    }
}

/** DELETE Option Details BY ID API */
/**
 * @typedef delete_options_details
 */
/**
 * This function is used for deleting event.
 * @route PUT /options/api/deleteoptionDetailsbyID/{id}
 * @group Option Details
 * @security JWT
 * @param {number} id.path.required
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



exports.deleteOptionDetailsById = async (payload, resp) => {
    try {

        let validateUser = await authjwt.authCheck(payload.query.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                option_id: payload.params.id
            }
            let checkUserExist = await OptionDetailDao.checkidExist(params.option_id);
            if (checkUserExist != null) {
            const deleteOptionDetails = await OptionDetailDao.deleteoptionDetailsById(params.option_id);

            
            return utility.sendSuccess(responseMessage.SUCCESS.OPTION_DELETED, deleteOptionDetails, resp);
        }  else {
            return utility.sendError(responseMessage.Error
                .ID_NOT_EXIST, resp)
        }
    }
        else
        {
           return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }

    } catch (err) {
        return utility.sendError(err, resp);
    }
}
