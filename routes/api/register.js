const express = require('express');
const router = express.Router();
const registeredController = require('../../controllers/registeredController');

router.post('/', registeredController.handleNewUser);

module.exports = router;