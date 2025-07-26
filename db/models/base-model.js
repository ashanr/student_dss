/**
 * A more consistent base model that all models could extend
 */
class BaseModel {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
  }
  
  // Common CRUD operations
  async findById(id) {
    // Implementation
  }
  
  async findAll(options = {}) {
    // Implementation
  }
  
  // etc.
}

module.exports = BaseModel;
