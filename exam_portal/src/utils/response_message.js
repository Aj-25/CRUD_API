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
    COMPANY_EXIST:{
        statusCode:401,
        customMessage:'Company Name Already exist',
        type:'COMPANY_NAME_ALREADY_EXIST'
    },
    COMPANY_ID_NOT_EXIST:{
        statusCode:401,
        customMessage:'Company Id not Exist',
        type:'COMPANY_ID_NOT_EXIST'
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
    UPDATE_PROFILE_ERROR:{
        statusCode: 401,
        customMessage:'Fail to update profile',
        type:'UPDATE_PROFILE_ERROR'
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
    QUESTION_EXIST:{
        statusCode:401,
        customMessage:'Questions Already exist',
        type:'QUESTION_EXIST'
    },
    QUESTION_ID_EXIST:{
        statusCode:401,
        customMessage:'Questions Already exist',
        type:'QUESTION_ALready__EXIST'
    },
    USER_AND_EXAM_EXIST:{
        statusCode:401,
        customMessage:'User and Exam Already Exist',
        type:'USER_AND_EXAM_EXIST'
    },
    ID_NOT_EXIST:{
        statusCode:401,
        customMessage:'ID not Exist',
        type:'ID_NOT_EXIST'
    },
    OPTION_ALREADY_EXIST:{
        statusCode:401,
        customMessage:'Options Already exist',
        type:'OPTION_ALready__EXIST'
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
    UPDATE_PASSWORD_SUCCESS:{
        statusCode: 200,
        customMessage: 'password update successfully',
        type: 'UPDATE_PASSWORD_SUCCESS'
    },
    UPDATE_PROFILE_SUCCESS:{
        statusCode: 200,
        customMessage:'Profile update successfully',
        type:'UPDATE_PROFILE_SUCCESS'
    },
    VIEW_USER_PROFILE: {
        statusCode: 200,
        customMessage: 'GET INTO PROFILE',
        type: 'GET_INTO_PROFILE_OF_USER'
    },
    ADD_ANSWER: {
        statusCode: 200,
        customMessage: 'Answer added successfully.',
        type: 'ANSWER_ADDED_SUCCESS'
    },
    GET_ANSWER_LIST: {
        statusCode: 200,
        customMessage: 'Answer list Fetch successfully.',
        type: 'ANSWER_LIST_FETCHED_SUCCESS'
    },
    GET_ANSWER_DETAILS_BY_ID: {
        statusCode: 200,
        customMessage: 'Answer Details Fetch successfully by ID.',
        type: 'ANSWER_DETAILS_FETCH_BY_ID_SUCCESS'
    },
    EDITED_ANSWER_DETAILS: {
        statusCode: 200,
        customMessage: 'Answer Details Edited successfully.',
        type: 'ANSWER_DETAILS_EDITED_SUCCESS'
    },
    ANSWER_DETAILS_DELETED: {
        statusCode: 200,
        customMessage: 'Answer details deleted successfully.',
        type: 'ANSWER_DETAILS_DELETED_SUCCESS'
    },
    ADD_COMPANY: {
        statusCode: 200,
        customMessage: 'Company added successfully.',
        type: 'COMPANY_ADDED_SUCCESS'
    },
    VIEW_COMPANY_LIST: {
        statusCode: 200,
        customMessage: 'Get Company List',
        type: 'FETCHED_COMPANY_LIST'
    },
    VIEW_COMPANY_DETAILS_BY_ID: {
        statusCode: 200,
        customMessage: 'Fetched company details by ID',
        type: 'FETCHED_COMPANY_DETAILS_BY_ID'
    },
    EDITED_COMPANY: {
        statusCode: 200,
        customMessage: 'Company Details Update successfully.',
        type: 'COMPANY_DETAILS_EDITED_SUCCESS'
    },
    DELETE_COMPANY_DETAILS: {
        statusCode: 200,
        customMessage: 'Company Details deleted successfully.',
        type: 'COMPANY_DETAILS_DELETED_SUCCESS'
    },
    ADD_OPTIONS: {
        statusCode: 200,
        customMessage: 'Option added successfully.',
        type: 'OPTION_ADDED_SUCCESS'
    },
    GET_OPTIONS_LIST: {
        statusCode: 200,
        customMessage: 'Options list Fetch successfully.',
        type: 'OPTIONS_LIST_FETCHED_SUCCESS'
    },
    GET_OPTIONS_DETAILS_BY_ID: {
        statusCode: 200,
        customMessage: 'Options Details Fetch successfully.',
        type: 'OPTIONS_DETAILS_FETCHED_BY_ID_SUCCESS'
    },
    EDITED_OPTION_DETAILS: {
        statusCode: 200,
        customMessage: 'OPTION Details Update successfully.',
        type: 'OPTION_DETAILS_EDITED_SUCCESS'
    },
    OPTION_DELETED: {
        statusCode: 200,
        customMessage: 'Option is deleted by ID successfully.',
        type: 'OPTION_DELETED_SUCCESS'
    },
    ADD_QUESTIONS: {
        statusCode: 200,
        customMessage: 'Questions added successfully.',
        type: 'QUESTION_ADDED_SUCCESS'
    },
    GET_QUESTIONS_LIST: {
        statusCode: 200,
        customMessage: 'Questions list Fetch successfully.',
        type: 'QUESTIONS_LIST_FETCHED_SUCCESS'
    },
    GET_QUESTIONS_DETAILS_LIST_BY_ID: {
        statusCode: 200,
        customMessage: 'Questions Details by ID Fetch successfully.',
        type: 'QUESTIONS_DETAILS_FETCHED_SUCCESS'
    },
    EDITED_QUESTIONS_DETAILS: {
        statusCode: 200,
        customMessage: 'Question Edited successfully.',
        type: 'QUESTION_EDITED_SUCCESS'
    },
    DELETED_QUESTION: {
        statusCode: 200,
        customMessage: 'Question is deleted by ID successfully.',
        type: 'QUESTION_DELETED_SUCCESS'
    },
    ADD_RESULT_DETAILS: {
        statusCode: 200,
        customMessage: 'Result Details added successfully.',
        type: 'RESULT_DETAILS_ADDED_SUCCESS'
    },
    GET_RESULT_LIST: {
        statusCode: 200,
        customMessage: 'Result list Fetch successfully.',
        type: 'RESULT_FETCH_SUCCESS'
    },
    GET_RESULT_DETAILS_BY_ID: {
        statusCode: 200,
        customMessage: 'Result Details Fetch by ID successfully.',
        type: 'RESULT_DETAILS_FETCH_BY_ID_SUCCESS'
    },
    EDITED_RESULT_DETAILS: {
        statusCode: 200,
        customMessage: 'Result Edited successfully.',
        type: 'RESULT_EDITED_SUCCESSFULLY'
    },
    RESULT_DETAILS_DELETED: {
        statusCode: 200,
        customMessage: 'Result details deleted successfully.',
        type: 'RESULT_DETAILS_DELETED_SUCCESS'
    },
    ADD_TIME_SLOT: {
        statusCode: 200,
        customMessage: 'Time Slot added successfully.',
        type: 'TIME_SLOT_ADDED_SUCCESS'
    },
    GET_TIME_SLOT_LIST: {
        statusCode: 200,
        customMessage: 'Time Slot list Fetch successfully.',
        type: 'TIME_SLOT_ADDED_SUCCESS'
    },
    GET_TIME_SLOT_LIST_BY_ID: {
        statusCode: 200,
        customMessage: 'Time Slot Details by ID Fetch successfully.',
        type: 'TIME_SLOT_ADDED_SUCCESS'
    },
    EDITED_TIME_SLOT_Details: {
        statusCode: 200,
        customMessage: 'Time Slot Edited successfully.',
        type: 'TIME_SLOT_ADDED_SUCCESS'
    },
    TIME_SLOT_DELETED: {
        statusCode: 200,
        customMessage: 'Time Slot details deleted successfully.',
        type: 'TIME_SLOT_DELETED_SUCCESS'
    },
}