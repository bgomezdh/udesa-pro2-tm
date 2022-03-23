const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');

/* GET users listing. */
router.get('/', alumnoController.index);

router.get('/aprobados', alumnoController.show);
  

module.exports = router;