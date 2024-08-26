

module.exports = (sequelize, DataTypes) => {
	var user = sequelize.define('time_slot', {
		company_id: {type:DataTypes.STRING,allowNull:false},
        date: {type:DataTypes.STRING,allowNull:false},
        time: {type:DataTypes.STRING,allowNull:false},
	    is_active : {type:DataTypes.BOOLEAN,defaultValue:true},
        is_delete : {type:DataTypes.BOOLEAN,defaultValue:false}
	},{
        paranoid:true,
        timestamp:true,
        deletedAt:'deleted_at'
    });
	return user;
};