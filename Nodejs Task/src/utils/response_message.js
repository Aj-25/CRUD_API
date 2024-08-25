exports.Error = {
    DEFAULT: {
        statusCode: 501,
        customMessage: 'Something went wrong.',
        type: 'DEFAULT'
    },
    INVALID_ACCESS_TOKEN: {
        statusCode: 400,
        customMessage: 'Invalid access token.',
        type: 'INVALID_ACCESS_TOKEN'
    },
    UNATHORIZE_ACCESS: {
        statusCode: 400,
        customMessage: 'You dont have access to perform this action.',
        type: 'UNATHORIZE_ACCESS'
    },

    USER_REGISTRATION_FAIL:{
        statusCode:401,
        customMessage:'User registration fail',
        type:'USER_REGISTRATION_FAIL'
    },
    USER_LOGIN_FAIL:{
        statusCode:401,
        customMessage:'Authetication fail',
        type:'USER_LOGIN_FAIL'
    },
    USER_EXIST:{
        statusCode:401,
        customMessage:'User exist',
        type:'USER_EXIST'
    },
    USER_NOT_EXIST:{
        statusCode:401,
        customMessage:'Not A Valid User',
        type:'USER_IS_NOT_VALID'
    },
    
    OTP_LENGTH_ERROR:{
        statusCode:401,
        customMessage:'Otp Must have 4 charecter',
        type:'OTP_LENGTH_ERROR'
    },
    NEW_PASSWORD_AND_CONFIRM_PASSWORD_EQUAL:{
        statusCode:401,
        customMessage:'New Password and Confirm Password Must Be Equal',
        type:'NEW_PASSWORD_AND_CONFIRM_PASSWORD_EQUAL_ERROR'
    },
    WRONG_OTP:{
        statusCode:401,
        customMessage:'Otp is wrong',
        type:'WRONG_OTP'
    },
    INVALID_EMAIL_ID: {
        statusCode: 400,
        customMessage: 'The email you entered is invalid.',
        type: 'INAVLID_EMAIL_ID'
    },
    INVALID_PASSWORD: {
        statusCode: 400,
        customMessage: 'The password you entered is invalid.',
        type: 'INAVLID_Password'
    },
       
};

exports.SUCCESS = {
    DEFAULT: {
        statusCode: 200,
        customMessage: 'Success',
        type: 'DEFAULT'
    },
    REGISTER: {
        statusCode: 200,
        customMessage: 'Registered successfully.',
        type: 'REGISTER SUCCESS'
    },
    LOGIN_SUCCESS: {
        statusCode: 200,
        customMessage: 'Login success.',
        type: 'LOGIN_SUCCESS'
    },
    OTP_SEND_SUCCESSFULLY: {
        statusCode: 200,
        customMessage: 'Otp send successfully',
        type: 'OTP_CREATED_SUCCESSFULLY'
    },
    OTP_SEND_TO_EMAIL: {
        statusCode: 200,
        customMessage: 'Otp send to EmailID',
        type: 'OTP_SENT_TO_EMAIL_SUCCESSFULLY'
    },
    UPDATE_PROFILE_SUCCESS: {
        statusCode: 200,
        customMessage: 'USER PROFILE UPDATED',
        type: 'USER_PROFILE_UPDATED_SUCCESSFULLY'
    },
    UPDATE_PASSWORD_SUCCESS: {
        statusCode: 200,
        customMessage: 'PASSWORD UPDATED',
        type: 'PASSWORD_UPDATED_SUCCESSFULLY'
    },
    RETRIEVE_USER_DATA: {
        statusCode: 200,
        customMessage: 'User data retreive successfully',
        type: 'RETRIEVE_USER_DATA_SUCCESSFULY'
    },
    USER_DELETED: {
        statusCode: 200,
        customMessage: 'USER PROFILE DELETED',
        type: 'USER_PROFILE_DELETED_SUCCESSFULLY'
    },
}