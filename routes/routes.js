var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var UserController = require('../controllers/UserController');
var AdminAuth = require('../middleware/AdminAuth');

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get('/user', AdminAuth, UserController.index);
router.get('/user/:id', AdminAuth, UserController.findUser);
router.delete('/user/:id', AdminAuth, UserController.remove);
router.put('/user/:id', AdminAuth, UserController.editUser);
router.post('/recoverPassword', UserController.recoverPassword);
router.post('/changePassword', UserController.changePassword);
router.post('/login', UserController.login);

module.exports = router;