const utility = require('../utils/utility')

const timeSlotDao = require('../dao/timeSlotDao').timeSlotdao;

const responseMessage = require('../utils/response_message');

const authjwt = require('../middleware/auth_check').authFunction;

const constant = require('../utils/constant');



/** Add Time Slot API */
/**
 * @typedef add_time_slot
 * @property {string} company_id.data.required - company id 
 * @property {string} date.data.required - exam details
 * @property {string} time.data.required - company details
 */
/**
 * This function is used for add time slot details.
 * @route POST /timeslot/api/addtimeSlotDetails
 * @group Time Slot 
 * @security JWT
 * @param {add_time_slot.model} add_time_slot.body.required
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


exports.addTimeslot = async (payload, resp) => {
    try {
        console.log("in the controler")
        let validateUser = await authjwt.authCheck(payload.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            let checkUserExist = await timeSlotDao.checkcompanyid(payload);
            console.log(checkUserExist)

            if (checkUserExist == 0) {

                let timeslotadd = await timeSlotDao.addTimeSlot(payload);
                console.log("Come out from DAO")

               return utility.sendSuccess(responseMessage.SUCCESS.ADD_TIME_SLOT, timeslotadd, resp);
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

/** GET Time Slot LIST API */
/**
* This function is used to get Time Slot list
* @route GET /timeslot/api/getTimeSlotList
* @security JWT
* @group Time Slot 
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/



exports.viewtimeSlotList = async (payload, resp) => {
    try {
        console.log("Come in controller ")
        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")
        if (validateUser.data.user_role == constant.userRole.ADMIN) {

            const timeSlot = await timeSlotDao.getTimeslotList();

            let timeSlotlist = []
            for (let i in timeSlot) {

                timeSlotlist.push({
                    id: timeSlot[i].id,
                    company_id: timeSlot[i].company_id,
                    date: timeSlot[i].date,
                    time: timeSlot[i].time,

                })

            }
            return utility.sendSuccess(responseMessage.SUCCESS.GET_TIME_SLOT_LIST, timeSlotlist, resp);
        } else {
            return utility.sendError(responseMessage.Error.UNATHORIZE_ACCESS, resp);
        }
    } catch (err) {
        return utility.sendError(err, resp);
    }
}



/** GET Time Slot Details API BY ID */
/**
* This function is used to get Time slot Details by ID
* @route GET /timeslot/api/gettimeSlotDetails/{id}
* @security JWT
* @param {number} id.path.required
* @group Time Slot
* @returns {object} 200 - and a message
* @returns {Error} default - Unexpected error
*/



exports.viewtimeSlotbyId = async (payload, resp) => {
    try {
        console.log("Come in controller ")
        let validateUser = await authjwt.authCheck(payload.query.access_token);
        console.log("Come out from auth check ")
        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                timeslot_id: payload.params.id,
            }


            let checkUserExist = await timeSlotDao.checkidExist(params.timeslot_id, resp);
            console.log(checkUserExist)

            if (checkUserExist != null) {
                const timeSlot = await timeSlotDao.getTimeSlotDetailsbyId(params.timeslot_id);

                let timeSlotlist = []
                for (let i in timeSlot) {

                    timeSlotlist.push({
                        id: timeSlot[i].id,
                        company_id: timeSlot[i].company_id,
                        date: timeSlot[i].date,
                        time: timeSlot[i].time,

                    })

                }
                return utility.sendSuccess(responseMessage.SUCCESS.GET_TIME_SLOT_LIST_BY_ID, timeSlotlist, resp);
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

/** Edit Time Slot by Id API */
/**
 * @typedef edit_time_slot_by_ID
 * @property {string} company_id.data.required - company id 
 * @property {string} date.data.required - exam details
 * @property {string} time.data.required - company details
 */
/**
 * This function is used for edit time slot details by ID
 * @route PUT /timeslot/api/edittimeSlotbyId/{id}
 * @group Time Slot 
 * @security JWT
 * @param {edit_time_slot_by_ID.model} edit_time_slot_by_ID.body.required
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


exports.editTimeSlotbyID = async (payload, resp) => {
    try {
        console.log("in the controler")
        console.log(payload.body)
        let validateUser = await authjwt.authCheck(payload.body.access_token);
        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                id: payload.params.id,
                company_id: payload.body.company_id,
                date: payload.body.date,
                time: payload.body.time,
            }
            
            let checkUserExist = await timeSlotDao.checkidExist(params.id);

			if (checkUserExist != null) {

				let user = await timeSlotDao.editTimeSlotbyID(params);
				
				let timeslotupdate = await timeSlotDao.checkidExist(params.id);

				
                return utility.sendSuccess(responseMessage.SUCCESS.EDITED_TIME_SLOT_Details, timeslotupdate, resp);
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


/** DELETE Time Slot Details BY ID API */

/**
 * This function is used for deleting time slot details by ID.
 * @route PUT /timeslot/api/deletetimeslotdetails/{id}
 * @group Time Slot 
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


exports.deletetimeslotdetailsById = async (payload, resp) => {
    try {

        console.log("Come in controller")
        let validateUser = await authjwt.authCheck(payload.query.access_token);

        if (validateUser.data.user_role == constant.userRole.ADMIN) {
            let params = {
                timeslot_id: payload.params.id
            }

            let checkUserExist = await timeSlotDao.checkidExist(params.timeslot_id);

			if (checkUserExist != null) {
            const deletetimeslotDetails = await timeSlotDao.deletetimeslotdetailsById(params.timeslot_id);


            return utility.sendSuccess(responseMessage.SUCCESS.TIME_SLOT_DELETED, deletetimeslotDetails, resp);
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