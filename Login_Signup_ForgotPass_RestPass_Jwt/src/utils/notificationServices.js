const constant         = require('../utils/constant');
const utility         = require('../utils/utility');
const mailTemplates         = require('../utils/emailTemplate');
const config           = require('../../config/config');
const nodemailer = require("nodemailer")
const responseMessage = require('../utils/response_message');



const USER = config.email_user
const PASSWORD = config.email_password
const HOST = config.email_host
const PORT = config.email_port


exports.sendMail = async (payload, res) => {
    try {
        const transport = nodemailer.createTransport({
            host: HOST,
            port: PORT,
            secure: false,
            auth: {
                user: USER,
                pass: PASSWORD
            }
        })
 
        const mailoption = {
            from: USER,
            to: payload.email_id,
            subject: constant.emailSubject,
            html: mailTemplates.otpCreated(payload.otp)
        
        }
            
        transport.sendMail(mailoption, function(err, info) {
            if (err) {
              console.log(err)
              return utility.sendError(responseMessage.Error.DEFAULT.customMessage, result, res);
            } else {
              console.log(info);
              return utility.sendSuccess(responseMessage.SUCCESS.OTP_SEND_TO_EMAIL, result, res);
            }
        })

    } catch (error) {
        return error
    }
}













