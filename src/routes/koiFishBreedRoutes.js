const express = require('express');
const koiFishBreedController = require('../controllers/koiFishBreedController');

let router = express.Router();

router.get("/koi-fish-breeds", koiFishBreedController.getAllKoiFishBreeds);
router.post("/koi-fish-breed", koiFishBreedController.createKoiFishBreed);
router.get("/get-koi-by-zodiac", koiFishBreedController.getKoiFishByZodiac);
router.get("/get-koi-by-id/:id", koiFishBreedController.getKoiFishById);
router.patch("/koi-fish-breed/:id", koiFishBreedController.updateKoiFishBreed);

module.exports = router;
