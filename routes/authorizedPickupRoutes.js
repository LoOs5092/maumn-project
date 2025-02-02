// routes/authorizedPickupRoutes.js
const express = require('express');
const router = express.Router();
const authorizedPickupController = require('../controllers/authorizedPickupController');

router.post('/', authorizedPickupController.createAuthorizedPickup);
router.get('/', authorizedPickupController.getAllAuthorizedPickups);
router.get('/:id', authorizedPickupController.getAuthorizedPickupById);
router.put('/:id', authorizedPickupController.updateAuthorizedPickup);
router.delete('/:id', authorizedPickupController.deleteAuthorizedPickup);

module.exports = router;
