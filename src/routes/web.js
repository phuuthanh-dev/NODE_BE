const express = require('express');
const userController = require('../controllers/userController');
const koiFishBreedController = require('../controllers/koiFishBreedController');

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

  router.get("/calculate-zodiac", userController.calculateZodiac);

  router.get("/koi-fish-breeds", koiFishBreedController.getAllKoiFishBreeds);

  router.post("/koi-fish-breed", koiFishBreedController.createKoiFishBreed);

  router.get("/get-koi-by-zodiac", koiFishBreedController.getKoiFishByZodiac);

  router.get("/get-koi-by-id/:id", koiFishBreedController.getKoiFishById);

  router.patch("/koi-fish-breed/:id", koiFishBreedController.updateKoiFishBreed);

  return app.use("/api", router);
};

module.exports = initWebRoutes;
