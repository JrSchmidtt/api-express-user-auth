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
    async findAll(){
        try{
            var query = await database.select(['id', 'name', 'email', 'role']).table('api_users')
            return query;
        }catch(err){
            console.log(err);
            return[];
        }
    }
    async findById(id){
        try{
            var query = await database.select(['id', 'name', 'email', 'role']).where({id:id}).table('api_users')
            if(query.length > 0){
                return query[0]
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }
}

module.exports = new User();