require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

// Import route modules
const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const gradeLevelRoutes = require('./routes/gradeLevelRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authorizedPickupRoutes = require('./routes/authorizedPickupRoutes');
const dismissalRecordRoutes = require('./routes/dismissalRecordRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health-check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Mount routes
app.use('/users', userRoutes);
app.use('/schools', schoolRoutes);
app.use('/grade-levels', gradeLevelRoutes);
app.use('/students', studentRoutes);
app.use('/authorized-pickups', authorizedPickupRoutes);
app.use('/dismissal-records', dismissalRecordRoutes);
app.use('/announcements', announcementRoutes);

// Sync database and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database & tables synced');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error syncing database:', err);
  });
