const utility = require('../utils/utility')

const responseMessage = require('../utils/response_message');

const authjwt = require('../middleware/auth_check').authFunction;

const constant = require('../utils/constant');

const resultDao = require('../dao/resultDao').resultdao;



/** Add Result Details API */
/**
 * @typedef add_result_details
 * @property {string} user_name.data.required - company id 
 * @property {string} exam_name.data.required - exam details
 * @property {string} total_question.data.required - company details 
 * @property {string} question_attempted.data.required - exam details
 * @property {string} correct_attempts.data.required - company details
 * @property {string} total_marks.data.required - company details
 * @property {string} passing_marks.data.required - exam details
 * @property {string} marks_obtained.data.required - company details
 * @property {string} declarations.data.required - company details
 */
/**
 * This function is used for add result details
 * @route POST /result/api/addresultdetails
 * @group Result Details
 * @security JWT
 * @param {add_result_details.model} add_result_details.body.required
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

exports.addresultdetails = async (payload, resp) => {
    try {
        console.log("in the controler")
        let validateUser = await authjwt.authCheck(payload.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            let checkResultExist = await resultDao.checkUserAndExamName(payload);

            if (checkResultExist.length == 0) {

                let resultdetails = await resultDao.addresultdetail(payload);
                console.log("Come out from DAO")

                return utility.sendSuccess(responseMessage.SUCCESS.ADD_RESULT_DETAILS, resultdetails, resp);
            }
            else {
                return utility.sendError(responseMessage.Error.USER_AND_EXAM_EXIST, resp)
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }
    } catch (error) {
        return utility.sendError(error, resp);
    }
}

/** GET RESULT LIST API */
/**
* This function is used to get Result list
* @route GET /result/api/getresultList
* @security JWT
* @group Result Details 
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/


exports.viewresultList = async (payload, resp) => {
    try {

        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")
        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            console.log("Checking the User Role")

            const resultlist = await resultDao.getresultList();

            let resultList = []
            for (let i in resultlist) {

                resultList.push({
                    user_name: resultlist[i].user_name,
                    exam_name: resultlist[i].exam_name,
                    total_question: resultlist[i].total_question,
                    question_attempted: resultlist[i].question_attempted,
                    correct_attempts: resultlist[i].correct_attempts,
                    total_marks: resultlist[i].total_marks,
                    passing_marks: resultlist[i].passing_marks,
                    marks_obtained: resultlist[i].marks_obtained,
                    declarations: resultlist[i].declarations,

                })
            }



            return utility.sendSuccess(responseMessage.SUCCESS.GET_RESULT_LIST, resultList, resp);
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }

    } catch (err) {
        return utility.sendError(err, resp);
    }
}


/** GET RESULT LIST API */
/**
* This function is used to get Result details by ID
* @route GET /result/api/getresultdetails/{id}
* @security JWT
* @param {number} id.path.required
* @group Result Details 
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/

exports.viewResultbyId = async (payload, resp) => {
    try {

        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")
        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            let params = {
                result_id: payload.params.id,
            }
            let checkResultIdExist = await resultDao.checkresultid(params);



            if (checkResultIdExist != null) {

                const resultlist = await resultDao.getresultdetailsbyid(params);

                let resultList = []
                for (let i in resultlist) {

                    resultList.push({
                        user_name: resultlist[i].user_name,
                        exam_name: resultlist[i].exam_name,
                        total_question: resultlist[i].total_question,
                        question_attempted: resultlist[i].question_attempted,
                        correct_attempts: resultlist[i].correct_attempts,
                        total_marks: resultlist[i].total_marks,
                        passing_marks: resultlist[i].passing_marks,
                        marks_obtained: resultlist[i].marks_obtained,
                        declarations: resultlist[i].declarations,

                    })

                }

                return utility.sendSuccess(responseMessage.SUCCESS.GET_RESULT_DETAILS_BY_ID, resultList, resp);
            }
            else {
                return utility.sendError(responseMessage.Error.ID_NOT_EXIST, resp)
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }
    } catch (err) {
        return utility.sendError(err, resp);
    }
}


/** Edit result details by Id API */
/**
 * @typedef edit_result_details_by_ID
 * @property {string} user_name.data.required - company id 
 * @property {string} exam_name.data.required - exam details
 * @property {string} total_question.data.required - company details 
 * @property {string} question_attempted.data.required - exam details
 * @property {string} correct_attempts.data.required - company details
 * @property {string} total_marks.data.required - company details
 * @property {string} passing_marks.data.required - exam details
 * @property {string} marks_obtained.data.required - company details
 * @property {string} declarations.data.required - company details
 */
/**
 * This function is used for edited result details
 * @route PUT /result/api/editresultbyId/{id}
 * @group Result Details 
 * @security JWT
 * @param {edit_result_details_by_ID.model} edit_result_details_by_ID.body.required
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



exports.editresultbyID = async (payload, resp) => {
    try {
        console.log("in the controler")
        let validateUser = await authjwt.authCheck(payload.body.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                result_id: payload.params.id,
                user_name: payload.body.user_name,
                exam_name: payload.body.exam_name,
                total_question: payload.body.total_question,
                question_attempted: payload.body.question_attempted,
                correct_attempts: payload.body.correct_attempts,
                total_marks: payload.body.total_marks,
                passing_marks: payload.body.passing_marks,
                marks_obtained: payload.body.marks_obtained,
                declarations: payload.body.declarations,
            }


            let checkResultId = await resultDao.checkresultid(params);

            if (checkResultId != null) {

                let user = await resultDao.editresultdetailsbyID(params);


                let resultdetailsupdate = await resultDao.checkresultid(params);

                return utility.sendSuccess(responseMessage.SUCCESS.EDITED_RESULT_DETAILS, resultdetailsupdate, resp);
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

/** DELETE Result Details BY ID API */

/**
 * This function is used for deleting result details by ID
 * @route PUT /result/api/deleteresultdetails/{id}
 * @group Result Details 
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

exports.deleteresultdetailsById = async (payload, resp) => {
    try {

        console.log("Come in Controller")
        let validateUser = await authjwt.authCheck(payload.query.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                result_id: payload.params.id
            }

            let checkResultIdExist = await resultDao.checkresultid(params);



            if (checkResultIdExist != null) {

                let deletetimeslotdetails = await resultDao.deleteresultdetailsById(params.result_id);

                return utility.sendSuccess(responseMessage.SUCCESS.RESULT_DETAILS_DELETED, deletetimeslotdetails, resp);
            }
            else {
                return utility.sendError(responseMessage.Error.ID_NOT_EXIST, resp)
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }

    } catch (err) {
        return utility.sendError(err, resp);
    }
}