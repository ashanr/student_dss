const express = require('express');
const router = express.Router();

// Sample preferences data (replace with database integration)
const userPreferences = {
    'admin': {
        academic: {
            studyLevel: 'master',
            fieldOfStudy: 'computer_science',
            rankingImportance: 7,
            programDuration: '2',
            researchImportance: 5
        },
        financial: {
            tuitionBudget: '30000',
            livingBudget: '1500',
            scholarshipImportance: 8,
            workStudy: true,
            roiImportance: 7
        },
        location: {
            regions: ['north-america', 'europe'],
            locationType: 'urban',
            climate: ['mild'],
            distancePreference: 5
        },
        lifestyle: {
            safetyImportance: 9,
            languagePreference: 'english_program',
            cultureImportance: 7,
            postGradPlans: 'work_host',
            healthcareImportance: 6
        },
        weights: {
            academic: 25,
            cost: 30,
            location: 15,
            lifestyle: 10,
            career: 20
        },
        lastUpdated: new Date()
    },
    'guest': {
        academic: {
            studyLevel: 'bachelor',
            fieldOfStudy: 'business',
            rankingImportance: 6,
            programDuration: '4',
            researchImportance: 3
        },
        financial: {
            tuitionBudget: '20000',
            livingBudget: '1000',
            scholarshipImportance: 9,
            workStudy: true,
            roiImportance: 8
        },
        location: {
            regions: ['europe', 'asia-pacific'],
            locationType: 'any',
            climate: ['warm'],
            distancePreference: 3
        },
        lifestyle: {
            safetyImportance: 8,
            languagePreference: 'english_only',
            cultureImportance: 6,
            postGradPlans: 'undecided',
            healthcareImportance: 7
        },
        weights: {
            academic: 20,
            cost: 35,
            location: 20,
            lifestyle: 15,
            career: 10
        },
        lastUpdated: new Date()
    }
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    next();
};

// Get user preferences
router.get('/', isAuthenticated, (req, res) => {
    const username = req.session.user.username;
    
    if (!userPreferences[username]) {
        return res.status(404).json({ message: 'No preferences found for this user' });
    }
    
    res.json(userPreferences[username]);
});

// Update user preferences
router.post('/', isAuthenticated, (req, res) => {
    const username = req.session.user.username;
    const preferences = req.body;
    
    if (!preferences) {
        return res.status(400).json({ message: 'No preference data provided' });
    }
    
    // Create new preferences object if none exists
    if (!userPreferences[username]) {
        userPreferences[username] = {};
    }
    
    // Update preferences with new data
    Object.keys(preferences).forEach(section => {
        userPreferences[username][section] = {
            ...userPreferences[username][section],
            ...preferences[section]
        };
    });
    
    // Update timestamp
    userPreferences[username].lastUpdated = new Date();
    
    res.json({ 
        success: true, 
        message: 'Preferences updated successfully',
        data: userPreferences[username]
    });
});

// Update specific preference section
router.post('/:section', isAuthenticated, (req, res) => {
    const username = req.session.user.username;
    const section = req.params.section;
    const data = req.body;
    
    if (!data) {
        return res.status(400).json({ message: 'No data provided' });
    }
    
    // Valid sections
    const validSections = ['academic', 'financial', 'location', 'lifestyle', 'weights'];
    
    if (!validSections.includes(section)) {
        return res.status(400).json({ message: 'Invalid preference section' });
    }
    
    // Create new preferences object if none exists
    if (!userPreferences[username]) {
        userPreferences[username] = {};
    }
    
    // Initialize section if it doesn't exist
    if (!userPreferences[username][section]) {
        userPreferences[username][section] = {};
    }
    
    // Update section with new data
    userPreferences[username][section] = {
        ...userPreferences[username][section],
        ...data
    };
    
    // Update timestamp
    userPreferences[username].lastUpdated = new Date();
    
    res.json({
        success: true,
        message: `${section} preferences updated successfully`,
        data: userPreferences[username][section]
    });
});

// Get recommendations based on preferences
router.get('/recommendations', isAuthenticated, (req, res) => {
    const username = req.session.user.username;
    
    if (!userPreferences[username]) {
        return res.status(404).json({ message: 'No preferences found for this user' });
    }
    
    // This would typically be a complex algorithm that compares user preferences
    // with country data to generate personalized recommendations.
    // For now, return a sample response
    
    res.json({
        success: true,
        recommendations: [
            {
                id: 'canada',
                name: 'Canada',
                match: 92,
                strengths: ['Education quality', 'Job prospects', 'Quality of life'],
                weaknesses: ['Higher cost', 'Weather']
            },
            {
                id: 'germany',
                name: 'Germany',
                match: 89,
                strengths: ['Low tuition', 'Strong economy', 'Work opportunities'],
                weaknesses: ['Language barrier', 'Housing competition']
            },
            {
                id: 'australia',
                name: 'Australia',
                match: 87,
                strengths: ['Quality education', 'English speaking', 'Lifestyle'],
                weaknesses: ['Distance', 'Cost of living']
            }
        ]
    });
});

module.exports = router;
