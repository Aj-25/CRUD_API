
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
	var user = sequelize.define('users', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        // },
		user_name: {type:DataTypes.STRING,allowNull:false},
	    email_id: {
            type:DataTypes.STRING,
            defaultValue:"abc@gmail.com",
            allowNull: false,
            validate: {
                isEmail:true
              },
              unique: {
                  args: true,
                  msg: 'Email address already in use!'
              }
        },
        password: {type:DataTypes.STRING, allowNull:false,
            set(value){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value,salt);
            this.setDataValue('password',hash);
        }} ,
        
        phone_number: {type:DataTypes.STRING,allowNull:false},
        profile_pic : {type:DataTypes.STRING,allowNull:false},
        user_role:{type:DataTypes.TINYINT,allowNull:false},
        // user_role: {type: DataTypes.ENUM('user', 'admin'),defaultValue: 'user'},
        verification_otp : {type:DataTypes.STRING,allowNull:true},
        is_email_verified : {type:DataTypes.BOOLEAN,defaultValue:false},
        is_active : {type:DataTypes.BOOLEAN,defaultValue:true},
        is_delete : {type:DataTypes.BOOLEAN,defaultValue:false}
	
        
	},{
        paranoid:true,
        timestamp:true,
        deletedAt:'deleted_at'
    });
	return user;
};