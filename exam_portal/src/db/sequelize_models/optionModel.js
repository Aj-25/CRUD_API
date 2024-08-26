module.exports = (sequelize, DataTypes) => {
	var option_details = sequelize.define('optains_details', {
		question_id: {type:DataTypes.STRING,allowNull:false},
        option_1: {type:DataTypes.STRING,allowNull:false},
        option_2: {type:DataTypes.STRING,allowNull:false},
        option_3: {type:DataTypes.STRING,allowNull:false},
        option_4: {type:DataTypes.STRING,allowNull:false},
	    is_active : {type:DataTypes.BOOLEAN,defaultValue:true},
        is_delete : {type:DataTypes.BOOLEAN,defaultValue:false}
	},{
        paranoid:true,
        timestamp:true,
        deletedAt:'deleted_at'
    });
	return option_details;
};