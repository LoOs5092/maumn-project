const { DismissalRecord, User, Student } = require('../models');
const { Op } = require('sequelize');

exports.getParentDismissals = async (req, res) => {
  try {
    // Get parent's phone number from Firebase token (assumes token includes phone_number)
    const parentPhone = req.user.phone_number;
    if (!parentPhone) {
      return res.status(400).json({ message: 'Phone number not provided in token' });
    }
    // Find the parent record by phone number
    const parent = await User.findOne({ where: { phone_number: parentPhone } });
    if (!parent) {
      return res.status(404).json({ message: 'Parent user not found' });
    }
    // Calculate one week ago date
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    // Fetch dismissal records with student details (name and gender)
    // and include pickup person details (name)
    const dismissals = await DismissalRecord.findAll({
      where: {
        pickup_person_user_id: parent.user_id,
        pickup_time: { [Op.gte]: oneWeekAgo }
      },
      include: [
        {
          model: Student,
          attributes: ['first_name', 'last_name', 'gender']
        },
        {
          model: User,
          as: 'pickupPerson',
          attributes: ['first_name', 'last_name']
        }
      ]
    });
    res.status(200).json(dismissals);
  } catch (error) {
    console.error('Error fetching parent dismissals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
