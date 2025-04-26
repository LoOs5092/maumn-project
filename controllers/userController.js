const { User } = require('../models');
const admin = require('../config/firebase');

// Function to normalize phone numbers with default Saudi Arabia country code (+966)
const normalizePhoneNumber = (phone) => {
    // Remove spaces and dashes
    phone = phone.replace(/[\s\-]/g, '');
    // If it already starts with '+', return it as is
    if (phone.startsWith('+')) return phone;
    // If it starts with '0', replace leading zero with +966
    if (phone.startsWith('0')) return '+966' + phone.slice(1);
    // Otherwise, assume local phone number and add +966 prefix
    return '+966' + phone;
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, password_hash, user_role, school_id } = req.body;

    // Validate that at least phone number or email is provided
    if (!phone_number && !email) {
      return res.status(400).json({ error: 'Either phone number or email is required' });
    }

    // Normalize phone number if provided
    const normalizedPhone = phone_number ? normalizePhoneNumber(phone_number) : null;

    // Create user in Firebase
    const firebaseUser = await admin.auth().createUser({
      phoneNumber: normalizedPhone,
      email: email || undefined,
      password: password_hash,
      displayName: `${first_name} ${last_name}`,
    });

    // Create user in database with Firebase UID
    const user = await User.create({
      first_name,
      last_name,
      phone_number: normalizedPhone,
      email,
      password_hash,
      user_role,
      school_id,
      firebase_uid: firebaseUser.uid
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    // Check if Firebase user was created but database creation failed
    if (error.code !== 'auth/invalid-phone-number' && error.code !== 'auth/invalid-email') {
      try {
        // If Firebase user exists, delete it to maintain consistency
        if (firebaseUser?.uid) {
          await admin.auth().deleteUser(firebaseUser.uid);
        }
      } catch (deleteError) {
        console.error('Error cleaning up Firebase user:', deleteError);
      }
    }
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve a user by phone number
exports.getUserByPhoneNumber = async (req, res) => {
  try {
    let { phone } = req.params;
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    const normalizedPhone = normalizePhoneNumber(phone);
    const user = await User.findOne({ where: { phone_number: normalizedPhone } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by phone:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { user_id: id } });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { user_id: id } });
    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getParentKidsInfo = async (req, res) => {
  try {
    // Retrieve the Firebase UID from the authenticated request
    const firebaseUid = req.user.uid;
    
    // Find the parent using the Firebase UID
    const parent = await User.findOne({
      where: { firebase_uid: firebaseUid },
      attributes: ['user_id', 'first_name', 'last_name', 'phone_number', 'email']
    });
    
    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    // Fetch parent's children info through the AuthorizedPickupPerson model,
    // which acts as the bridge between the parent and the Student record.
    const parentWithKids = await User.findOne({
      where: { firebase_uid: firebaseUid },
      attributes: ['user_id', 'first_name', 'last_name', 'phone_number', 'email'],
      include: [{
        model: AuthorizedPickupPerson,
        required: false, // in case there is no associated kid
        where: {
          relationship_type: 'Parent',
          authorization_status: 'Approved'
        },
        include: [{
          model: Student,
          include: [{
            model: GradeLevel,
            attributes: ['grade_number', 'grade_label', 'description']
          }]
        }]
      }]
    });

    res.status(200).json(parentWithKids);
  } catch (error) {
    console.error('Error fetching parent and kids info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
