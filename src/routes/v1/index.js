const express = require('express');

const { InfoController } = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middleware');
const userRouter = require('./user-routes');
const router = express.Router();

router.get('/info', InfoController.info);
router.get('/info',AuthRequestMiddlewares.checkAuth, InfoController.info);
router.use('/signup', userRouter)
router.use('/user', userRouter)

module.exports = router;