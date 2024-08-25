
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
	var user = sequelize.define('users', {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
		user_name: {type:DataTypes.STRING,allowNull:false},
	    email_id: {
            type:DataTypes.STRING,
            defaultValue:"notavailable@gmail.com",
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
        
        phone_number: {type:DataTypes.STRING,allowNull:true},
        user_role: {type: DataTypes.ENUM('user', 'admin'),defaultValue: 'user'},
        is_active : {type:DataTypes.BOOLEAN,defaultValue:true},
        is_delete : {type:DataTypes.BOOLEAN,defaultValue:false}
	
        
	},{
        paranoid:true,
        timestamp:true,
        createdAt:'created_at',
        updateAt:'updated_at',
        deletedAt:'deleted_at'
    });
	return user;
};