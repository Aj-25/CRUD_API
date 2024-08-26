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






const resultdao = {
    checkUserAndExamName: async data => {
        console.log("Come in check User and Exam ")
        return sql_conn.resultdetails.findAll({ where: { user_name: data.user_name, exam_name: data.exam_name } }).catch(console.error);
    },
    checkresultid: async data => {
        console.log("Come in check ID ")
        return sql_conn.resultdetails.findOne({ where: { id: data.result_id,is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE } }).catch(console.error);
    },
    addresultdetail: async data => {
        console.log("Come in dao")
        return sql_conn.resultdetails.create(data).catch(console.error);
    },
    getresultList: async data => {
        console.log("Come in Dao")
        return sql_conn.resultdetails.findAll({
            where: { is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['id', 'user_name', 'exam_name', 'total_question', 'question_attempted', 'correct_attempts', 'total_marks', 'passing_marks', 'marks_obtained', 'declarations']
        }).catch(console.error)
    },
    getresultdetailsbyid: async data => {
        console.log("Come in Dao")
        return sql_conn.resultdetails.findAll({
            where: { id: data.result_id, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['id', 'user_name', 'exam_name', 'total_question', 'question_attempted', 'correct_attempts', 'total_marks', 'passing_marks', 'marks_obtained', 'declarations']
        }).catch(console.error)
    },
    editresultdetailsbyID: async data => {
        console.log("In dao edit company details")
        return sql_conn.resultdetails.update({ user_name: data.user_name, exam_name: data.exam_name, total_question: data.total_question,question_attempted: data.question_attempted, correct_attempts: data.correct_attempts, total_marks: data.total_marks,passing_marks: data.passing_marks, marks_obtained: data.marks_obtained, declarations: data.declarations }, { where: { id: data.result_id } }).catch(console.error);

    },
    deleteresultdetailsById: async data => {
        console.log("In dao delete company details")
        return sql_conn.resultdetails.update({is_delete:1},{where: { id: data}}).catch(console.error);
        },
}
module.exports = { resultdao }