var express = require('express');
var passport = require('passport');
var router = express.Router();

var passport = require('passport');

var middlewareLogin = passport.authenticate('local', { session: false });
var middlewareAuthGoogle = passport.authenticate('googleToken', { session: false });
var middlewareAuthFacebook = passport.authenticate('facebookToken', { session: false });

var userController = require('../app/controllers/UsersController');

router.post('/login', middlewareLogin, userController.login);
router.get('/google-login', passport.authenticate('google', { scope: ['profile'] }));
router.post('/google-auth-callback', middlewareAuthGoogle, userController.ggAuth);
router.post('/facebook-auth-callback', middlewareAuthFacebook, userController.fbAuth);

module.exports = router;