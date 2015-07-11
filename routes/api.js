/**
 * Created by jackiezhang on 15/7/11.
 */

var express = require('express');

var User = require('../lib/user');

var basicAuth = require('basic-auth-connect');

var Entry = require('../lib/entry');

exports.auth = basicAuth(User.authenticate);

exports.user = function (req, res, next) {
    User.get(req.params.id, function(err, user){
        if (err) return next(err);
        if (!user.id) return res.send(404);
        res.json(user);
    });
};

exports.entries = function (req, res, next) {
    var page = req.page;
    Entry.getRange(page.from, page.to, function(err, entries) {
        if (err) return next(err);
        res.format({
            'application/json': function() {
                return res.send(entries);
            },
            'application/xml': function() {
                res.render('entries/xml', {entries: entries});
            }
        })
    });
};