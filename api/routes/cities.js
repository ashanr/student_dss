const express = require('express');
const router = express.Router();
const City = require('../../models/City');

// Get all cities with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const country = req.query.country;
    const region = req.query.region;
    const costMax = parseInt(req.query.costMax);
    const climate = req.query.climate;
    
    const filter = {};
    
    if (country) filter.country = country;
    if (region) filter.region = region;
    if (climate) filter['qualityOfLife.climate'] = climate;
    if (costMax) filter['costOfLiving.index'] = { $lte: costMax };
    
    const cities = await City.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ 'costOfLiving.index': 1 });
      
    const totalCount = await City.countDocuments(filter);
    
    res.json({
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      data: cities
    });
  } catch (err) {
    console.error('Error fetching cities:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get city by ID
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    
    res.json(city);
  } catch (err) {
    console.error('Error fetching city:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Compare cities
router.post('/compare', async (req, res) => {
  try {
    const { cityIds } = req.body;
    
    if (!cityIds || !Array.isArray(cityIds) || cityIds.length < 2) {
      return res.status(400).json({ message: 'Please provide at least two city IDs for comparison' });
    }
    
    const cities = await City.find({ _id: { $in: cityIds } });
    
    if (cities.length !== cityIds.length) {
      return res.status(404).json({ message: 'One or more cities not found' });
    }
    
    res.json({
      comparison: cities,
      summary: {
        costRanking: cities.map(city => ({
          id: city._id,
          name: city.name,
          country: city.country,
          costIndex: city.costOfLiving.index
        })).sort((a, b) => a.costIndex - b.costIndex),
        
        qualityRanking: cities.map(city => ({
          id: city._id,
          name: city.name,
          country: city.country,
          qualityIndex: city.qualityOfLife.index
        })).sort((a, b) => b.qualityIndex - a.qualityIndex),
        
        studentFriendlyRanking: cities.map(city => ({
          id: city._id,
          name: city.name,
          country: city.country,
          studentFriendlyScore: city.studentFriendly.score
        })).sort((a, b) => b.studentFriendlyScore - a.studentFriendlyScore)
      }
    });
  } catch (err) {
    console.error('Error comparing cities:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get cities by cost of living ranges
router.get('/cost-ranges/:country', async (req, res) => {
  try {
    const country = req.params.country;
    
    if (!country) {
      return res.status(400).json({ message: 'Country parameter is required' });
    }
    
    const cities = await City.find({ country }).select('name costOfLiving');
    
    // Group cities by cost ranges
    const ranges = {
      low: cities.filter(city => city.costOfLiving.index < 60),
      medium: cities.filter(city => city.costOfLiving.index >= 60 && city.costOfLiving.index < 80),
      high: cities.filter(city => city.costOfLiving.index >= 80)
    };
    
    res.json({
      country,
      ranges
    });
  } catch (err) {
    console.error('Error fetching city cost ranges:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
