// routes/dismissalRecordRoutes.js
const express = require('express');
const router = express.Router();
const dismissalRecordController = require('../controllers/dismissalRecordController');

router.post('/', dismissalRecordController.createDismissalRecord);
router.get('/', dismissalRecordController.getAllDismissalRecords);
router.get('/:id', dismissalRecordController.getDismissalRecordById);
router.put('/:id', dismissalRecordController.updateDismissalRecord);
router.delete('/:id', dismissalRecordController.deleteDismissalRecord);

module.exports = router;
