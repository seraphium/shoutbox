var express = require('express');
var router = express.Router();
var register = require('../routes/register');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var login = require('../routes/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET/POST register page*/
router.get('/register', register.form);
router.post('/register', multipartMiddleware,register.submit);

/* GET/POST login page*/
router.get('/login', login.form);
router.post('/login',  multipartMiddleware,login.submit);
router.post('/logout', login.logout);

module.exports = router;
