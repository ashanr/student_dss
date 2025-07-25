const express = require('express');
const router = express.Router();
const University = require('../models/University');
const Program = require('../models/Program');

// Get all universities with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const country = req.query.country;
    const field = req.query.field;
    const level = req.query.level;
    const rankingMax = parseInt(req.query.rankingMax) || 1000;
    const tuitionMax = parseInt(req.query.tuitionMax) || 100000;
    
    const filter = {};
    
    if (country) filter.country = country;
    if (field) filter['programs.field'] = field;
    if (level) filter['programs.level'] = level;
    if (rankingMax) filter['ranking.global'] = { $lte: rankingMax };
    
    const universities = await University.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ 'ranking.global': 1 });
      
    const totalCount = await University.countDocuments(filter);
    
    res.json({
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      data: universities
    });
  } catch (err) {
    console.error('Error fetching universities:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get university by ID
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    
    // Get programs for this university
    const programs = await Program.find({ university: req.params.id });
    
    res.json({
      university,
      programs
    });
  } catch (err) {
    console.error('Error fetching university:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search universities
router.post('/search', async (req, res) => {
  try {
    const {
      countries,
      fields,
      levels,
      maxTuition,
      minRanking,
      language,
      page = 1,
      limit = 20
    } = req.body;
    
    const skip = (page - 1) * limit;
    const filter = {};
    
    // Build filter based on search criteria
    if (countries && countries.length > 0) {
      filter.country = { $in: countries };
    }
    
    if (fields && fields.length > 0) {
      filter['programs.field'] = { $in: fields };
    }
    
    if (levels && levels.length > 0) {
      filter['programs.level'] = { $in: levels };
    }
    
    if (maxTuition) {
      filter['tuitionFees.international.undergraduate'] = { $lte: maxTuition };
    }
    
    if (minRanking) {
      filter['ranking.global'] = { $lte: minRanking };
    }
    
    if (language) {
      filter['programs.language'] = language;
    }
    
    const universities = await University.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ 'ranking.global': 1 });
      
    const totalCount = await University.countDocuments(filter);
    
    res.json({
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      data: universities
    });
  } catch (err) {
    console.error('Error searching universities:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
