require('dotenv').config();
const express = require('express');
const cors = require('cors'); // ...added for CORS
const app = express();

// Import route modules
const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const gradeLevelRoutes = require('./routes/gradeLevelRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authorizedPickupRoutes = require('./routes/authorizedPickupRoutes');
const dismissalRecordRoutes = require('./routes/dismissalRecordRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const dismissStudentRoutes = require('./routes/dismissStudentRoutes');
const parentDismissalsRoutes = require('./routes/parentDismissalsRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // ...added middleware for CORS

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
app.use('/dismiss-student', dismissStudentRoutes);
app.use('/parent-dismissals', parentDismissalsRoutes); // <-- new router mount

// Instead of using app.listen directly, create an HTTP server.
const http = require('http');
const server = http.createServer(app);

// Initialize Socket.IO and attach to the server.
const { Server } = require('socket.io');
const io = new Server(server);
app.set('socketio', io);

// Sync database and then start server
const { sequelize } = require('./models');
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database & tables synced');
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server is listening on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error syncing database:', err);
  });
