// [result_id,username, exam_name,total_question, question_attempted ,correct_attempts,passing_marks, marks_obtained, declarations(cleared or not).

module.exports = (sequelize, DataTypes) => {
	var result = sequelize.define('result', {
		user_name: {type:DataTypes.STRING,allowNull:false},
        exam_name: {type:DataTypes.STRING,allowNull:false},
        total_question: {type:DataTypes.STRING,allowNull:false},
        question_attempted: {type:DataTypes.STRING,allowNull:false},
        correct_attempts: {type:DataTypes.STRING,allowNull:false},
        total_marks: {type:DataTypes.STRING,allowNull:false},
        passing_marks: {type:DataTypes.STRING,allowNull:false},
        marks_obtained: {type:DataTypes.STRING,allowNull:false},
        declarations: {type:DataTypes.STRING,allowNull:false},
        
        is_active : {type:DataTypes.BOOLEAN,defaultValue:true},
        is_delete : {type:DataTypes.BOOLEAN,defaultValue:false}
	
        
	},{
        paranoid:true,
        timestamp:true,
        deletedAt:'deleted_at'
    });
	return result;
};