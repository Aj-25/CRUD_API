
module.exports = (sequelize, DataTypes) => {
	var otp = sequelize.define('otp', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        otp: {type:DataTypes.INTEGER,allowNull:false},
        is_expired : {type:DataTypes.BOOLEAN,defaultValue:false},        
	},{
        paranoid:true,
        timestamp:true,
        createdAt:'created_at',
        updatedAt:'updated_at'
    });
	return otp;
};















