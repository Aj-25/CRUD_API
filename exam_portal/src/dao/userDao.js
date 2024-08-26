'use strict'

var sql_conn = require("../../src/db/sequelize_models");
const { Sequelize, Op, QueryTypes } = require("sequelize");
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
    console.log("Come in dao create user")
    return sql_conn.userModel.create(data).catch(console.error);

  },
  checkidExist: async data => {
    console.log("Come in Dao check ID ")
    return sql_conn.userModel.findOne({ where: { id: data,is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE } }).catch(console.error);
  },
  updateUserProfile: async data => {
    console.log("Come in Dao update user ")
    return sql_conn.userModel.update({ user_name: data.user_name, phone_number: data.phone_number, profile_pic: data.profile_pic, password: data.password }, { where: { id: data.user_id } }).catch(console.error);
  },




  checkUserExist: async data => {
    console.log("Come in checkUser ")
    console.log('given email Id : ', data)
    return sql_conn.userModel.findOne({ where: { email_id: data } }).catch(console.error);
  },



  // getUserDetailById: async data => {
  //   return sql_conn.userModel.findOne({ where: { id: data } }).catch(console.error);
  // },


  getUserDetailByUserId: async data => {
    return sql_conn.userModel.findAll({
      where: { id: data, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
      attributes: ['id', 'user_name', 'email_id', 'phone_number', 'profile_pic', 'user_role']
    }).catch(console.error)
  },


  insertUserAccessToken: async data => {
    
    return sql_conn.accessTokenModel.create(data).catch(console.error)
  },

  // updateOtp: async data => {
  //   return sql_conn.userModel.update({ verification_otp: data.otp }, { where: { email_id: data.email_id } }).catch(console.error)
  // },

  // updatePassword: async data => {
  //   return sql_conn.userModel.update({ password: data.new_password, is_email_verified: constant.isActive.TRUE },
  //     { where: { email_id: data.email_id } }).catch(console.error)
  // },
}

module.exports = { userDetails }