// Import necessary modules
const express = require('express');
const router = express.Router();
const {register, login, profile,getAllUsers, updateUser, deleteUser,updateUserAdmin} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


// Create a new user
router.post('/createuser', register);

// Get all users
router.get('/users',protect, getAllUsers);

// Get a specific user by ID
router.get('/users/:id', profile);

// Login route
router.post('/login', login);

// Update a user by ID
router.put('/users/:id',protect ,updateUser);

//Update a user by id (admin route)
router.put('/users/admin/:id',protect,updateUserAdmin)

// Delete a user by ID
router.delete('/users/:id', protect ,deleteUser);


module.exports = router;
