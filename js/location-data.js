/**
 * Comprehensive location data for Student DSS
 * Contains detailed information about cities and universities for the results page
 */

// City data with details about cost of living, quality of life, and student amenities
const citiesData = {
    // Canada Cities
    "toronto": {
        name: "Toronto",
        country: "canada",
        country_name: "Canada",
        population: 2930000,
        costOfLiving: {
            index: 72, // 0-100 scale
            currency: "CAD",
            monthlyExpenses: {
                accommodation: 1500, // Average in USD
                food: 400,
                transport: 150,
                utilities: 120,
                internet: 60,
                entertainment: 200
            },
            comparisonToUS: 0.85 // Compared to average US city
        },
        qualityOfLife: {
            index: 87, // 0-100 scale
            safety: 85,
            healthcare: 89,
            climate: "Continental",
            averageTemperature: 8 // Celsius
        },
        studentLife: {
            studentFriendly: 92,
            internationalCommunity: 90,
            nightlife: 88,
            culturalAttractionsCount: 250,
            universityCount: 5,
            studentDiscounts: "Widely available",
            topUniversities: ["uoft", "yorku", "ryerson"]
        },
        employmentProspects: {
            jobMarket: 85,
            avgGraduateSalary: 62000, // USD per year
            internshipOpportunities: "Abundant",
            topIndustries: ["Finance", "Technology", "Media", "Healthcare"]
        },
        image: "toronto.jpg",
        description: "Toronto is Canada's largest city and a major global hub for business, finance, arts, and culture. With exceptional diversity, it offers students a vibrant, safe environment with excellent career opportunities."
    },
    "vancouver": {
        name: "Vancouver",
        country: "canada",
        country_name: "Canada",
        population: 675218,
        costOfLiving: {
            index: 78,
            currency: "CAD",
            monthlyExpenses: {
                accommodation: 1600,
                food: 420,
                transport: 100,
                utilities: 110,
                internet: 60,
                entertainment: 200
            },
            comparisonToUS: 0.9
        },
        qualityOfLife: {
            index: 92,
            safety: 87,
            healthcare: 90,
            climate: "Oceanic",
            averageTemperature: 11
        },
        studentLife: {
            studentFriendly: 90,
            internationalCommunity: 92,
            nightlife: 85,
            culturalAttractionsCount: 150,
            universityCount: 3,
            studentDiscounts: "Widely available",
            topUniversities: ["ubc", "sfu"]
        },
        employmentProspects: {
            jobMarket: 83,
            avgGraduateSalary: 60000,
            internshipOpportunities: "Good",
            topIndustries: ["Film & Media", "Technology", "Tourism", "Green Energy"]
        },
        image: "vancouver.jpg",
        description: "Vancouver consistently ranks as one of the world's most livable cities with stunning natural beauty, mild climate, and a relaxed lifestyle combined with urban amenities."
    },
    "montreal": {
        name: "Montreal",
        country: "canada",
        country_name: "Canada",
        population: 1780000,
        costOfLiving: {
            index: 65,
            currency: "CAD",
            monthlyExpenses: {
                accommodation: 1100,
                food: 380,
                transport: 90,
                utilities: 115,
                internet: 55,
                entertainment: 180
            },
            comparisonToUS: 0.75
        },
        qualityOfLife: {
            index: 88,
            safety: 84,
            healthcare: 87,
            climate: "Continental",
            averageTemperature: 7
        },
        studentLife: {
            studentFriendly: 95,
            internationalCommunity: 88,
            nightlife: 92,
            culturalAttractionsCount: 200,
            universityCount: 4,
            studentDiscounts: "Extensive",
            topUniversities: ["mcgill", "udem", "concordia"]
        },
        employmentProspects: {
            jobMarket: 80,
            avgGraduateSalary: 58000,
            internshipOpportunities: "Abundant",
            topIndustries: ["Gaming", "AI", "Aerospace", "Arts & Culture"]
        },
        image: "montreal.jpg",
        description: "Montreal offers a unique blend of European charm and North American lifestyle with affordable living costs, vibrant arts scene, and excellent universities in both English and French."
    },

    // Germany Cities
    "berlin": {
        name: "Berlin",
        country: "germany",
        country_name: "Germany",
        population: 3670000,
        costOfLiving: {
            index: 62,
            currency: "EUR",
            monthlyExpenses: {
                accommodation: 850,
                food: 300,
                transport: 80,
                utilities: 200,
                internet: 30,
                entertainment: 200
            },
            comparisonToUS: 0.7
        },
        qualityOfLife: {
            index: 84,
            safety: 82,
            healthcare: 91,
            climate: "Continental",
            averageTemperature: 10
        },
        studentLife: {
            studentFriendly: 94,
            internationalCommunity: 90,
            nightlife: 95,
            culturalAttractionsCount: 300,
            universityCount: 4,
            studentDiscounts: "Extensive",
            topUniversities: ["tuberlin", "fuberlin", "huberlin"]
        },
        employmentProspects: {
            jobMarket: 85,
            avgGraduateSalary: 52000,
            internshipOpportunities: "Abundant",
            topIndustries: ["Technology", "Startups", "Creative Industries", "Research"]
        },
        image: "berlin.jpg",
        description: "Berlin is Germany's vibrant capital with affordable living costs, cutting-edge arts scene, and thriving startup ecosystem. The city offers students nearly tuition-free education and excellent quality of life."
    },
    "munich": {
        name: "Munich",
        country: "germany",
        country_name: "Germany",
        population: 1472000,
        costOfLiving: {
            index: 74,
            currency: "EUR",
            monthlyExpenses: {
                accommodation: 1100,
                food: 350,
                transport: 70,
                utilities: 190,
                internet: 35,
                entertainment: 220
            },
            comparisonToUS: 0.85
        },
        qualityOfLife: {
            index: 90,
            safety: 92,
            healthcare: 93,
            climate: "Continental",
            averageTemperature: 9
        },
        studentLife: {
            studentFriendly: 88,
            internationalCommunity: 85,
            nightlife: 85,
            culturalAttractionsCount: 180,
            universityCount: 3,
            studentDiscounts: "Very good",
            topUniversities: ["tum", "lmu"]
        },
        employmentProspects: {
            jobMarket: 92,
            avgGraduateSalary: 60000,
            internshipOpportunities: "Excellent",
            topIndustries: ["Automotive", "Engineering", "Technology", "Insurance"]
        },
        image: "munich.jpg",
        description: "Munich combines Bavarian tradition with high-tech innovation. The city offers excellent career prospects, particularly in engineering and technology, along with a high standard of living and beautiful surroundings."
    },

    // UK Cities
    "london": {
        name: "London",
        country: "uk",
        country_name: "United Kingdom",
        population: 8982000,
        costOfLiving: {
            index: 85,
            currency: "GBP",
            monthlyExpenses: {
                accommodation: 1700,
                food: 350,
                transport: 160,
                utilities: 190,
                internet: 30,
                entertainment: 250
            },
            comparisonToUS: 1.1
        },
        qualityOfLife: {
            index: 84,
            safety: 78,
            healthcare: 86,
            climate: "Maritime",
            averageTemperature: 11
        },
        studentLife: {
            studentFriendly: 90,
            internationalCommunity: 95,
            nightlife: 95,
            culturalAttractionsCount: 500,
            universityCount: 18,
            studentDiscounts: "Extensive",
            topUniversities: ["imperial", "ucl", "kingscollege"]
        },
        employmentProspects: {
            jobMarket: 88,
            avgGraduateSalary: 65000,
            internshipOpportunities: "Abundant",
            topIndustries: ["Finance", "Technology", "Media", "Law"]
        },
        image: "london.jpg",
        description: "London is a global center for education, finance, and culture. Despite high living costs, it offers unparalleled opportunities with world-class universities, diverse communities, and excellent career prospects."
    },

    // Australia Cities
    "melbourne": {
        name: "Melbourne",
        country: "australia",
        country_name: "Australia",
        population: 5078000,
        costOfLiving: {
            index: 75,
            currency: "AUD",
            monthlyExpenses: {
                accommodation: 1300,
                food: 400,
                transport: 150,
                utilities: 200,
                internet: 70,
                entertainment: 230
            },
            comparisonToUS: 0.95
        },
        qualityOfLife: {
            index: 96,
            safety: 90,
            healthcare: 92,
            climate: "Temperate oceanic",
            averageTemperature: 15
        },
        studentLife: {
            studentFriendly: 93,
            internationalCommunity: 93,
            nightlife: 92,
            culturalAttractionsCount: 230,
            universityCount: 7,
            studentDiscounts: "Good",
            topUniversities: ["unimelb", "monash"]
        },
        employmentProspects: {
            jobMarket: 87,
            avgGraduateSalary: 63000,
            internshipOpportunities: "Good",
            topIndustries: ["Education", "Healthcare", "Technology", "Creative Industries"]
        },
        image: "melbourne.jpg",
        description: "Melbourne is renowned for its cultural diversity, excellent universities, and high quality of life. The city is known for its coffee culture, arts scene, and has been regularly ranked among the world's most livable cities."
    },
    
    // Add more cities as needed...
};

// Enhanced university data that links to cities
const enhancedUniversitiesData = {
    // Canada Universities
    "uoft": {
        id: "uoft",
        name: "University of Toronto",
        country: "canada",
        countryName: "Canada",
        city: "toronto",
        cityName: "Toronto",
        ranking: 18,
        tuition: {
            international: {
                undergraduate: 45000,
                graduate: 42000
            },
            domestic: {
                undergraduate: 6000,
                graduate: 8500
            },
            currency: "CAD"
        },
        living: {
            onCampus: 16000,
            offCampus: 20000,
            currency: "CAD"
        },
        programs: ["Computer Science", "Engineering", "Business", "Medicine", "Arts", "Sciences"],
        popularPrograms: {
            "Computer Science": {
                ranking: 15,
                duration: "4 years",
                annualIntake: 850
            },
            "Engineering": {
                ranking: 23,
                duration: "4 years",
                annualIntake: 1200
            },
            "Business": {
                ranking: 20,
                duration: "4 years", 
                annualIntake: 700
            }
        },
        admissionStats: {
            rate: 43,
            averageGPA: 3.8,
            intlStudents: 25
        },
        features: ["Research Intensive", "Urban Campus", "Excellent Job Placement"],
        strengths: ["Research", "STEM", "Business"],
        website: "https://www.utoronto.ca",
        image: "uoft.jpg",
        description: "The University of Toronto is Canada's top-ranked university with a global reputation for excellence in research and teaching across a wide range of disciplines."
    },
    "mcgill": {
        id: "mcgill",
        name: "McGill University",
        country: "canada",
        countryName: "Canada",
        city: "montreal",
        cityName: "Montreal",
        ranking: 31,
        tuition: {
            international: {
                undergraduate: 40000,
                graduate: 38000
            },
            domestic: {
                undergraduate: 4500,
                graduate: 5800
            },
            currency: "CAD"
        },
        living: {
            onCampus: 14000,
            offCampus: 15000,
            currency: "CAD"
        },
        programs: ["Medicine", "Law", "Engineering", "Business", "Arts", "Sciences"],
        popularPrograms: {
            "Medicine": {
                ranking: 22,
                duration: "4-5 years",
                annualIntake: 180
            },
            "Law": {
                ranking: 25,
                duration: "3-4 years",
                annualIntake: 190
            },
            "Business": {
                ranking: 30,
                duration: "4 years",
                annualIntake: 500
            }
        },
        admissionStats: {
            rate: 46,
            averageGPA: 3.7,
            intlStudents: 30
        },
        features: ["Bilingual Environment", "Research Intensive", "Urban Campus"],
        strengths: ["Medicine", "Law", "Research"],
        website: "https://www.mcgill.ca",
        image: "mcgill.jpg",
        description: "McGill University offers a unique blend of academic excellence in a bilingual environment with a reputation for cutting-edge research, particularly in medicine and law."
    },
    
    // Germany Universities
    "tum": {
        id: "tum",
        name: "Technical University of Munich",
        country: "germany",
        countryName: "Germany",
        city: "munich",
        cityName: "Munich",
        ranking: 50,
        tuition: {
            international: {
                undergraduate: 3000,
                graduate: 3000
            },
            domestic: {
                undergraduate: 500,
                graduate: 500
            },
            currency: "EUR"
        },
        living: {
            onCampus: 8000,
            offCampus: 10500,
            currency: "EUR"
        },
        programs: ["Engineering", "Computer Science", "Mathematics", "Physics", "Chemistry", "Medicine"],
        popularPrograms: {
            "Engineering": {
                ranking: 24,
                duration: "3-4 years",
                annualIntake: 2000
            },
            "Computer Science": {
                ranking: 32,
                duration: "3-4 years",
                annualIntake: 1200
            },
            "Physics": {
                ranking: 38,
                duration: "3 years",
                annualIntake: 600
            }
        },
        admissionStats: {
            rate: 70,
            averageGPA: 3.5,
            intlStudents: 26
        },
        features: ["Low Tuition", "Industry Connections", "English Programs"],
        strengths: ["Engineering", "Technical Sciences", "Innovation"],
        website: "https://www.tum.de/en/",
        image: "tum.jpg",
        description: "TUM is one of Europe's top technical universities, offering quality education at minimal tuition fees with strong connections to German industry and excellent research facilities."
    },
    
    // UK Universities
    "imperial": {
        id: "imperial",
        name: "Imperial College London",
        country: "uk",
        countryName: "United Kingdom",
        city: "london",
        cityName: "London",
        ranking: 7,
        tuition: {
            international: {
                undergraduate: 38000,
                graduate: 43000
            },
            domestic: {
                undergraduate: 9250,
                graduate: 14500
            },
            currency: "GBP"
        },
        living: {
            onCampus: 16000,
            offCampus: 20000,
            currency: "GBP"
        },
        programs: ["Engineering", "Medicine", "Science", "Business"],
        popularPrograms: {
            "Engineering": {
                ranking: 6,
                duration: "3-4 years",
                annualIntake: 1500
            },
            "Medicine": {
                ranking: 10,
                duration: "6 years",
                annualIntake: 300
            },
            "Computer Science": {
                ranking: 9,
                duration: "3-4 years",
                annualIntake: 400
            }
        },
        admissionStats: {
            rate: 14,
            averageGPA: 3.9,
            intlStudents: 60
        },
        features: ["Research Excellence", "London Location", "Industry Connections"],
        strengths: ["Engineering", "Medicine", "Sciences"],
        website: "https://www.imperial.ac.uk",
        image: "imperial.jpg",
        description: "Imperial College London specializes in science, engineering, medicine, and business, with a global reputation for excellence and innovation in both teaching and research."
    },
    
    // Australia Universities
    "unimelb": {
        id: "unimelb",
        name: "University of Melbourne",
        country: "australia",
        countryName: "Australia",
        city: "melbourne",
        cityName: "Melbourne",
        ranking: 37,
        tuition: {
            international: {
                undergraduate: 42000,
                graduate: 44000
            },
            domestic: {
                undergraduate: 9000,
                graduate: 12000
            },
            currency: "AUD"
        },
        living: {
            onCampus: 18000,
            offCampus: 20000,
            currency: "AUD"
        },
        programs: ["Business", "Law", "Medicine", "Engineering", "Arts", "Sciences"],
        popularPrograms: {
            "Business": {
                ranking: 28,
                duration: "3 years",
                annualIntake: 1200
            },
            "Medicine": {
                ranking: 14,
                duration: "4-6 years",
                annualIntake: 300
            },
            "Law": {
                ranking: 11,
                duration: "3-4 years",
                annualIntake: 400
            }
        },
        admissionStats: {
            rate: 70,
            averageGPA: 3.6,
            intlStudents: 40
        },
        features: ["Pathway to Permanent Residency", "Research Excellence", "Global Recognition"],
        strengths: ["Research", "Business", "Arts"],
        website: "https://www.unimelb.edu.au",
        image: "unimelb.jpg",
        description: "The University of Melbourne offers a unique curriculum allowing students to explore a variety of subjects before specializing, with exceptional research facilities and employment outcomes."
    }
    
    // Add more universities as needed...
};

// Export the data for use in other files
if (typeof module !== 'undefined') {
    module.exports = {
        citiesData,
        enhancedUniversitiesData
    };
}
