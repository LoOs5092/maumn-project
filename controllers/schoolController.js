// controllers/schoolController.js
const { School, User, Student, AuthorizedPickupPerson, GradeLevel } = require('../models');

exports.createSchool = async (req, res) => {
  try {
    const { school_name, address, phone_number } = req.body;
    const school = await School.create({ school_name, address, phone_number });
    res.status(201).json(school);
  } catch (error) {
    console.error('Error creating school:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    res.status(200).json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (school) {
      res.status(200).json(school);
    } else {
      res.status(404).json({ message: 'School not found' });
    }
  } catch (error) {
    console.error('Error fetching school:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await School.update(req.body, { where: { school_id: id } });
    if (updated) {
      const updatedSchool = await School.findByPk(id);
      res.status(200).json(updatedSchool);
    } else {
      res.status(404).json({ message: 'School not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating school:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await School.destroy({ where: { school_id: id } });
    if (deleted) {
      res.status(200).json({ message: 'School deleted successfully' });
    } else {
      res.status(404).json({ message: 'School not found' });
    }
  } catch (error) {
    console.error('Error deleting school:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSchoolParentsAndChildren = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    
    // First verify the school exists
    const school = await School.findByPk(schoolId);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Get all parents who have children in this school
    const parentsAndChildren = await User.findAll({
      where: {
        user_role: 'User' // Assuming 'User' role is for parents
      },
      include: [{
        model: AuthorizedPickupPerson,
        required: true, // Inner join to only get users who are authorized pickup persons
        where: {
          relationship_type: 'Parent',
          authorization_status: 'Approved'
        },
        include: [{
          model: Student,
          required: true,
          where: {
            school_id: schoolId // Filter students by school
          },
          include: [{
            model: GradeLevel,
            attributes: ['grade_number', 'grade_label', 'description']
          }]
        }]
      }],
      attributes: ['user_id', 'first_name', 'last_name', 'phone_number', 'email'],
      distinct: true // This will remove duplicates without GROUP BY
    });

    res.status(200).json(parentsAndChildren);
  } catch (error) {
    console.error('Error fetching school parents and children:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
