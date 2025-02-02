// controllers/dismissalRecordController.js
const { DismissalRecord } = require('../models');

exports.createDismissalRecord = async (req, res) => {
  try {
    const { student_id, pickup_person_user_id, pickup_time, notes } = req.body;
    const record = await DismissalRecord.create({ student_id, pickup_person_user_id, pickup_time, notes });
    res.status(201).json(record);
  } catch (error) {
    console.error('Error creating dismissal record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllDismissalRecords = async (req, res) => {
  try {
    const records = await DismissalRecord.findAll();
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching dismissal records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getDismissalRecordById = async (req, res) => {
  try {
    const record = await DismissalRecord.findByPk(req.params.id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ message: 'Dismissal record not found' });
    }
  } catch (error) {
    console.error('Error fetching dismissal record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateDismissalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await DismissalRecord.update(req.body, { where: { dismissal_record_id: id } });
    if (updated) {
      const updatedRecord = await DismissalRecord.findByPk(id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ message: 'Dismissal record not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating dismissal record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteDismissalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DismissalRecord.destroy({ where: { dismissal_record_id: id } });
    if (deleted) {
      res.status(200).json({ message: 'Dismissal record deleted successfully' });
    } else {
      res.status(404).json({ message: 'Dismissal record not found' });
    }
  } catch (error) {
    console.error('Error deleting dismissal record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
