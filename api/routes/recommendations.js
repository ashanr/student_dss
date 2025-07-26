// Get personalized recommendations
router.get('/', auth, async (req, res) => {
  try {
    // Get user preferences from database
    const userPreferences = await UserPreference.findByUserId(req.user.id);
    
    // Get universities that match basic criteria
    const matchingUniversities = await University.find({
      country: { $in: userPreferences.preferences.regions || ['all'] },
      // Other basic filtering criteria
    });
    
    // Apply recommendation algorithm
    const recommendationService = new RecommendationService();
    const recommendations = recommendationService.generateRecommendations(
      matchingUniversities,
      userPreferences
    );
    
    // Return top recommendations
    res.json({
      success: true,
      recommendations: recommendations.slice(0, 20) // Top 20
    });
  } catch (err) {
    console.error('Error generating recommendations:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
