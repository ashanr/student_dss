const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

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

// API Routes
app.use('/api/auth', require('./api/routes/auth'));
app.use('/api/preferences', require('./api/routes/preferences'));
app.use('/api/countries', require('./api/routes/countries'));
app.use('/api/user', require('./api/routes/user'));

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
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
