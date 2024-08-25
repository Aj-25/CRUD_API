'use strict'

var sql_conn = require("../../db_model/index");
const constant = require('../utils/constant')


var date = new Date();

// Get year, month, and day part from the date
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
const formattedDate = year + "-" + month + "-" + day;


const userDetails = {

  
  addUser: async data => {
    return sql_conn.userModel.create(data).catch(console.error);

  },
  
  checkUserExist: async data => {
    return sql_conn.userModel.findOne({ where: { email_id: data,is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE } }).catch(console.error);
},

  insertUserAccessToken: async data => {
    return sql_conn.accessTokenModel.create(data).catch(console.error)
  },

  otpStored: async data => {
    return sql_conn.otpDetails.create(data).catch(console.error);

  },

  updateOtp: async data => {
    return sql_conn.otpDetails.update({ is_expired: constant.otpExpired.TRUE }, { where: { user_id: data } }).catch(console.error)
  },

  checkOtp: async data => {
    return sql_conn.otpDetails.findOne({ where: { user_id: data,is_expired:constant.otpExpired.FALSE},attributes: ['otp'], }).catch(console.error);
  },

  updatePassword: async data => {
    return sql_conn.userModel.update({ password: data.new_password},{ where: { email_id: data.email_id } }).catch(console.error)
  },
}

module.exports = { userDetails }