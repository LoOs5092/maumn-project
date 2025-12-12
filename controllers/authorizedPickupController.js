// controllers/authorizedPickupController.js
const { AuthorizedPickupPerson } = require('../models');

exports.createAuthorizedPickup = async (req, res) => {
  try {
    const { student_id, user_id, relationship_type, authorized_by_user_id, authorization_status, authorization_start_date, authorization_end_date } = req.body;
    const pickup = await AuthorizedPickupPerson.create({
      student_id,
      user_id,
      relationship_type,
      authorized_by_user_id,
      authorization_status,
      authorization_start_date,
      authorization_end_date
    });
    res.status(201).json(pickup);
  } catch (error) {
    console.error('Error creating authorized pickup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllAuthorizedPickups = async (req, res) => {
  try {
    const { student_id } = req.query;
    const whereClause = {};
    
    if (student_id) {
      whereClause.student_id = student_id;
    }

    const pickups = await AuthorizedPickupPerson.findAll({
      where: whereClause
    });
    res.status(200).json(pickups);
  } catch (error) {
    console.error('Error fetching authorized pickups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAuthorizedPickupById = async (req, res) => {
  try {
    const pickup = await AuthorizedPickupPerson.findByPk(req.params.id);
    if (pickup) {
      res.status(200).json(pickup);
    } else {
      res.status(404).json({ message: 'Authorized pickup not found' });
    }
  } catch (error) {
    console.error('Error fetching authorized pickup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateAuthorizedPickup = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await AuthorizedPickupPerson.update(req.body, { where: { authorization_id: id } });
    if (updated) {
      const updatedPickup = await AuthorizedPickupPerson.findByPk(id);
      res.status(200).json(updatedPickup);
    } else {
      res.status(404).json({ message: 'Authorized pickup not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating authorized pickup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteAuthorizedPickup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AuthorizedPickupPerson.destroy({ where: { authorization_id: id } });
    if (deleted) {
      res.status(200).json({ message: 'Authorized pickup deleted successfully' });
    } else {
      res.status(404).json({ message: 'Authorized pickup not found' });
    }
  } catch (error) {
    console.error('Error deleting authorized pickup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
