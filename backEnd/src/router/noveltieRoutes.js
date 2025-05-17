const express = require('express');
const router = express.Router();
const noveltieController= require('../controllers/noveltieController');

router.get('/novelties', noveltieController.getNovelties);

module.exports = router;
