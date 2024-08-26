'use strict'

var sql_conn = require("../../src/db/sequelize_models");
const constant = require('../utils/constant')


var date = new Date();

// Get year, month, and day part from the date
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
const formattedDate = year + "-" + month + "-" + day;

const optionDetails = {
  addOptionDetail: async data => {
    console.log("Come in dao")
    return sql_conn.optiondetails.create(data).catch(console.error);
  },
  checkidExist: async data => {
    console.log("Come in Dao check ID ")
    return sql_conn.optiondetails.findOne({ where: { id: data,is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE } }).catch(console.error);
  },

  checkOtpionAlreadyExist: async data => {
    console.log("Come in Dao checkUser ")
    return sql_conn.optiondetails.findOne({ where: { question_id: data } }).catch(console.error);
  },

  getOptionList: async data => {
    console.log("Come in Dao")
    return sql_conn.optiondetails.findAll({
      where: { is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
      attributes: ['id', 'question_id', 'option_1', 'option_2', 'option_3', 'option_4']
    }).catch(console.error)
  },
  getoptionDetailsbyId: async data => {
    console.log("Come in Dao")
    return sql_conn.optiondetails.findAll({
      where: { id: data.option_id, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
      attributes: ['id', 'question_id', 'option_1', 'option_2', 'option_3', 'option_4']
    }).catch(console.error)
  },

  editOptionDetail: async data => {
    console.log("Come in Dao")
    return sql_conn.optiondetails.update({ question_id: data.question_id, option_1: data.option_1, option_2: data.option_2, option_3: data.option_3, option_4: data.option_4 }, { where: { id: data.option_id } }).catch(console.error);
  },

  deleteoptionDetailsById: async data => {
    console.log("Come in Dao")
    return sql_conn.optiondetails.update({ is_delete: 1 }, { where: { id: data } }).catch(console.error)
  },

}
module.exports = { optionDetails }