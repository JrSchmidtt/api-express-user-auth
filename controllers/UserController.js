const User = require('../service/User')
const PasswordToken = require('../service/PasswordToken')
const res = require("express/lib/response");
const req = require("express/lib/request");
const database = require('../database/connection');


class UserController{
    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async create(req, res){
        var { email, name, password, role } = req.body;
        var isEmail = /\S+@\S+\.\S+/;

        if(!isEmail.test(email)){
            res.status(403);
            return res.json({err: 'email is invalid'});
        }

        var emailsIsDuplicate = await User.findEmail(email);

        if(emailsIsDuplicate){
            res.status(406);
            return res.json({err: 'email is duplicated'});
        }

        if(name == undefined || name.length < 3 ){
            res.status(403);
            return res.json({err: 'name is invalid'});
        }

        if(password == undefined || password.length < 4 ){
            res.status(403);
            return res.json({err: 'password is invalid'});
        }

        if(role == undefined || role.length < 1 ){
            res.status(403);
            return res.json({err: 'role is invalid'});
        }

        await User.new(email, password, name, role);

        res.status(200);
        res.send('Ok');
    }

    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({err: 'User not found'});
        }else{
            res.status(200);
            res.json(user);
        }
    }

    async editUser(req, res){
        var id = req.params.id;
        var email = req.body.email;
        var name = req.body.name;
        console.log(email)
        var { email, name, role } = req.body;
        console.log(name)
        var result = await User.update(id, email, name, role)
        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send('Tudo Ok');
            }else{
                res.status(406)
                res.send(result.err);
            }
        }else{
            res.status(406)
            res.send('err');
        }
    }

    async remove(req,res){
        var id = req.params.id;
        var result= await User.delete(id);
        if(result.status){
            res.send(200);
            res.send(`User ${id} has been deleted`);
        }else{
            res.status(406);
            res.send(result.err);
        }
    }
    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if (result.status){
            res.status(200);
            res.send(`Token:${result.token}`);
            //NodeMailer.send(result.token)         To Do: enviar email com o nodeMailer
        }else{
            res.status(406);
            res.send(result.err);
        }
    }
    async changePassword(req, res){
        var token = req.body.token;
        var newPassword = req.body.password;
        var isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status){
           await User.changePassword(newPassword,isTokenValid.id,isTokenValid.token)
           res.status(200)
           res.send('Password updated');
        }else{
            res.status(406)
            res.send('Token Invalid');
        }
    }
}

module.exports = new UserController();