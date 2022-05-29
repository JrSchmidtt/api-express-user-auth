var database = require('../database/connection');
var bcrypt = require('bcrypt');

class User{
    async new(email, password, name, role){
        try{
            var saltRounds = 2
            var hash = await bcrypt.hash(password,saltRounds);
            var query = await database.insert({email, password:hash, name, role }).table('api_users')
            console.log(query)
        }catch(err){
            console.log(err);
        }
    }
    async findEmail(email){
        try{
            var query = await database.select('*').from('api_users').where({email:email})
            if(query.length > 0){
                return true;
            }else{
                return false
            }
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new User();