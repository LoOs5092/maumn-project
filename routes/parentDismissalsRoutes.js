const express = require('express');
const router = express.Router();
const firebaseAuthMiddleware = require('../middlewares/firebaseAuth');
const parentDismissalController = require('../controllers/parentDismissalController');

// GET /parent-dismissals – gets parent's dismissal records from last week
router.get('/', firebaseAuthMiddleware, parentDismissalController.getParentDismissals);

module.exports = router;
