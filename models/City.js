const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

class City {
  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM cities');
      return result.rows;
    } catch (error) {
      console.error('Error in City.findAll:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM cities WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in City.findById:', error);
      throw error;
    }
  }

  static async findByCountry(country) {
    try {
      const result = await pool.query('SELECT * FROM cities WHERE country = $1', [country]);
      return result.rows;
    } catch (error) {
      console.error('Error in City.findByCountry:', error);
      throw error;
    }
  }
}

module.exports = City;
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);
    transportation: {
      publicMonthlyPass: Number,
      singleTicket: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    utilities: {
      monthly: Number,
      internet: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    healthcare: {
      basic: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    }
  },
  qualityOfLife: {
    index: Number, // 0-100 scale
    safety: Number, // 0-100 scale
    healthcare: Number, // 0-100 scale
    pollution: Number, // 0-100 scale (lower is better)
    climate: {
      type: String,
      enum: ['Cold', 'Moderate', 'Warm', 'Hot', 'Tropical', 'Arid']
    },
    averageTemperature: Number // in Celsius
  },
  studentFriendly: {
    score: Number, // 0-100 scale
    hasDiscounts: Boolean,
    nightlife: Number, // 0-100 scale
    culturalActivities: Number // 0-100 scale
  },
  publicTransportation: {
    quality: Number, // 0-100 scale
    coverage: Number, // 0-100 scale
    types: [{
      type: String,
      enum: ['Bus', 'Train', 'Metro', 'Tram', 'Ferry', 'Bicycle']
    }]
  },
  visaRequirements: {
    difficulty: Number, // 0-100 scale (lower is easier)
    processingTime: Number, // in weeks
    workPermitAllowed: Boolean
  },
  languageEnvironment: {
    officialLanguage: String,
    englishProficiency: Number, // 0-100 scale
    otherCommonLanguages: [String]
  },
  imageUrl: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('City', citySchema);
