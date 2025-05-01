const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const firebaseAuthMiddleware = require('../middlewares/firebaseAuth');

// Create a new user
router.post('/', userController.createUser);

// Retrieve all users
router.get('/', userController.getAllUsers);

// GET /users/profile returns the parent's info and their kids info if authenticated
router.get('/profile', firebaseAuthMiddleware, userController.getParentKidsInfo);
// Retrieve a user by phone number
router.get('/phone/:phone', userController.getUserByPhoneNumber);

// Retrieve a single user by ID
router.get('/:id', userController.getUserById);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);



module.exports = router;
