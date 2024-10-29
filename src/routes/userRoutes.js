const express = require('express');
const adminController = require('../controllers/adminController');

let router = express.Router();

router.get("/users", adminController.getAllUser);
router.get("/user/:id", adminController.getUserById);
router.post("/users", adminController.createUser);
router.patch("/user/:id", adminController.updateUser);
router.patch("/user/:id/status", adminController.changeUserStatus);

module.exports = router;
