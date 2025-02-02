// config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../private/firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Optionally, add a databaseURL if you plan to use Firebase Realtime Database:
  // databaseURL: "https://<your-project-id>.firebaseio.com"
});

module.exports = admin;
