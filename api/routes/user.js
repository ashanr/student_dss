const express = require('express');
const router = express.Router();

// GET user profile
router.get('/profile', (req, res) => {
    // Check if user is logged in via session
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    
    // In a real app, you'd fetch user data from database
    // For now, return mock data
    res.json({
        success: true,
        user: {
            id: req.session.userId,
            username: req.session.username,
            email: req.session.email,
            role: req.session.role || 'student',
            preferences: req.session.preferences || {}
        }
    });
});

// UPDATE user profile
router.put('/profile', (req, res) => {
    // Check if user is logged in via session
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    
    const { username, email } = req.body;
    
    // In a real app, you'd update user data in database
    // For now, just update session data
    if (username) req.session.username = username;
    if (email) req.session.email = email;
    
    res.json({
        success: true,
        message: 'Profile updated successfully',
        user: {
            id: req.session.userId,
            username: req.session.username,
            email: req.session.email,
            role: req.session.role || 'student'
        }
    });
});

// GET user preferences
router.get('/preferences', (req, res) => {
    // Check if user is logged in via session
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    
    // In a real app, you'd fetch this from database
    res.json({
        success: true,
        preferences: req.session.preferences || {}
    });
});

// UPDATE user preferences
router.put('/preferences', (req, res) => {
    // Check if user is logged in via session
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    
    const preferences = req.body;
    
    // In a real app, you'd update this in database
    req.session.preferences = preferences;
    
    res.json({
        success: true,
        message: 'Preferences updated successfully',
        preferences
    });
});

module.exports = router;
