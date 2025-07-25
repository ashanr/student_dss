const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

class University {
  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM universities WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in University.findById:', error);
      throw error;
    }
  }
  
  static async find(filter = {}, skip = 0, limit = 20, sort = {}) {
    try {
      let query = 'SELECT * FROM universities WHERE 1=1';
      const values = [];
      let valueIndex = 1;
      
      // Build filter conditions
      if (filter.country) {
        query += ` AND country = $${valueIndex}`;
        values.push(filter.country);
        valueIndex++;
      }
      
      if (filter['ranking.global'] && filter['ranking.global'].$lte) {
        query += ` AND global_ranking <= $${valueIndex}`;
        values.push(filter['ranking.global'].$lte);
        valueIndex++;
      }
      
      // Add sorting
      if (sort['ranking.global'] === 1) {
        query += ' ORDER BY global_ranking ASC';
      }
      
      // Add pagination
      query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
      values.push(limit, skip);
      
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error in University.find:', error);
      throw error;
    }
  }
  
  static async countDocuments(filter = {}) {
    try {
      let query = 'SELECT COUNT(*) FROM universities WHERE 1=1';
      const values = [];
      let valueIndex = 1;
      
      // Build filter conditions
      if (filter.country) {
        query += ` AND country = $${valueIndex}`;
        values.push(filter.country);
        valueIndex++;
      }
      
      if (filter['ranking.global'] && filter['ranking.global'].$lte) {
        query += ` AND global_ranking <= $${valueIndex}`;
        values.push(filter['ranking.global'].$lte);
        valueIndex++;
      }
      
      const result = await pool.query(query, values);
      return parseInt(result.rows[0].count);
    } catch (error) {
      console.error('Error in University.countDocuments:', error);
      throw error;
    }
  }
}

module.exports = University;
  description: String,
  strengths: [String],
  weaknesses: [String],
  employmentRate: Number, // post-graduation employment rate
  averageSalary: {
    afterGraduation: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  scholarshipsAvailable: Boolean,
  applicationDeadlines: {
    fall: Date,
    spring: Date,
    summer: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('University', universitySchema);
