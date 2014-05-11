var authCtrl = require('../controller/authCtrl'),
	constants = require('../model/constants'),
	passport = require('passport');
	//GoogleStrategy = require('passport-google').Strategy;

module.exports = function(app) {
	app.get('/signin',authCtrl.renderSignin);
	app.get('/auth/google', passport.authenticate('google'));
	app.get('/auth/google/return',passport.authenticate('google', { successRedirect: '/',failureRedirect: '/signin' }));
};

//res.locals.user