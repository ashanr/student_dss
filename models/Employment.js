const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

class Employment {
  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM employment WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in Employment.findById:', error);
      throw error;
    }
  }

  static async find(filter = {}) {
    try {
      let query = 'SELECT * FROM employment WHERE 1=1';
      const values = [];
      let valueIndex = 1;
      
      if (filter.country) {
        query += ` AND country = $${valueIndex}`;
        values.push(filter.country);
        valueIndex++;
      }
      
      if (filter.field) {
        query += ` AND field = $${valueIndex}`;
        values.push(filter.field);
        valueIndex++;
      }
      
      if (filter.city) {
        query += ` AND city = $${valueIndex}`;
        values.push(filter.city);
        valueIndex++;
      }
      
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error in Employment.find:', error);
      throw error;
    }
  }
}

module.exports = Employment;
  growthRate: Number, // percentage
  skillsInDemand: [String],
  workVisa: {
    difficulty: Number, // 0-100 scale (lower is easier)
    durationAfterGraduation: Number, // in months
    pathToPermanentResidency: Boolean
  },
  topEmployers: [String],
  industrySize: {
    employees: Number,
    companies: Number
  },
  remoteWorkOpportunities: Number, // 0-100 scale
  contractTypes: {
    permanent: Number, // percentage
    contract: Number, // percentage
    internship: Number // percentage
  },
  sourceUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Employment', employmentSchema);
