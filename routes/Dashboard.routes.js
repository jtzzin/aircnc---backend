// index() = listagem de spots
const express = require('express');
const DashboardController = require('../controllers/Dashboard.controller');
const router = express.Router();

router.get('/', DashboardController.index);

module.exports = router;