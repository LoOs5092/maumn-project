// routes/gradeLevelRoutes.js
const express = require('express');
const router = express.Router();
const gradeLevelController = require('../controllers/gradeLevelController');

router.post('/', gradeLevelController.createGradeLevel);
router.get('/', gradeLevelController.getAllGradeLevels);
router.get('/:id', gradeLevelController.getGradeLevelById);
router.put('/:id', gradeLevelController.updateGradeLevel);
router.delete('/:id', gradeLevelController.deleteGradeLevel);

module.exports = router;
