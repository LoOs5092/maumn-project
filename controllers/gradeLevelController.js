// controllers/gradeLevelController.js
const { GradeLevel } = require('../models');

exports.createGradeLevel = async (req, res) => {
  try {
    const { grade_name, description } = req.body;
    const gradeLevel = await GradeLevel.create({ grade_name, description });
    res.status(201).json(gradeLevel);
  } catch (error) {
    console.error('Error creating grade level:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllGradeLevels = async (req, res) => {
  try {
    const gradeLevels = await GradeLevel.findAll();
    res.status(200).json(gradeLevels);
  } catch (error) {
    console.error('Error fetching grade levels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getGradeLevelById = async (req, res) => {
  try {
    const gradeLevel = await GradeLevel.findByPk(req.params.id);
    if (gradeLevel) {
      res.status(200).json(gradeLevel);
    } else {
      res.status(404).json({ message: 'Grade level not found' });
    }
  } catch (error) {
    console.error('Error fetching grade level:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateGradeLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await GradeLevel.update(req.body, { where: { grade_level_id: id } });
    if (updated) {
      const updatedGradeLevel = await GradeLevel.findByPk(id);
      res.status(200).json(updatedGradeLevel);
    } else {
      res.status(404).json({ message: 'Grade level not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating grade level:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteGradeLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await GradeLevel.destroy({ where: { grade_level_id: id } });
    if (deleted) {
      res.status(200).json({ message: 'Grade level deleted successfully' });
    } else {
      res.status(404).json({ message: 'Grade level not found' });
    }
  } catch (error) {
    console.error('Error deleting grade level:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
