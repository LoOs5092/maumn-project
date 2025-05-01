const express = require('express');
const router = express.Router();
const firebaseAuthMiddleware = require('../middlewares/firebaseAuth');
const dismissStudentController = require('../controllers/dismissStudentController');

// POST /dismiss-student – creates a dismissal record if authorized
router.post('/', firebaseAuthMiddleware, dismissStudentController.dismissStudent);

module.exports = router;
