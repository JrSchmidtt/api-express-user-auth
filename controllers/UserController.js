const res = require("express/lib/response");

class UserController{
    async create(req, res){
        var { email, name, password, role } = req.body;
        var emailcheck = /\S+@\S+\.\S+/;

        console.log('email:'+email)
        console.log('name:'+name)
        console.log('cargo:'+role)
        console.log('senha:'+password)

        if(!emailcheck.test(email)){
            res.status(403)
            return res.json({err: 'email is invalid'})
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

        res.status(200)
        res.send('Ok')
    }
}


module.exports = new UserController();