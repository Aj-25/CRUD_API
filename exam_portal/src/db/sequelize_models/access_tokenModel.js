'use strict';

module.exports = (sequelize, DataTypes) => {
	var access_token = sequelize.define('access_token', {
	access_token: {type:DataTypes.STRING(511),allowNull:false},
	os_version : {type:DataTypes.STRING,allowNull:true},
	is_active : {type:DataTypes.BOOLEAN,defaultValue:true},
	is_delete : {type:DataTypes.BOOLEAN,defaultValue:false}
	},{
        paranoid:true,
        timestamp:true,
        deletedAt:'deleted_at'
    });
	return access_token;
};