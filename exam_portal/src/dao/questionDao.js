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

const questionsDao = {

    checkquestionsExist: async data => {
        console.log("Come in checkUser ")
        console.log(data)

        return sql_conn.questionsdetails.findAll({ where: { question: data.question } }).catch(console.error);
    },

    checkIdExist: async data => {
        console.log("Come in ID checkUser ")
        return sql_conn.questionsdetails.findAll({ where: { id: data } }).catch(console.error);
    },

    addquestions: async data => {
        console.log("Come in dao")
        return sql_conn.questionsdetails.create(data).catch(console.error);
    },


    getquestionsList: async data => {
        console.log("Come in Dao")
        return sql_conn.questionsdetails.findAll({
            where: { is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['id', 'question']
        }).catch(console.error)
    },

    getquestiontDetailsbyId: async data => {
        console.log("Come in Dao")
        return sql_conn.questionsdetails.findAll({
            where: { id: data.question_id, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['id', 'question']
        }).catch(console.error)
    },

    editquestionsbyID: async data => {
        console.log("In dao edit questions details")
        return sql_conn.questionsdetails.update({ question: data.question }, { where: { id: data.id } }).catch(console.error);
    },

    deletequestionsdetailsById: async data => {
        console.log("In dao delete company details")
        return sql_conn.questionsdetails.update({ is_delete: 1 }, { where: { id: data } }).catch(console.error)
    },


}

module.exports = { questionsDao }