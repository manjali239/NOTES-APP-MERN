const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // Check for the Authorization header
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // Extract the token
  const token = authorization.split(' ')[1];

  try {
    // Verify the token
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Fetch the user and attach it to the request object
    const user = await User.findOne({ _id }).select('_id');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // Attach the user to the request
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
