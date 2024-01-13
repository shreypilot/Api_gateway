const express = require('express');
const { UserController } = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middleware');
const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/signup',AuthRequestMiddlewares.validateAuthRequest, UserController.signup);
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest, UserController.signin);
module.exports = router;