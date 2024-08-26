

module.exports = (sequelize, DataTypes) => {
	var companydetails = sequelize.define('company_details', {
		company_name: {type:DataTypes.STRING,allowNull:false},
        company_details: {type:DataTypes.STRING,allowNull:false},
        exam_name: {type:DataTypes.STRING,allowNull:false},
        exam_details: {type:DataTypes.STRING,allowNull:false},
        designation: {type:DataTypes.STRING,allowNull:false},
	    is_active : {type:DataTypes.BOOLEAN,defaultValue:true},
        is_delete : {type:DataTypes.BOOLEAN,defaultValue:false}
	},{
        paranoid:true,
        timestamp:true,
        deletedAt:'deleted_at'
    });
	return companydetails;
};