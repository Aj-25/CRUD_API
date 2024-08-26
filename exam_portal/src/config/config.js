const dotEnv = require('dotenv');
let secret_env = process.env
dotEnv.config();


module.exports={
    db_host: secret_env.DB_HOST,
    db_user_name: secret_env.DB_USER,
    db_password: secret_env.DB_PASS,
    db_name: secret_env.DB_NAME,
    db_dialect: secret_env.DB_DIALECT,
    pool: {
        max: 5 | 0,
        min: 0 | 0,
        idle: 10000
    },
    app_port: secret_env.PORT,
    jwt_key: secret_env.JWT_KEY,
}