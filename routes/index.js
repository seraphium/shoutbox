var express = require('express');
var router = express.Router();
var register = require('../routes/register');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET/POST register page*/
router.get('/register', register.form);
router.post('/register', multipartMiddleware,register.submit);

module.exports = router;
