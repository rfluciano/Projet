const jwt = require('jsonwebtoken');
const db = require('../models');

const Membres = db.membres;

const verifyToken = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, 'votre_clé_secrète');

    // Find user by ID
    const membre = await Membres.findByPk(decoded.id);

    // Attach user to req object
    req.user = membre;

    // Move to the next middleware
    next();
  } catch (error) {
    // Handle invalid token
    console.error('Token verification failed:', error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = verifyToken;
