const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/config')

const sequelize = new Sequelize(dbConfig.db_name, dbConfig.db_user_name, dbConfig.db_password,
    {
        host: dbConfig.db_host,
        dialect: dbConfig.db_dialect,
        logging: false,                   
        pool: { 
            max: 5, 
            min: 0, 
            idle: 10000 
        }
    }); 
    /* (dataname,username,password,host) 
    logging: false = to hide query from console*/





const db = {};

db.sequelize = sequelize;


db.sequelize.sync({ force: false, })
    .then(() => {
        console.log('MySQL Connected')
    })

    
db.userModel = require('./userModel')(sequelize, DataTypes);
db.accessTokenModel = require('./access_tokenModel')(sequelize, DataTypes);
db.otpDetails = require('./otpModel')(sequelize, DataTypes);


module.exports = db
