var database = require('../database/connection');
const { findById } = require('../service/User');
const User = require('../service/User')
const crypto = require('crypto');

class PasswordToken {
    async create(email){
        var user = await User.findByEmail(email);
        if(user != undefined){
            try{
                var token = crypto.randomUUID()
                await database.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table('passwordtokens')
                return {status: true, token: token}
            }catch(err){
                console.log(err)
                return {status: false, err: err}
            }
        }else{
            return{status:false,err:'Email not found'}
        }
    }
    async validate(token){
        try{
            var result = await database.select().where({token: token}).table("passwordtokens");
            if(result != undefined){
                var tokenFound = result[0].token;
                if(tokenFound){
                    return {status: true, token: result[0].token, id:result[0].id};
                }else{
                    return {status: false};
                }
            }else{
                return {status:false,err:'Token invalid'}
            }
        }catch(err){
            console.log(err)
            return {status:false}
        }
    }
    async setUsed(token){
        await database.update({used:1}).where({token: token}).table("passwordtokens")
    }
}

module.exports = new PasswordToken();