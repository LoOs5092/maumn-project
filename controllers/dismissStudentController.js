const { User, AuthorizedPickupPerson, DismissalRecord, Student, GradeLevel } = require('../models');

exports.dismissStudent = async (req, res) => {
  try {
    // Get user from Firebase auth middleware
    const firebaseUid = req.user.uid;
    const user = await User.findOne({ where: { firebase_uid: firebaseUid } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { student_id, notes } = req.body;
    if (!student_id) {
      return res.status(400).json({ message: 'Student id is required' });
    }
    const now = new Date();
    // Verify authorized pickup record exists and is valid
    const authRecord = await AuthorizedPickupPerson.findOne({
      where: {
        user_id: user.user_id,
        student_id,
        authorization_status: 'Approved'
      }
    });
    if (!authRecord) {
      return res.status(403).json({ message: 'Not authorized to dismiss this student' });
    }
    if (authRecord.authorization_start_date && authRecord.authorization_start_date > now) {
      return res.status(403).json({ message: 'Authorization not yet active' });
    }
    if (authRecord.authorization_end_date && authRecord.authorization_end_date < now) {
      return res.status(403).json({ message: 'Authorization has expired' });
    }
    const dismissal = await DismissalRecord.create({
      student_id,
      pickup_person_user_id: user.user_id,
      pickup_time: now,
      notes: notes || null
    });
    // Retrieve student details and grade info to send along with the dismissal info
    const studentInfo = await Student.findByPk(student_id);
    const gradeInfo = await GradeLevel.findByPk(studentInfo.grade_level_id);
    const result = {
      dismissal_record_id: dismissal.dismissal_record_id,
      student: {
        student_id: studentInfo.student_id,
        first_name: studentInfo.first_name,
        last_name: studentInfo.last_name,
        gender: studentInfo.gender,
        grade_level_id: studentInfo.grade_level_id,
        school_id: studentInfo.school_id,
        grade_label: gradeInfo ? gradeInfo.grade_label : null,
        grade_number: gradeInfo ? gradeInfo.grade_number : null
      },
      pickup_person_user_id: dismissal.pickup_person_user_id,
      pickup_time: dismissal.pickup_time,
      notes: dismissal.notes,
      message: `Student ${studentInfo.first_name} ${studentInfo.last_name} was dismissed by ${user.first_name} ${user.last_name}`
    };
    // Emit real-time event to notify front-end clients with detailed info
    const io = req.app.get('socketio');
    io.emit('dismissalCreated', result);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error dismissing student:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
