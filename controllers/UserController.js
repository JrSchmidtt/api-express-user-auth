const res = require("express/lib/response");
const User = require('../models/User')

class UserController{
    async create(req, res){
        var { email, name, password, role } = req.body;
        var isEmail = /\S+@\S+\.\S+/;

        if(!isEmail.test(email)){
            res.status(403)
            return res.json({err: 'email is invalid'})
        }

        var emailsIsDuplicate = await User.findEmail(email);

        if(emailsIsDuplicate){
            res.status(406)
            return res.json({err: 'email is duplicated'})
        }

        if(name == undefined || name.length < 3 ){
            res.status(403)
            return res.json({err: 'name is invalid'})
        }

        if(password == undefined || password.length < 4 ){
            res.status(403)
            return res.json({err: 'password is invalid'})
        }

        if(role == undefined || role.length < 1 ){
            res.status(403)
            return res.json({err: 'role is invalid'})
        }

        await User.new(email, password, name, role)
        
        res.status(200)
        res.send('Ok')
    }
}


module.exports = new UserController();