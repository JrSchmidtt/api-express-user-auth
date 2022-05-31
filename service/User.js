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
            var result = await database.select(["id","email","role","name"]).where({id:id}).table("api_users");
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)))
            if(resultArray.length > 0){
                return resultArray[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }
    async findByEmail(email){
        try{
            var result = await database.select(["id","email","role","name"]).where({email:email}).table("api_users");
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)))
            if(resultArray.length > 0){
                return resultArray[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }
    async update(id, email, name, role){

        var user = await this.findById(id);
        console.log(user)
        if(user != undefined){

            var editUser = {};

            if(email != undefined){ 
                if(email != user.email){
                   var result = await this.findEmail(email);
                   if(result == false){
                        editUser.email = email;
                   }else{
                        return {status: false,err: "Email is already registered"}
                   }
                }
            }

            if(name != undefined){
                editUser.name = name;
            }

            if(role != undefined){
                editUser.role = role;
            }

            try{
                await database.update(editUser).where({id: id}).table("api_users");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "The user does not exist!"}
        }
    }
    async delete(id){
        var user = await this.findById(id);
        if(user != undefined){
            try{
                await database.delete().where({id: id}).table("api_users");
                return {status:true}
            }catch(err){
                return{status: false,err:err}
            }
        }else{
            return{status: false,err:'Error'}
        }
    }
}

module.exports = new User();