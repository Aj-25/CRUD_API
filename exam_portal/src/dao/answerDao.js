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






const AnswerDao = {

    checkquestionId: async data => {
        console.log("Come in checkUser ")
        console.log(data.question_id)
        console.log(data.answer)
        return sql_conn.answerdetails.findAll({ where: { question_id: data.question_id, answer: data.answer } }).catch(console.error);
    },

    checkAnswerIdExist: async data => {
        console.log("Come in check Id Exist ")
        return sql_conn.answerdetails.findAll({ where: { id: data,is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE }, attributes: ['id', 'question_id', 'answer'] }).catch(console.error);
    },

    addAnswer: async data => {
        console.log("Come in dao to create")
        return sql_conn.answerdetails.create(data).catch(console.error);
    },

    getanswerList: async data => {
        console.log("Come in Dao")
        return sql_conn.answerdetails.findAll({
            where: { is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['id', 'question_id', 'answer']
        }).catch(console.error)
    },

    getanswerdetailsbyID: async data => {
        console.log("Come in Dao")
        return sql_conn.answerdetails.findAll({
            where: { id: data, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['id', 'question_id', 'answer']
        }).catch(console.error)
    },

    editAnswerDetailsbyID: async data => {
        console.log("In dao edit answer details")
        return sql_conn.answerdetails.update({ question_id: data.question_id, answer: data.answer }, { where: { id: data.answer_id } }).catch(console.error);
    },

    deleteanswerdetailsById: async data => {
        console.log("In dao delete answer details")
        return sql_conn.answerdetails.update({ is_delete: 1 }, { where: { id: data } }).catch(console.error)
    },
}

module.exports = { AnswerDao }