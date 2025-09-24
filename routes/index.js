const express = require('express');
const SessionRoutes = require('./Session.routes');
const SpotsRoutes = require('./Spots.routes');
const DashboardRoutes = require('./Dashboard.routes');

const router = express.Router();

router.use('/session', SessionRoutes);
router.use('/spots', SpotsRoutes)
router.use('/dashboard', DashboardRoutes)


module.exports = router;




