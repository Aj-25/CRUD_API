module.exports = (sequelize, DataTypes) => {
	var answermodel = sequelize.define('correct_answer', {
		question_id: {type:DataTypes.STRING,allowNull:false},
        answer: {type:DataTypes.STRING,allowNull:false},
        
	    is_active : {type:DataTypes.BOOLEAN,defaultValue:true},
        is_delete : {type:DataTypes.BOOLEAN,defaultValue:false}
	},{
        paranoid:true,
        timestamp:true,
        deletedAt:'deleted_at'
    });
	return answermodel;
};