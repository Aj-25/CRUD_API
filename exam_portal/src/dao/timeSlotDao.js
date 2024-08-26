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


const timeSlotdao = {

    addTimeSlot: async data => {
        console.log("Come in dao")
        return sql_conn.timeSlot.create(data).catch(console.error);
    },

    checkcompanyid: async data => {
        console.log("Come in checkUser ")
        return sql_conn.timeSlot.findAll({ where: { company_id: data.company_id, date: data.date, time: data.time } }).catch(console.error);
    },

    checkidExist: async data => {
        console.log("Come in check ID ")
        return sql_conn.timeSlot.findOne({ where: { id: data,is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE } }).catch(console.error);
    },

    getTimeslotList: async data => {
        console.log("Come in Dao")
        return sql_conn.timeSlot.findAll({
            where: { is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['id', 'company_id', 'date', 'time']
        }).catch(console.error)
    },

    getTimeSlotDetailsbyId: async data => {
        console.log("Come in Dao")
        return sql_conn.timeSlot.findAll({
            where: { id: data, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['id', 'company_id', 'date', 'time']
        }).catch(console.error)
    },

    editTimeSlotbyID: async data => {
        console.log("In dao edit company details")
        return sql_conn.timeSlot.update({ company_id: data.company_id, date: data.date, time: data.time }, { where: { id: data.id } }).catch(console.error);
    },
    
    deletetimeslotdetailsById: async data => {
        console.log("In dao delete company details")
        return sql_conn.timeSlot.update({is_delete:1},{where: { id: data}}).catch(console.error)
      },
}

module.exports = { timeSlotdao }