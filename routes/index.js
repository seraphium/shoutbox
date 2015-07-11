var express = require('express');
var router = express.Router();
var register = require('./register');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var login = require('./login');

var entries = require('./entries');

var validate = require('../lib/middleware/validate');

var page = require('../lib/middleware/page');

var Entry = require('../lib/entry');

var api = require('./api');

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

/* RESTFul API*/
router.get('/api/user/:id', api.user);
router.get('/api/entries/:page?', page(Entry.count), api.entries);
router.post('/api/entry', multipartMiddleware, entries.submit);

if (process.env.ERROR_ROUTE) {
    router.get('/dev/error', function(req, res, next){
        var error = new Error('Database connection field');
        error.type = 'database';
        return next(error);
    });
}

module.exports = router;
