const express = require('express');
const userController = require('../controllers/userController');

let router = express.Router();

router.post("/login", userController.handleLogin);
router.post("/register", userController.handleRegister);

module.exports = router;
