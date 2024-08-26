module.exports = (sequelize, DataTypes) => {
	var question_details = sequelize.define('questions_details', {
		question: {type:DataTypes.STRING,allowNull:false},
	    is_active : {type:DataTypes.BOOLEAN,defaultValue:true},
        is_delete : {type:DataTypes.BOOLEAN,defaultValue:false}
	},{
        paranoid:true,
        timestamp:true,
        deletedAt:'deleted_at'
    });
	return question_details;
};