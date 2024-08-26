const utility = require('../utils/utility');

const responseMessage = require('../utils/response_message');

const authjwt = require('../middleware/auth_check').authFunction;

const constant = require('../utils/constant');

const answerDao = require("../dao/answerDao").AnswerDao





/** Add Answer Details API */
/**
 * @typedef add_answer_details
 * @property {string} question_id.data.required - company id 
 * @property {string} answer.data.required - exam details
*/
/**
 * This function is used for add answer to respective question Id
 * @route POST /answer/api/addanswerDetails
 * @group Answer Details 
 * @security JWT
 * @param {add_answer_details.model} add_answer_details.body.required
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


exports.addAnswer = async (payload, resp) => {
    try {
        console.log("in the controler")

        let validateUser = await authjwt.authCheck(payload.body.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                question_id: payload.body.question_id,
                answer: payload.body.answer
            }

            let checkQuestionExist = await answerDao.checkquestionId(params);

            if (checkQuestionExist.length == 0) {
                let answerDetails = await answerDao.addAnswer(params);
                return utility.sendSuccess(responseMessage.SUCCESS.ADD_ANSWER, answerDetails, resp);

            }

            else {
                return utility.sendError(responseMessage.Error.QUESTION_ID_EXIST, resp)
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }


    } catch (error) {

        return utility.sendError(error, resp);
    }
}

/** GET Answer LIST API */
/**
* This function is used to get Answer list
* @route GET /answer/api/getanswerlist
* @security JWT
* @group Answer Details 
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/

exports.viewAnswerList = async (payload, resp) => {
    try {

        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")
        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            const Answerlist = await answerDao.getanswerList();




            let answerlist = []
            for (let i in Answerlist) {
                answerlist.push({
                    id: Answerlist[i].id,
                    question_id: Answerlist[i].question_id,
                    answer: Answerlist[i].answer,
                })
            }
            return utility.sendSuccess(responseMessage.SUCCESS.GET_ANSWER_LIST, answerlist, resp);
        }
        else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }

    } catch (err) {
        return utility.sendError(err, resp);
    }
}



/** GET Time Slot Details API BY ID */
/**
* This function is used to get Company list by ID
* @route GET /answer/api/getanswerDetailsbyID/{id}
* @security JWT
* @param {number} id.path.required
* @group Answer Details 
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/

exports.viewanswerDetailsbyId = async (payload, resp) => {
    try {

        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")
        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            let params = {
                answer_id: payload.params.id,
            }


            const answerdetails = await answerDao.getanswerdetailsbyID(params.answer_id);
            if (answerdetails != 0) {
                let AnswerDetails = []
                for (let i in answerdetails) {
                    AnswerDetails.push({
                        id: answerdetails[i].id,
                        question_id: answerdetails[i].question_id,
                        answer: answerdetails[i].answer,
                    })
                }

                return utility.sendSuccess(responseMessage.SUCCESS.GET_ANSWER_DETAILS_BY_ID, AnswerDetails, resp);
            } else {
                console.log("Error")
                return utility.sendError(responseMessage.Error.ID_NOT_EXIST, resp);
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }


    } catch (err) {
        return utility.sendError(err, resp);
    }
}

/** Edit Answer Details API */
/**
 * @typedef edit_answer_details
 * @property {string} question_id.data.required - company id 
 * @property {string} answer.data.required - exam details
*/
/**
 * This function is used for edit answer details to respective question Id
 * @route PUT /answer/api/editanswerdetailsbyId/{id}
 * @group Answer Details 
 * @security JWT
 * @param {edit_answer_details.model} edit_answer_details.body.required
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


exports.editAnswerDetailsbyID = async (payload, resp) => {
    try {
        console.log("in the controler")

        let validateUser = await authjwt.authCheck(payload.body.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {


            let params = {
                answer_id: payload.params.id,
                question_id: payload.body.question_id,
                answer: payload.body.answer
            }

            let checkanswerIdexist = await answerDao.checkAnswerIdExist(params.answer_id);

            if (checkanswerIdexist != 0) {

                let user = await answerDao.editAnswerDetailsbyID(params);

                let AnswerDetailsupdate = await answerDao.checkAnswerIdExist(params.answer_id);


                return utility.sendSuccess(responseMessage.SUCCESS.EDITED_ANSWER_DETAILS, AnswerDetailsupdate, resp);
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

/** DELETE Answer Details BY ID API */

/**
 * This function is used for deleting Answer details
 * @route PUT /answer/api/deleteanswerdetails/{id}
 * @group Answer Details 
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


exports.deleteAnswerdetailsById = async (payload, resp) => {
    try {
        console.log("in the controler")
        let validateUser = await authjwt.authCheck(payload.query.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                answer_id: payload.params.id
            }
            let checkanswerIdexist = await answerDao.checkAnswerIdExist(params.answer_id);

            if (checkanswerIdexist != 0) {

                const deleteanswerDetails = await answerDao.deleteanswerdetailsById(params.answer_id);

                return utility.sendSuccess(responseMessage.SUCCESS.ANSWER_DETAILS_DELETED, deleteanswerDetails, resp);
            } else {
                return utility.sendError(responseMessage.Error.ID_NOT_EXIST, resp)

            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }

    } catch (err) {
        return utility.sendError(err, resp);
    }
}