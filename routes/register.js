/**
 * Created by jackiezhang on 15/6/27.
 */

var User = require('../lib/user');

exports.form = function(req, res) {
  res.render('register', {title: 'register'});
};

exports.submit = function(req, res) {
    var data = req.body.user;
    User.getByName(data.name, function(err, user) {
    if (err) return next(err);
    //redis will default it
    if (user.id) {
      res.error('Username already taken');
      res.redirect('back');
    }
    else
    {
      user = new User ({
        name: data.name,
        pass: data.password
      });
    }
    user.save(function(err) {
      if (err) return next(err);
      req.session.uid = user.id;
      res.redirect('/');
    });
  });

};