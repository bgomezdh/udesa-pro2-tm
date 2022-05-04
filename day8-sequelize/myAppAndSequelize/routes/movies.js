const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

/* GET users listing. */
router.get('/all', movieController.findAll);

module.exports = router;