var database = require('../database/connection');
const { findById } = require('../service/User');
const User = require('../service/User')

class PasswordToken {
    async create(email){
        var user = await User.findByEmail(email);
        if(user != undefined){
            try{
                var token = Date.now() // To do: UUID
                await database.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table('passwordTokens')
                return {status: true, token: token}
            }catch(err){
                console.log(err)
                return {status: false, err: err}
            }
        }else{
            return{status:false,err:'Email not found'}
        }
    }
}

module.exports = new PasswordToken();