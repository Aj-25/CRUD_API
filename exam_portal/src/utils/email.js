
// const constant         = require('../utils/constant');
// const config           = require('../config/config');
// const { google } = require("googleapis")
// const nodemailer = require("nodemailer")
// const responseMessage = require('../utils/response_message');
// const mailTemplates = require("./emailTemplates")
// const Handlebars = require('handlebars');


// const USER = config.user
// const PASSWORD = config.userpass
// const HOST = config.host
// // const PORT = process.env.SES_PORT

// exports.sendMail = async (payload, res) => {
//     try {
//         const transport = nodemailer.createTransport({
//             host: HOST,
//             port: 587,
//             secure: false,
//             auth: {
//                 user: USER,
//                 pass: PASSWORD
//             }
//         })
 
//         const mailoption = {
//             from: '"Dragon LIGA Support" <no-reply@thesynapses.com>',
//             to: payload.email_id,
//             subject: "EMAIL FROM DRAGON LIGA",
//             text: 'Greeting,',
//             html: ``
        
//         }
//             switch(payload.emailType) {
//                 case constant.emailType.EMAIL_VERIFICATION_OTP:
//                     mailoption.html = renderMessageFromTemplateAndVariable(mailTemplates.verificationToken, payload);
//                     break;
//                 case constant.emailType.LOGIN_CREDENTIAL:
//                     mailoption.html = renderMessageFromTemplateAndVariable(mailTemplates.loginCredential, payload);
//                     break;
//                 case constant.emailType.EMAIL_AUTHENTICATION_OTP:
//                     mailoption.html = renderMessageFromTemplateAndVariable(mailTemplates.emailAuthentication, payload);
//                     break;
//                 default:
//                     console.log("No case matched while sending mail with : " + emailType);
//                     return;
//             }
//         transport.sendMail(mailoption, function(err, info) {
//             if (err) {
//               console.log(err)
//             //   return utility.sendError(.DEFAULT.customMessage, result, res);
//             } else {
//               console.log(info);
//               return utility.sendSuccess(responseMessage.SUCCESS.DEFAULT, result, res);
//             }
//         })

//     } catch (error) {
//         return error
//     }
// }

// function renderMessageFromTemplateAndVariable(templateData, variablesData, emailTemplate) {
//     return Handlebars.compile(templateData)(variablesData, emailTemplate);
//   }
// // exports.sendEmail = function (emailType, emailVariables, emailSubject) {
// //     return new Promise((resolve, reject) => {
// //         Promise.coroutine(function*() {
// //             emailVariables.email_id = removeInvalidIds(emailVariables.email_id);

// //             let mailOptions = {
// //                 from    : "abc.com",
// //                 to      : emailVariables.email_id,
// //                 subject : emailSubject,
// //                 html    : null
// //             };

// //             switch(emailType) {
// //                 case constant.emailType.EMAIL_VERIFICATION_OTP:
// //                     mailOptions.html = renderMessageFromTemplateAndVariable(emailTemplates.verificationToken, emailVariables);
// //                     break;
// //                 default:
// //                     logging.consolelog("No case matched while sending mail with : " + emailType);
// //                     return;
// //             }
// //             sendHtmlContent(mailOptions);
// //             return true;
// //         })().then((data) => {
// //             resolve(data);
// //         }, (error) => {
// //             reject(error);
// //         });
// //     });
// // };


// // function renderMessageFromTemplateAndVariable(templateData, variablesData, emailTemplate) {
// //     return Handlebars.compile(templateData)(variablesData, emailTemplate);
// // }

// // function sendHtmlContent(mailOptions) {
// //    const SES_CONFIG = {
// //        accessKeyId: config.aws_ses_access_key_id,
// //        secretAccessKey: config.aws_ses_secret_key,
// //        region: 'us-east-1',
// //    };

// //    const AWS_SES = new AWS.SES(SES_CONFIG);
   
// //    let params = {
// //     Source: mailOptions.from,
// //     Destination: {
// //       ToAddresses: [
// //         mailOptions.to.toString()
// //       ],
// //     },
// //     ReplyToAddresses: [],
// //     Message: {
// //       Body: {
// //         Html: {
// //           Charset: 'UTF-8',
// //           Data: mailOptions.html,
// //         }
// //       },
// //       Subject: {
// //         Charset: 'UTF-8',
// //         Data: mailOptions.subject,
// //       }
// //     },
// //   };
// //   return AWS_SES.sendEmail(params).promise();

// // };

// // function removeInvalidIds(allIds) {
// //     //done job to handle the case where array is passed after stringyfying//
// //     allIds = allIds.toString();
// //     allIds = allIds.split(',');

// //     var i = 0;
// //     var isInavlid = false;
// //     var regularExp = /@facebook.com/i;
// //     var index = allIds.length;
// //     while (index--) {
// //         allIds[index] = allIds[index].trim();
// //         isInavlid = regularExp.test(allIds[index]);
// //         if(isInavlid === true) {
// //             allIds.splice(index, 1);
// //         }
// //     }
// //     return allIds;
// // };