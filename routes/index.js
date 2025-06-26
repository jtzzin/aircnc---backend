const express = require("express");
const sessionRoutes = require('./Session.routes');
// const spotsRoutes = require('./Spots.routes');
// const dashboardRoutes = require('./Dashboard.routes');

const router= express.Router();

router.use('/session', sessionRoutes);

module.exports = router;

