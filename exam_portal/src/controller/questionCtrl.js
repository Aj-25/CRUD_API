const utility = require('../utils/utility')

const responseMessage = require('../utils/response_message');

const authjwt = require('../middleware/auth_check').authFunction;

const constant = require('../utils/constant');

const questionDao = require('../dao/questionDao').questionsDao;



/** Add Questions In API */
/**
 * @typedef add_questions
 * @property {string} question.data.required - questions
 */
/**
 * This function is used for add Questions.
 * @route POST /questions/api/addquestionsdetails
 * @group Questions Details 
 * @security JWT
 * @param {add_questions.model} add_questions.body.required
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


exports.addQuestions = async (payload, res) => {
    try {
        console.log("in the controler")
        let validateUser = await authjwt.authCheck(payload.access_token);
        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                question: payload.question
            }
            console.log(params.question)

            let checkQuestionExist = await questionDao.checkquestionsExist(params, res);

            if (checkQuestionExist == 0) {
                let addquestion = await questionDao.addquestions(payload);

                return utility.sendSuccess(responseMessage.SUCCESS.ADD_QUESTIONS, addquestion, res);
            }

            else {
                return utility.sendError(responseMessage.Error.QUESTION_EXIST, res)
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, res);
        }
    } catch (error) {
        return utility.sendError(error, res);
    }
}

/** GET COMPANY LIST API */
/**
* This function is used to get question list
* @route GET /questions/api/getquestionsList
* @security JWT
* @group Questions Details 
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/



exports.viewquestionsList = async (payload, resp) => {
    try {
        console.log("Come in controller")
        let validateUser = await authjwt.authCheck(payload.query.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {


            const questionDetails = await questionDao.getquestionsList();

            let questionlist = []
            for (let i in questionDetails) {

                questionlist.push({
                    id: questionDetails[i].id,
                    question: questionDetails[i].question,

                })
            }

            return utility.sendSuccess(responseMessage.SUCCESS.GET_QUESTIONS_LIST, questionlist, resp);
        }
        else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }
    } catch (err) {
        return utility.sendError(err, resp);
    }
}



/** GET Questions Details API BY ID */
/**
* This function is used to get Questions list by ID
* @route GET /questions/api/getquestionsDetailsbyID/{id}
* @security JWT
* @param {number} id.path.required
* @group Questions Details
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/


exports.viewquestiondetailsbyId = async (payload, resp) => {
    try {

        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")


        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            let params = {
                question_id: payload.params.id,
            }


            let checkIdExist = await questionDao.checkIdExist(params.question_id, resp);

            if (checkIdExist != 0) {


                const questionDetailsbyID = await questionDao.getquestiontDetailsbyId(params);
                let questionlistbyList = []

                for (let i in questionDetailsbyID) {
                    questionlistbyList.push({
                        id: questionDetailsbyID[i].id,
                        question: questionDetailsbyID[i].question,
                    })
                }

                return utility.sendSuccess(responseMessage.SUCCESS.GET_QUESTIONS_DETAILS_LIST_BY_ID, questionlistbyList, resp);
            }
            else {
                return utility.sendError(responseMessage.Error.ID_NOT_EXIST, resp);
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }

    } catch (err) {
        return utility.sendError(err, resp);
    }
}

/**
 * @typedef edit_questions_details_by_ID
 * @property {string} question.data.required - Questions Details
 */
/**
 * This function is used for edit question details
 * @route PUT /questions/api/editquestionbyId/{id}
 * @group Questions Details 
 * @security JWT
 * @param {number} id.path.required 
 * @param {edit_questions_details_by_ID.model} edit_questions_details_by_ID.body.required
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


exports.editquestionbyID = async (payload, resp) => {
    try {
        console.log("in the controler")

        let validateUser = await authjwt.authCheck(payload.body.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {


            let params = {
                id: payload.params.id,
                question: payload.body.question,
            }


            let checkUserExist = await questionDao.checkIdExist(params.id, resp);


            if (checkUserExist != 0) {

                let user = await questionDao.editquestionsbyID(params, resp);

                let questiondetailsupdate = await questionDao.checkIdExist(params.id);

                return utility.sendSuccess(responseMessage.SUCCESS.EDITED_QUESTIONS_DETAILS, questiondetailsupdate, resp);
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


/** DELETE Question details BY ID API */
// /**
//  * @typedef Question details API
//  */
/**
 * This function is used for deleting question details
 * @route PUT /questions/api/deleteqestiondetails/{id}
 * @group Questions Details
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


exports.deletequestiondetailsById = async (payload, resp) => {
    try {

        console.log("Come in controller")
        let validateUser = await authjwt.authCheck(payload.query.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                question_id: payload.params.id
            }

            let checkUserExist = await questionDao.checkIdExist(params.question_id, resp);

            console.log(checkUserExist)

            if (checkUserExist != 0) {

                const deletetQuestionDetails = await questionDao.deletequestionsdetailsById(params.question_id);


                return utility.sendSuccess(responseMessage.SUCCESS.DELETED_QUESTION, deletetQuestionDetails, resp);
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

