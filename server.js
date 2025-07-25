const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const fs = require('fs');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'student-dss-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Serve static files
app.use(express.static(path.join(__dirname, './')));

// Authentication middleware
const checkAuth = (req, res, next) => {
    // Skip auth check for public routes
    const publicPaths = ['/', '/index.html', '/login.html', '/register.html', '/css', '/js', '/images', '/api/auth'];
    const isPublicPath = publicPaths.some(path => req.path.startsWith(path));
    
    if (isPublicPath) {
        return next();
    }
    
    // Check if user is logged in via session
    if (!req.session.user) {
        // User not logged in, redirect to decision page
        return res.redirect('/index.html?redirect=' + encodeURIComponent(req.path));
    }
    
    // User is logged in, proceed
    next();
};

// Apply auth middleware
app.use(checkAuth);

// API Routes
app.use('/api/auth', require('./api/routes/auth'));
app.use('/api/preferences', require('./api/routes/preferences'));
app.use('/api/countries', require('./api/routes/countries'));
app.use('/api/user', require('./api/routes/user'));

// Root route handler - Decision process
app.get('/', (req, res) => {
    // Check if user is already logged in
    if (req.session.user) {
        // Logged in users go to dashboard
        return res.redirect('/dashboard.html');
    }
    
    // Not logged in - serve the index page with decision process
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle specific pages that require authentication
app.get(['/dashboard.html', '/preferences.html', '/results.html', '/comparison.html', '/analytics.html'], (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login.html?redirect=' + encodeURIComponent(req.path));
    }
    res.sendFile(path.join(__dirname, req.path));
});

// Fallback route - serve requested file or index for SPA support
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, req.path);
    
    // Try to serve the requested file
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return res.sendFile(filePath);
    }
    
    // Default to index.html for SPA support
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MongoDB connection (uncomment and modify when ready to connect to DB)
/*
mongoose.connect('mongodb://localhost:27017/studentDSS', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
*/

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
