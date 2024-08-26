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





const companyDetails = {
  addcompanyDetail: async data => {
    console.log("Come in dao")
    return sql_conn.companyDetails.create(data).catch(console.error);

  },

  checkcompanyExist: async data => {
    console.log("Come in checkUser ")
            
    return sql_conn.companyDetails.findOne({ where: { company_name: data.company_name,exam_details:data.exam_details,designation:data.designation } }).catch(console.error);
  },

  checkidExist: async data => {
    console.log("Come in check ID ")
    console.log(data)

    return sql_conn.companyDetails.findOne({ where: { id: data, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE } }).catch(console.error);
  },


  getCompanyList: async data => {
    console.log("Come in Dao")
    return sql_conn.companyDetails.findAll({
      where: { is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
      attributes: ['id', 'company_name', 'company_details', 'exam_name', 'exam_details', 'designation']
    }).catch(console.error)
  },

  getCompanyDetailsbyId: async data => {
    console.log("Come in Dao")
    return sql_conn.companyDetails.findAll({
      where: { id: data.company_id, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
      attributes: ['id', 'company_name', 'company_details', 'exam_name', 'exam_details', 'designation']
    }).catch(console.error)
  },


  editCompanyDetail: async data => {
    console.log("In dao edit company details")
    return sql_conn.companyDetails.update({ company_name: data.company_name, company_details: data.company_details, exam_name: data.exam_name, exam_details: data.exam_details, designation: data.designation }, { where: { id: data.company_id } }).catch(console.error);
  },

  deleteCompanyDetailsById: async data => {
    console.log("In dao delete company details")
    return sql_conn.companyDetails.update({ is_delete: 1 }, { where: { id: data } }).catch(console.error);
  },

}
module.exports = { companyDetails }