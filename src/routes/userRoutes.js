const express = require('express');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');

let router = express.Router();

router.get("/users", adminController.getAllUser);
router.get("/user/:id", adminController.getUserById);
router.post("/users", adminController.createUser);
router.patch("/user/:id", adminController.updateUser);
router.patch("/user/:id/status", adminController.changeUserStatus);
router.post("/purchase", userController.buyPackage);
module.exports = router;
