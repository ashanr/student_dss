const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

class Program {
  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM programs WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in Program.findById:', error);
      throw error;
    }
  }

  static async find(filter = {}, skip = 0, limit = 20) {
    try {
      let query = 'SELECT * FROM programs WHERE 1=1';
      const values = [];
      let valueIndex = 1;
      
      if (filter.university_id) {
        query += ` AND university_id = $${valueIndex}`;
        values.push(filter.university_id);
        valueIndex++;
      }
      
      if (filter.field) {
        query += ` AND field = $${valueIndex}`;
        values.push(filter.field);
        valueIndex++;
      }
      
      if (filter.level) {
        query += ` AND level = $${valueIndex}`;
        values.push(filter.level);
        valueIndex++;
      }
      
      query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
      values.push(limit, skip);
      
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error in Program.find:', error);
      throw error;
    }
  }
  
  static async countDocuments(filter = {}) {
    try {
      let query = 'SELECT COUNT(*) FROM programs WHERE 1=1';
      const values = [];
      let valueIndex = 1;
      
      if (filter.university_id) {
        query += ` AND university_id = $${valueIndex}`;
        values.push(filter.university_id);
        valueIndex++;
      }
      
      if (filter.field) {
        query += ` AND field = $${valueIndex}`;
        values.push(filter.field);
        valueIndex++;
      }
      
      if (filter.level) {
        query += ` AND level = $${valueIndex}`;
        values.push(filter.level);
        valueIndex++;
      }
      
      const result = await pool.query(query, values);
      return parseInt(result.rows[0].count);
    } catch (error) {
      console.error('Error in Program.countDocuments:', error);
      throw error;
    }
  }
}

module.exports = Program;
      currency: {
        type: String,
        default: 'USD'
      }
    },
    topEmployers: [String]
  },
  ranking: {
    national: Number,
    global: Number,
    source: String
  },
  accreditation: [String],
  scholarships: [{
    name: String,
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    criteria: String
  }],
  studentSatisfaction: Number, // 0-100 scale
  imageUrl: String,
  programUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Program', programSchema);
  }],
  studentSatisfaction: Number, // 0-100 scale
  imageUrl: String,
  programUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Program', programSchema);
