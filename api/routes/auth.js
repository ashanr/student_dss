const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sample user data (replace with database integration)
const users = [
    {
        id: 1,
        username: 'admin',
        password: '$2a$10$JvCo4hj9qQdqJV3jNcAJSO6Zk3eOTvNs9h1LeqPheGr9JInRH9Fse', // 'admin' hashed with bcrypt
        role: 'admin'
    },
    {
        id: 2,
        username: 'guest',
        password: '$2a$10$CuxKQrJpS0Q8jK9CQkCnIOe8t6myi7fTjDpjzW7JuZEPEQTAqJiA6', // 'guest' hashed with bcrypt
        role: 'guest'
    }
];

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username);
    
    // If user doesn't exist
    if (!user) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid username or password' 
        });
    }

    // Check password
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ 
                success: false,
                message: 'Server error during authentication' 
            });
        }

        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid username or password' 
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            'jwt-secret-key',
            { expiresIn: '24h' }
        );

        // Set user in session
        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        // Return success with token and user info
        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Check auth status route
router.get('/status', (req, res) => {
    if (req.session.user) {
        res.json({
            isLoggedIn: true,
            user: req.session.user
        });
    } else {
        res.json({
            isLoggedIn: false
        });
    }
});

module.exports = router;
