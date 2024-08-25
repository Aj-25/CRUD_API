exports.otpCreated = (sendOtp) => {
    var email_template = '<head>' +
        '<title>OTP FOR RESET PASSWORD</title>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
        '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0 " />' +
        '<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">' +
        '<style>' +
        'html, body {margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important;}' +
        '* {  -ms-text-size-adjust: 100%;  }' +
        'table, tr, td {mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;}' +
        'img{-ms-interpolation-mode:bicubic;}' +
        'a {text-decoration: none;}' +
        '</style>' +
        '</head>' +
        '<body class="cc_body" style="margin:0px; padding:15px; mso-line-height-rule: exactly; font-family: \'Roboto\', sans-serif; font-size: 16px; background-color:#fcfcfc;" bgcolor="#fcfcfc">' +
        '<table style="width: 100%; max-width: 700px; margin:auto; background-color: #ffffff;" role="presentation" cellspacing="0"  border="0" cellpadding="15" >' +
        '<thead>' +
        '<tr>' +
        '</tr>' +
        '</thead>' +
        '</table>' +
        '<table style="width: 100%; max-width: 700px; margin:auto; background-color:#ffffff; padding: 20px 15px 40px 15px;" role="presentation" cellspacing="0" cellpadding="0" border="0">' +
        '<tr style= "margin:0; padding-top:0; padding-bottom:0;"><td> <p style="margin: 10px 0; color: #555555;">OTP for Update password. <br> otp - <b>' + sendOtp + '</b><br> <b>'  + '</b><br><br> Here is your OTP to Reset Password.</p></td></tr>' +
        '<tr style= "margin:0; padding-top:0; padding-bottom:0;"><td> <p style="margin: 20px 0 0px 0; font-size:16px; color: #555555;">Regards,</p></td></tr>' +
        '<tr style= "margin:0; padding-top:0;"><td> <p style="margin: 0; font-size:16px; color: #555555;">CODER_BOTIQUE</p></td></tr>' +
        '</table>' +
        '<table style="max-width: 700px; margin:auto; width: 100%; font-size: 12px;  text-align:center; background-color: #C60707;" role="presentation" cellspacing="0"  border="0" cellpadding="15">' +
        '<tr>' +
        
        '</tr>' +
        '</table>' +
        '</body>'

    return email_template;
};