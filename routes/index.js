var express = require('express');
var router = express.Router();
var register = require('../routes/register');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var login = require('../routes/login');

var entries = require('../routes/entries');

/* GET home page. */
router.get('/',entries.list);
router.get('/post', entries.form);
router.post('/post', multipartMiddleware,entries.submit);

/* GET/POST register page*/
router.get('/register', register.form);
router.post('/register', multipartMiddleware,register.submit);

/* GET/POST login page*/
router.get('/login', login.form);
router.post('/login',  multipartMiddleware,login.submit);

/* LOGOUT */
router.get('/logout', login.logout);

module.exports = router;
