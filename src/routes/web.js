const express = require('express');
const userController = require('../controllers/userController');

const { verifyToken, verifyAdmin, verifyStaff } = require('../middleware/auth');

let router = express.Router();

let initWebRoutes = (app) => {

  router.post("/login", userController.handleLogin);

  router.post("/register", userController.handleRegister);

  router.post("/forgot-password", userController.handleForgotPassword);

  //    router.post("/verify-token", userController.handleVerifyEmail);

  router.put("/reset-password", userController.handleResetPassword);

  router.get("/icon", (req, res) => {
    res.send('😀😃😄😁😆😅🤣😂');
  });
  return app.use("/api", router);
};

module.exports = initWebRoutes;
