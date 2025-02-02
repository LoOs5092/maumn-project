// controllers/announcementController.js
const { Announcement } = require('../models');

exports.createAnnouncement = async (req, res) => {
  try {
    const { message, school_id } = req.body;
    const announcement = await Announcement.create({ message, school_id });
    res.status(201).json(announcement);
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (announcement) {
      res.status(200).json(announcement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Announcement.update(req.body, { where: { announcement_id: id } });
    if (updated) {
      const updatedAnnouncement = await Announcement.findByPk(id);
      res.status(200).json(updatedAnnouncement);
    } else {
      res.status(404).json({ message: 'Announcement not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.destroy({ where: { announcement_id: id } });
    if (deleted) {
      res.status(200).json({ message: 'Announcement deleted successfully' });
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
