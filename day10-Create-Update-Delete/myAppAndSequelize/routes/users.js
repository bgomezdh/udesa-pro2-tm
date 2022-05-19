var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', userController.login);

router.post('/login', userController.procesarLogin);

router.get('/register', userController.register);

router.post('/register', userController.procesarRegister);

module.exports = router;
