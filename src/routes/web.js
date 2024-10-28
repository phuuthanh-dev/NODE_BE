const express = require('express');
const userController = require('../controllers/userController');

const { verifyToken, verifyAdmin, verifyStaff } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

let router = express.Router();

let initWebRoutes = (app) => {

  router.post("/login", userController.handleLogin);

  router.post("/register", userController.handleRegister);

  router.get("/users", adminController.getAllUser);

  router.get("/user/:id", adminController.getUserById);

  router.post("/users", adminController.createUser);

  router.patch("/user/:id", adminController.updateUser);

  router.patch("/user/:id/status", adminController.changeUserStatus);


  router.get("/icon", (req, res) => {
    res.send('😀😃😄😁😆😅🤣😂');
  });
  return app.use("/api", router);
};

module.exports = initWebRoutes;
