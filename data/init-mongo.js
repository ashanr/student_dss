// This script initializes the MongoDB database and creates collections

db = db.getSiblingDB('studentDSS');

// Create collections
db.createCollection('countries');
db.createCollection('universities');
db.createCollection('programs');
db.createCollection('cities');
db.createCollection('users');
db.createCollection('preferences');
db.createCollection('employment');

// Create indexes for better performance
db.countries.createIndex({ "name": 1 }, { unique: true });
db.universities.createIndex({ "name": 1 });
db.programs.createIndex({ "university": 1, "name": 1 });
db.cities.createIndex({ "country": 1, "name": 1 });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });

// Insert admin user for testing
db.users.insertOne({
  username: "admin",
  email: "admin@studentdss.com",
  password: "$2a$10$JvCo4hj9qQdqJV3jNcAJSO6Zk3eOTvNs9h1LeqPheGr9JInRH9Fse", // 'admin' hashed with bcrypt
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert guest user for testing
db.users.insertOne({
  username: "guest",
  email: "guest@studentdss.com",
  password: "$2a$10$CuxKQrJpS0Q8jK9CQkCnIOe8t6myi7fTjDpjzW7JuZEPEQTAqJiA6", // 'guest' hashed with bcrypt
  role: "guest",
  createdAt: new Date(),
  updatedAt: new Date()
});

print('MongoDB initialization complete!');
