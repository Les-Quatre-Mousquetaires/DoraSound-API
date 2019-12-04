var express = require('express');
var passport = require('passport');
var router = express.Router();

var passport = require('passport');

var middlewareLogin = passport.authenticate('local', { session: false });
var middlewareAuthGoogle = passport.authenticate('google');
var middlewareAuthFacebook = passport.authenticate('facebookToken', { session: false });

var userController = require('../app/controllers/UsersController');

router.post('/login', middlewareLogin, userController.login);

router.get('/google/redirect', passport.authenticate('google'), userController.ggAuth);

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'], session: false
}), (req, res) => {
    // console.log(req.user);
});

router.post('/facebook-auth-callback', middlewareAuthFacebook, userController.fbAuth);

module.exports = router;