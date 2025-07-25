const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

class Country {
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM countries');
            return result.rows;
        } catch (error) {
            console.error('Error in Country.findAll:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM countries WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in Country.findById:', error);
            throw error;
        }
    }

    static async findByName(name) {
        try {
            const result = await pool.query('SELECT * FROM countries WHERE name = $1', [name]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in Country.findByName:', error);
            throw error;
        }
    }
}

module.exports = Country;
        type: Number,
        min: 0,
        max: 10
    },
    visaEase: {
        type: String,
        enum: ['Easy', 'Moderate', 'Difficult']
    },
    highlights: [String],
    language: String,
    currencyCode: String,
    averageTuition: Number,
    averageLiving: Number,
    immigrationPath: Boolean,
    populationMillions: Number,
    gdpPerCapita: Number,
    topUniversities: Number,
    workRights: String,
    postStudyWork: Boolean,
    scholarships: [String],
    visaProcess: String,
    visaSuccessRate: Number
}, { timestamps: true });

module.exports = mongoose.model('Country', CountrySchema);
      }
    },
    costOfLivingIndex: Number // 0-100 scale
  },
  immigrationData: {
    studentVisa: {
      ease: Number, // 0-100 scale (higher is easier)
      processingTime: Number, // in weeks
      cost: Number,
      currency: {
        type: String,
        default: 'USD'
      },
      workRights: {
        allowed: Boolean,
        hoursPerWeek: Number
      },
      validity: Number // in months
    },
    postStudyWork: {
      available: Boolean,
      duration: Number, // in months
      restrictions: [String]
    },
    pathToPR: {
      available: Boolean,
      requirements: [String],
      timeframe: Number // in years
    }
  },
  safetyData: {
    safetyIndex: Number, // 0-100 scale
    healthcareQuality: Number, // 0-100 scale
    politicalStability: Number // 0-100 scale
  },
  culturalData: {
    culturalDiversityIndex: Number, // 0-100 scale
    openness: Number, // 0-100 scale
    studentLifeQuality: Number // 0-100 scale
  },
  scholarships: {
    governmentFunded: Boolean,
    meritBased: Boolean,
    needBased: Boolean,
    internationalStudents: Boolean
  },
  employmentData: {
    postGraduation: {
      employmentRate: Number, // percentage
      averageSalary: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    highDemandFields: [String],
    internationalGraduateHireRate: Number // percentage
  },
  digitalInfrastructure: {
    internetPenetration: Number, // percentage
    averageSpeed: Number, // Mbps
    technologicalAdvancement: Number // 0-100 scale
  },
  climateData: {
    type: [String],
    averageTemperature: Number, // in Celsius
    rainyDays: Number // per year
  },
  description: String,
  strengths: [String],
  weaknesses: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Country', countrySchema);
