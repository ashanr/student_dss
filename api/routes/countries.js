const express = require('express');
const router = express.Router();
const Country = require('../../models/Country');

// Get all countries
router.get('/', async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (err) {
    console.error('Error fetching countries:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get country by ID
router.get('/:id', async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    res.json(country);
  } catch (err) {
    console.error('Error fetching country:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get filtered countries
router.post('/filter', async (req, res) => {
    try {
        const { region, maxBudget } = req.body;
        
        // Get all countries
        const allCountries = await Country.findAll();
        
        // Apply filters
        let filteredCountries = allCountries;
        
        if (region && region !== 'all') {
            filteredCountries = filteredCountries.filter(c => c.region === region);
        }
        
        if (maxBudget) {
            filteredCountries = filteredCountries.filter(c => c.cost <= maxBudget);
        }
        
        res.json(filteredCountries);
    } catch (err) {
        console.error('Error filtering countries:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
