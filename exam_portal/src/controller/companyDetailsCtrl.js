const utility = require('../utils/utility')

const responseMessage = require('../utils/response_message');

const authjwt = require('../middleware/auth_check').authFunction;

const constant = require('../utils/constant');

const CompanyDetailDao = require('../dao/companyDetailsdao').companyDetails;



/** Add Company Details API */
/**
 * @typedef add_company_details
 * @property {string} company_name.data.required - company Name 
 * @property {string} company_details.data.required - company details
 * @property {string} exam_name.data.required - exam name
 * @property {string} exam_details.data.required - exam details
 * @property {string} designation - For desgination Exam conducted
 */
/**
 * This function is used for Add Company Details.
 * @route POST /companyDetails/api/addcompanyDetails
 * @group Company Details 
 * @security JWT
 * @param {add_company_details.model} add_company_details.body.required
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


exports.addCompanyDetails = async (payload, resp) => {
    try {
        console.log("in the controler")

        let validateUser = await authjwt.authCheck(payload.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            let checkUserExist = await CompanyDetailDao.checkcompanyExist(payload);
            if (checkUserExist == null) {

                let user = await CompanyDetailDao.addcompanyDetail(payload);
                console.log("Come out from DAO")

               return utility.sendSuccess(responseMessage.SUCCESS.ADD_COMPANY, user, resp);
            }
            else {
                return utility.sendError(responseMessage.Error.COMPANY_EXIST, resp)
            }
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }
    } catch (error) {
        return utility.sendError(error, resp);
    }
}

/** GET COMPANY LIST API */
/**
* This function is used to get Company list
* @route GET /companyDetails/api/getcompanyList
* @security JWT
* @group Company Details
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/



exports.viewCompanyList = async (payload, resp) => {
    try {
        console.log("Come in Services ")
        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")

        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            

            const CompanyDetails = await CompanyDetailDao.getCompanyList();

            let CompanyList = []
            for (let i in CompanyDetails) {

                CompanyList.push({
                    id: CompanyDetails[i].id,
                    company_name: CompanyDetails[i].company_name,
                    company_details: CompanyDetails[i].company_details,
                    exam_name: CompanyDetails[i].exam_name,
                    exam_details: CompanyDetails[i].exam_details,
                    designation: CompanyDetails[i].designation,
                })
            }

            return utility.sendSuccess(responseMessage.SUCCESS.VIEW_COMPANY_LIST, CompanyList, resp);

        }
        else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }
    } catch (err) {
        return utility.sendError(err, resp);
    }
}

/** GET COMPANY LIST API BY ID */
/**
* This function is used to get Company list by ID
* @route GET /companyDetails/api/getcompanyDetails/{id}
* @security JWT
* @param {number} id.path.required
* @group Company Details
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/





exports.viewcompanyDetailsbyId = async (payload, resp) => {
    try {

        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")
        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            console.log("Checking the User Role")
            let params = {
                company_id: payload.params.id,
            }
            let checkUserExist = await CompanyDetailDao.checkidExist(params.company_id);
            if (checkUserExist != null) {
                const CompanyDetails = await CompanyDetailDao.getCompanyDetailsbyId(params);

                let CompanyList = []
                for (let i in CompanyDetails) {
                    CompanyList.push({
                        id: CompanyDetails[i].id,
                        company_name: CompanyDetails[i].company_name,
                        company_details: CompanyDetails[i].company_details,
                        exam_name: CompanyDetails[i].exam_name,
                        exam_details: CompanyDetails[i].exam_details,
                        designation: CompanyDetails[i].designation,
                    })

                }

                return utility.sendSuccess(responseMessage.SUCCESS.VIEW_COMPANY_DETAILS_BY_ID, CompanyList, resp);
            }
            else {
                return utility.sendError(responseMessage.Error.COMPANY_ID_NOT_EXIST, resp);
            }
        } else {
           return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }

    } catch (err) {
        return utility.sendError(err, resp);
    }
}


/** Edit Company Details API */
/**
 * @typedef edit_company_details
 * @property {string} company_name.data.required - company Name 
 * @property {string} company_details.data.required - company details
 * @property {string} exam_name.data.required - exam name
 * @property {string} exam_details.data.required - exam details
 * @property {string} designation - For desgination Exam conducted
 */
/**
 * This function is used for Edit Company Details by ID.
 * @route PUT /companyDetails/api/editcompanyDetails/{id}
 * @group Company Details 
 * @security JWT
 * @param {number} id.path.required
 * @param {edit_company_details.model} edit_company_details.body.required
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




exports.editCompanyDetails = async (payload, resp) => {
    try {
        console.log("in the controler")
        console.log(payload.body)
        let validateUser = await authjwt.authCheck(payload.body.access_token);
        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            let params = {
                company_id: payload.params.id,
                company_name: payload.body.company_name,
                company_details: payload.body.company_details,
                exam_name: payload.body.exam_name,
                exam_details: payload.body.exam_details,
                designation: payload.body.designation,
            }
            let checkUserExist = await CompanyDetailDao.checkidExist(params.company_id);
            if (checkUserExist != null) {

                let user = await CompanyDetailDao.editCompanyDetail(params);
                let companyList = await CompanyDetailDao.checkidExist(params.company_id);


                return utility.sendSuccess(responseMessage.SUCCESS.EDITED_COMPANY, companyList, resp);
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

/** DELETE Company Details BY ID API */
/**
 * @typedef delete_company_details
 */
/**
 * This function is used for deleting the company details by ID
 * @route PUT /companyDetails/api/deleteCompanyDetails/{id}
 * @group Company Details
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


exports.deleteCompanyDetailsById = async (payload, resp) => {
    try {

        console.log("Come in services")
        let validateUser = await authjwt.authCheck(payload.query.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                company_id: payload.params.id
            }
            
            let checkUserExist = await CompanyDetailDao.checkidExist(params.company_id);

            if (checkUserExist != null) {

                const deleteCompanyDetails = await CompanyDetailDao.deleteCompanyDetailsById(params.company_id);

            

                return utility.sendSuccess(responseMessage.SUCCESS.DELETE_COMPANY_DETAILS, deleteCompanyDetails, resp);
    
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

