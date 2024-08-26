var verificationToken = `<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700,800,900" rel="stylesheet"
        type="text/css">
    <title>Dragon Liga</title>
    <style type="text/css">
        body {
            width: 100%;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            font-family: "Open Sans", sans-serif;
        }

        html {
            width: 100%;
        }

        table {
            font-size: 14px;
            border: 0;
        }

        .container-box {
            margin-top: 75px;
        }

        .modal {
            box-shadow: 0px 2px 4px #0000001a;
            padding: 35px;
            background-color: #ffffff;
            border-radius: 5px;
        }

        .content-modal {
            margin: 40px 50px 25px;
        }

        .footer-modal {
            margin: 0px 50px 25px;
            text-align: center;
        }

        .section-img {
            background-color: #292828;
            height: 150px;
        }

        .bg-gray {
            background-color: #EEEEEE;
        }

        #main-logo {
            /* width: 500px; */
            margin-bottom: 0px;
        }
        .page-heading {
            line-height: 22px;
            font-weight: 700;
            color: #121212;
            font-size: 22px;
            letter-spacing: 0px;
            text-transform: uppercase;
            margin-bottom: 25px;
        }

        .semiBold-text {
            letter-spacing: 0px;
            color: #121212;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 25px;
        }

        .otp-digit {
            color: #FF9238;
            font-size: 32px;
            font-weight: 600;
            letter-spacing: 9px;
            text-align: left;
            margin-bottom: 10px;
        }

        .expire-time {
            color: #121212;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 25px;
        }

        .content {
            color: #121212;
            margin-bottom: 25px;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0px;
        }

        .content a,
        .theme-color {
            color: #FF9238;
        }
        #bottom-png{
            position: relative;
            top: 9px;
        }

        .copy-rights {
            text-align: center;
            letter-spacing: 0px;
            color: #121212;
            font-size: 13px;
            opacity: 0.45;
            font-weight: 500;
            margin: 0 50px 25px;
            
        }

        /* ----------- responsivity ----------- */
        @media only screen and (max-width: 768px) {
            .container-box {
                width: 80%;varifyAndSendOtpToEmail
        @media only screen and (max-width: 576px) {
            .container-box {
                width: 90%;
            }

            .content-modal,
            .footer-modal {
                margin-left: 20px;
                margin-right: 20px;
            }

            .modal {
                padding: 25px;
            }
        }
    </style>
</head>

<body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
        <tr>
            <td align="center">
                <table border="0" align="center" width="660px" cellpadding="0" cellspacing="0" class="container-box">
                    <tr>
                        <td align="center" class="section-img">
                            <span style="margin-top: -40px;"><img id="main-logo"
                                    src="https://storage.googleapis.com/syn-dragon-liga-239-bucket-dev/dragonLogoPng.png" width="250" border="0" alt="" /></span>
                        </td>
                    </tr>
                    <tr class="bg-gray">
                        <td>
                            <div class="content-modal modal" style="margin: -35px 50px 20px;">
                                <div class="page-heading">
                                    Forgot your password?

                                </div>

                                <div class="semiBold-text">

                                    Hi, {{{user_name}}} <br>
                                    We have received a varifyAndSendOtpToEmailequest to reset your account password, kindly use this OTP
                                </div>
                                <div class="otp-digit">
                                    <span>{{{otp}}}</span>
                                </div>
                                <div class="content">

                                </div>
                                <div class="content" style="margin-bottom: 0;">
                                    Dragon LIGA Team
                                </div>
                            </div>
                        </td>
                    </tr>
                 
                    <td style = "display: flex;" class="bg-gray">
                         
                            <img style = "
                            margin-left: 41%;
                            margin-right: 0px;
                           position: absolute;
                            left: 180px;"
                         class="copy-rights" src="https://storage.googleapis.com/syn-dragon-liga-239-bucket-dev/onlydragon.png" width="18" border="0" alt="" />

                            <span style = "opacity : 0.45;">ragon Liga</span>
                    </td>
                </table>
            </td>
        </tr>
        <tr>
            <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
        </tr>
    </table>
</body>

</html>`

var emailAuthentication = `<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700,800,900" rel="stylesheet"
        type="text/css">
    <title>Dragon Liga</title>
    <style type="text/css">
        body {
            width: 100%;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            font-family: "Open Sans", sans-serif;
        }

        html {
            width: 100%;
        }

        table {
            font-size: 14px;
            border: 0;
        }

        .container-box {
            margin-top: 75px;
        }

        .modal {
            box-shadow: 0px 2px 4px #0000001a;
            padding: 35px;
            background-color: #ffffff;
            border-radius: 5px;
        }

        .content-modal {
            margin: 40px 50px 25px;
        }

        .footer-modal {
            margin: 0px 50px 25px;
            text-align: center;
        }

        .section-img {
            background-color: #292828;
            height: 150px;
        }

        .bg-gray {
            background-color: #EEEEEE;
        }

        #main-logo {
            /* width: 500px; */
            margin-bottom: 0px;
        }
        .page-heading {
            line-height: 22px;
            font-weight: 700;
            color: #121212;
            font-size: 22px;
            letter-spacing: 0px;
            text-transform: uppercase;
            margin-bottom: 25px;
        }

        .semiBold-text {
            letter-spacing: 0px;
            color: #121212;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 25px;
        }

        .otp-digit {
            color: #FF9238;
            font-size: 32px;
            font-weight: 600;
            letter-spacing: 9px;
            text-align: left;
            margin-bottom: 10px;
        }

        .expire-time {
            color: #121212;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 25px;
        }

        .content {
            color: #121212;
            margin-bottom: 25px;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0px;
        }

        .content a,
        .theme-color {
            color: #FF9238;
        }
        #bottom-png{
            position: relative;
            top: 9px;
        }

        .copy-rights {
            text-align: center;
            letter-spacing: 0px;
            color: #121212;
            font-size: 13px;
            opacity: 0.45;
            font-weight: 500;
            margin: 0 50px 25px;
            
        }

        /* ----------- responsivity ----------- */
        @media only screen and (max-width: 768px) {
            .container-box {
                width: 80%;
            }
        }

        @media only screen and (max-width: 576px) {
            .container-box {
                width: 90%;
            }

            .content-modal,
            .footer-modal {
                margin-left: 20px;
                margin-right: 20px;
            }

            .modal {
                padding: 25px;
            }
        }
    </style>
</head>

<body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
        <tr>
            <td align="center">
                <table border="0" align="center" width="660px" cellpadding="0" cellspacing="0" class="container-box">
                    <tr>
                        <td align="center" class="section-img">
                            <span style="margin-top: -40px;"><img id="main-logo"
                                    src="https://storage.googleapis.com/syn-dragon-liga-239-bucket-dev/dragonLogoPng.png" width="250" border="0" alt="" /></span>
                        </td>
                    </tr>
                    <tr class="bg-gray">
                        <td>
                            <div class="content-modal modal" style="margin: -35px 50px 20px;">
                                <div class="page-heading">
                                    Email Authentication

                                </div>

                                <div class="semiBold-text">

                                    Hi, <br>
                                    We have received a request to varify your Email, kindly use this OTP
                                </div>
                                <div class="otp-digit">
                                    <span>{{{otp}}}</span>
                                </div>
                                <div class="content">

                                </div>
                                <div class="content" style="margin-bottom: 0;">
                                    Dragon LIGA Team
                                </div>
                            </div>
                        </td>
                    </tr>
                 
                    <td style = "display: flex;" class="bg-gray">
                         
                            <img style = "
                            margin-left: 42%;
                            margin-right: 0px;
                           position: absolute;
                            left: 180px;"
                         class="copy-rights" src="https://storage.googleapis.com/syn-dragon-liga-239-bucket-dev/onlydragon.png" width="18" border="0" alt="" />

                            <span style = "opacity : 0.45;">ragon Liga</span>
                    </td>
                </table>
            </td>
        </tr>
        <tr>
            <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
        </tr>
    </table>
</body>

</html>`

var loginCredential = `<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700,800,900" rel="stylesheet"
        type="text/css">
    <title>Dragon Liga</title>
    <style type="text/css">
        body {
            width: 100%;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            font-family: "Open Sans", sans-serif;
        }

        html {
            width: 100%;
        }

        table {
            font-size: 14px;
            border: 0;
        }

        .container-box {
            margin-top: 75px;
        }

        .modal {
            box-shadow: 0px 2px 4px #0000001a;
            padding: 35px;
            background-color: #ffffff;
            border-radius: 5px;
        }

        .content-modal {
            margin: 40px 50px 25px;
        }

        .footer-modal {
            margin: 0px 50px 25px;
            text-align: center;
        }

        .section-img {
            background-color: #292828;
            height: 150px;
        }

        .bg-gray {
            background-color: #EEEEEE;
        }

        #main-logo {
            /* width: 500px; */
            margin-bottom: 0px;
        }
        .page-heading {
            line-height: 22px;
            font-weight: 700;
            color: #121212;
            font-size: 22px;
            letter-spacing: 0px;
            text-transform: uppercase;
            margin-bottom: 25px;
        }

        .semiBold-text {
            letter-spacing: 0px;
            color: #121212;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 25px;
        }

        .otp-digit {
            color: #FF9238;
            font-size: 32px;
            font-weight: 600;
            letter-spacing: 9px;
            text-align: left;
            margin-bottom: 10px;
        }

        .expire-time {
            color: #121212;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 25px;
        }

        .content {
            color: #121212;
            margin-bottom: 25px;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0px;
        }

        .content a,
        .theme-color {
            color: #FF9238;
        }
        #bottom-png{
            position: relative;
            top: 9px;
        }

        .copy-rights {
            text-align: center;
            letter-spacing: 0px;
            color: #121212;
            font-size: 13px;
            opacity: 0.45;

            font-weight: 500;
            margin: 0 50px 25px;
        }

        /* ----------- responsivity ----------- */
        @media only screen and (max-width: 768px) {
            .container-box {
                width: 80%;
            }
        }

        @media only screen and (max-width: 576px) {
            .container-box {
                width: 90%;
            }

            .content-modal,
            .footer-modal {
                margin-left: 20px;
                margin-right: 20px;
            }

            .modal {
                padding: 25px;
            }
        }
    </style>
</head>

<body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
        <tr>
            <td align="center">
                <table border="0" align="center" width="660px" cellpadding="0" cellspacing="0" class="container-box">
                    <tr>
                        <td align="center" class="section-img">
                            <span style="margin-top: -40px;"><img id="main-logo"
                                    src="https://storage.googleapis.com/syn-dragon-liga-239-bucket-dev/dragonLogoPng.png" width="250" border="0" alt="" /></span>
                        </td>
                    </tr>
                    <tr class="bg-gray">
                        <td>
                          <div class="content-modal modal" style="margin: -35px 50px 20px;"> 
                           <div class="page-heading">
                              LOGIN CREDENTIAL
                          </div>
                          <div class="semiBold-text">
                            Below is your login credential:
                          </div>
                          <div class="credentials-data">
                            <span class = "semiBold-text">Email: </span>{{{email_id}}}<span></span> <br>
                            <span class = "semiBold-text">Password: </span>{{{password}}}<span></span>
                          </div>
                          <div class="content">
                            Please change your password once you login
                          </div>
                          <div class="content" style="margin-bottom: 0;">
                            Cheers,<br />Dragon LIGA Team
                          </div>
                    </div>

                        </td>
                    </tr>               
                    <td style = "display: flex;" class="bg-gray">
                         
                            <img style = "
                            margin-left: 42%;
                            margin-right: 0px;
                           position: absolute;
                            left: 180px;"
                         class="copy-rights" src="https://storage.googleapis.com/syn-dragon-liga-239-bucket-dev/onlydragon.png" width="18" border="0" alt="" />

                            <span style = "opacity : 0.45;">ragon Liga</span>
                    </td>
                </table>
            </td>
        </tr>
        <tr>
            <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
        </tr>
    </table>
</body>

</html>`

module.exports={verificationToken,loginCredential, emailAuthentication}