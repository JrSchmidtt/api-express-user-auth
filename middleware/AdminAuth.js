var jwt = require("jsonwebtoken")

var secret = 'R0vwcPYIoAIOCBozuYuQOf85dZ7'

module.exports = function (req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        try{
            var decode = jwt.verify(token,secret)
            if(decode.role == 1){
                next();
            }else{
                res.status(403);
                res.send('Unauthorized')
                return;
            }
        }catch(err){
            res.status(403);
            res.send('Unauthorized')
            return;
        }
    }else{
        res.status(403);
        res.send('Unauthorized')
        return;
    }
}