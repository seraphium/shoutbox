var express = require('express');
var router = express.Router();
var register = require('../routes/register');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var login = require('../routes/login');

var entries = require('../routes/entries');

var validate = require('../lib/middleware/validate');

var page = require('../lib/middleware/page');

var Entry = require('../lib/entry');

/* GET home page. */
router.get('/:page?',page(Entry.count, 5), entries.list);
router.get('/post', entries.form);
router.post('/post', multipartMiddleware, validate.required('entry[title]'),
                    validate.lengthAbove('entry[title]', 4), entries.submit);

/* GET/POST register page*/
router.get('/register', register.form);
router.post('/register', multipartMiddleware,register.submit);

/* GET/POST login page*/
router.get('/login', login.form);
router.post('/login',  multipartMiddleware,login.submit);

/* LOGOUT */
router.get('/logout', login.logout);

module.exports = router;
