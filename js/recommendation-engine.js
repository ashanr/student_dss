const criteriaWeights = {
  // Academic factors
  fieldOfStudy: 0.20,        // Program match to desired field
  degreeLevel: 0.15,         // Match with desired degree level
  universityRanking: 0.10,   // University prestige/ranking
  
  // Financial factors
  tuitionCost: 0.25,         // Tuition affordability 
  livingCost: 0.10,          // Cost of living
  
  // Practical factors
  languageMatch: 0.10,       // Language compatibility
  locationPreference: 0.10   // Geographic preference match
};

function calculateUniversityScore(university, userPreferences) {
  let totalScore = 0;
  
  // Calculate program match score
  const programMatchScore = calculateProgramMatch(university.programs, userPreferences.fieldOfStudy);
  totalScore += programMatchScore * criteriaWeights.fieldOfStudy;
  
  // Calculate degree level match
  const degreeLevelMatch = university.programs.some(p => p.level === userPreferences.degreeLevel) ? 1 : 0;
  totalScore += degreeLevelMatch * criteriaWeights.degreeLevel;
  
  // Calculate ranking score (higher ranking = lower number = better)
  const rankingScore = calculateRankingScore(university.ranking_global);
  totalScore += rankingScore * criteriaWeights.universityRanking;
  
  // Calculate financial scores
  const tuitionScore = calculateAffordabilityScore(university.tuition_fees_international_undergraduate, 
                                                  userPreferences.budget.tuition);
  totalScore += tuitionScore * criteriaWeights.tuitionCost;
  
  // ...other criteria calculations...
  
  return Math.round(totalScore * 100); // Return as percentage
}
