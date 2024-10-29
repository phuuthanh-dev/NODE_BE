const express = require('express');
const destinyControler = require('../controllers/destintyController');

let router = express.Router();

router.get("/destinies", destinyControler.getAllDestinies);
// router.post("/destiny", destinyControler.createDestiny);

module.exports = router;
