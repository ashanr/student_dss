const express = require('express');
const router = express.Router();

// Sample country data (replace with database integration)
const countries = [
    {
        id: 'canada',
        name: 'Canada',
        flag: '🇨🇦',
        region: 'north-america',
        score: 92,
        cost: 45000,
        quality: 8.8,
        safety: 9.0,
        visaEase: 'Moderate',
        highlights: ['Strong Job Market', 'High QoL', 'Moderate Cost']
    },
    {
        id: 'germany',
        name: 'Germany',
        flag: '🇩🇪',
        region: 'europe',
        score: 89,
        cost: 25000,
        quality: 8.5,
        safety: 8.7,
        visaEase: 'Easy',
        highlights: ['Low Cost', 'Strong Engineering', 'EU Access']
    },
    {
        id: 'australia',
        name: 'Australia',
        flag: '🇦🇺',
        region: 'asia-pacific',
        score: 87,
        cost: 40000,
        quality: 8.6,
        safety: 8.9,
        visaEase: 'Moderate',
        highlights: ['Quality Education', 'High QoL', 'English Speaking']
    },
    {
        id: 'uk',
        name: 'United Kingdom',
        flag: '🇬🇧',
        region: 'europe',
        score: 86,
        cost: 50000,
        quality: 9.0,
        safety: 8.5,
        visaEase: 'Moderate',
        highlights: ['Top Universities', 'Cultural Experience', 'English Speaking']
    },
    {
        id: 'usa',
        name: 'United States',
        flag: '🇺🇸',
        region: 'north-america',
        score: 85,
        cost: 60000,
        quality: 9.2,
        safety: 7.8,
        visaEase: 'Difficult',
        highlights: ['Top Universities', 'Research Opportunities', 'Career Growth']
    }
];

// Get all countries
router.get('/', (req, res) => {
    res.json(countries);
});

// Get country by ID
router.get('/:id', (req, res) => {
    const country = countries.find(c => c.id === req.params.id);
    
    if (!country) {
        return res.status(404).json({ message: 'Country not found' });
    }
    
    res.json(country);
});

// Get filtered countries
router.post('/filter', (req, res) => {
    const { region, maxBudget } = req.body;
    
    let filteredCountries = [...countries];
    
    if (region && region !== 'all') {
        filteredCountries = filteredCountries.filter(c => c.region === region);
    }
    
    if (maxBudget) {
        filteredCountries = filteredCountries.filter(c => c.cost <= maxBudget);
    }
    
    res.json(filteredCountries);
});

module.exports = router;
