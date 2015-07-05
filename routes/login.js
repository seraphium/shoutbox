/**
 * Created by jackiezhang on 15/6/27.
 */

var User = require('../lib/user');

exports.form = function(req, res) {
  res.render('login', {title: 'Login'});
};

exports.submit = function(req, res, next) {
    var data =req.body.user;
    User.authenticate(data.name, data.password, function(err, user) {
        if (err) return next(err);
        if (user) {
         req.session.uid = user.id;
            res.redirect('/');
        }
        else
        {
            res.error('invalid username or password!');
            res.redirect('back');
        }
    });

};

exports.logout = function(req, res){
    req.session.destroy(function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};
