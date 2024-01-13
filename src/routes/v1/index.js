const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();

router.get('/info', InfoController.info);// when info routes call then infocontroller will called

module.exports = router;