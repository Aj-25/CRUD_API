const jwt = require('jsonwebtoken');
const config = require('../config/config')
const responseMessage = require('../utils/response_message')

const authFunction = {
    authCheck : function(accessToken) {
        return new Promise((resolve, reject) => {
            try {
                console.log("come to auth check")
                let decode = jwt.verify(accessToken,config.jwt_key);
				if(decode) {
                   
					return resolve({data : decode})
				}
				else {
                    return false
					// throw new Error(responseMessage.Error.INVALID_ACCESS_TOKEN)
				}
            }
            catch (error) {
                return reject(error);
            }
         })
    },
};


module.exports = {authFunction};
