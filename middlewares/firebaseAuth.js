// middlewares/firebaseAuth.js
const admin = require('../config/firebase');

const firebaseAuthMiddleware = async (req, res, next) => {
  // Expect the token in the "Authorization" header in the format: "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verify the ID token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach decoded token (contains uid, email, etc.) to the request
    next();
  } catch (error) {
    console.error('Firebase token verification error:', error);
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

module.exports = firebaseAuthMiddleware;
