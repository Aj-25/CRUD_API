'use strict'

var sql_conn = require("../../db_model/index");
const constant = require('../utils/constant')

const adminDetails = {

    checkUserExist: async data => {
        return sql_conn.userModel.findOne({ 
            where: { email_id: data,is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['user_id', 'user_name', 'email_id'] 
        }).catch(console.error);
    },

    checkUserExistbyId: async data => {
        return sql_conn.userModel.findOne({ 
            where: { user_id: data, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['user_id', 'user_name', 'email_id'] 
         }).catch(console.error);
    },

    getuserdetails: async data => {
        return sql_conn.userModel.findAll({
            where: { is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE },
            attributes: ['user_id', 'user_name', 'email_id'],
            order: [['user_id', 'DESC']],
            offset: data,
            limit: constant.pagination.NUMBER
        }).catch(console.error)
    },

    deleteUserProfile :async data => {
        return sql_conn.userModel.update({is_delete:constant.isDeleted.TRUE}, {
            where: { user_id: data.user_id, is_active: constant.isActive.TRUE, is_delete: constant.isDeleted.FALSE }
        }).catch(console.error);
    },
    updateUserProfile: async params => {
        const updateFields = {};
    
        if (params.user_name) {
            updateFields.user_name = params.user_name;
        }
        if (params.email_id) {
            updateFields.email_id = params.email_id;
        }
        return sql_conn.userModel.update(updateFields, {
            where: { user_id: params.user_id }
        }).catch(console.error);
    },

}

module.exports = { adminDetails }