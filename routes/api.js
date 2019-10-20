var express = require('express');
var router = express.Router();

var userController = require('../app/controllers/UsersController');
var songController = require('../app/controllers/SongsController');

var { middlewareJWT } = require('../app/middleware/middlewareJwt');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* ROUTE user page */
router.route('/users')
  .get(middlewareJWT, userController.index)
  .post(middlewareJWT, userController.new);

router.route('/users/:resourceId')
  .get(middlewareJWT, userController.view)
  .patch(middlewareJWT, userController.update)
  .put(middlewareJWT, userController.update)
  .delete(middlewareJWT, userController.delete);


/* ROUTE song page */
router.route('/songs')
  .get(songController.index)
  .post(middlewareJWT, songController.new);

router.route('/songs/:resourceId')
  .get(songController.view)
  .put(middlewareJWT, songController.update)
  .delete(middlewareJWT, songController.delete);

module.exports = router;
