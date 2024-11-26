const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Add user info to the request
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid Token' });
    }
};

module.exports = authenticateToken;
