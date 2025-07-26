/**
 * Database Population Script
 * This script populates the SQLite database with countries and cities data
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { getDbPath } = require('../db/connection');
const countryData = require('./country-data');
const universityData = require('./university-data');

// Function to get database connection
function getDb() {
  return new sqlite3.Database(getDbPath());
}

// Function to extract cities from university data
function extractCitiesFromUniversities() {
  const citiesMap = new Map();
  
  universityData.forEach(university => {
    if (university.city && university.country) {
      const cityKey = `${university.city.toLowerCase()}_${university.country.toLowerCase()}`;
      
      // Only add the city if we haven't seen it before
      if (!citiesMap.has(cityKey)) {
        citiesMap.set(cityKey, {
          name: university.city,
          country: university.country,
          // Default values for new cities
          cost_of_living_index: Math.floor(Math.random() * 100) + 50, // Random value between 50-150
          quality_of_life_index: Math.floor(Math.random() * 100) + 50,
          student_friendly_score: Math.floor(Math.random() * 10) + 1 // Score from 1-10
        });
      }
    }
  });
  
  return Array.from(citiesMap.values());
}

// Function to populate countries table
async function populateCountries() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO countries 
        (id, name, flag, region, score, cost, quality, safety, visa_ease, highlights, language, currency_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      let insertCount = 0;
      
      countryData.forEach(country => {
        stmt.run(
          country.id,
          country.name,
          country.flag,
          country.region,
          country.score,
          country.cost,
          country.quality,
          country.safety,
          country.visa_ease,
          JSON.stringify(country.highlights),
          country.language,
          country.currency_code,
          function(err) {
            if (err) {
              console.error(`Error inserting country ${country.name}:`, err);
            } else if (this.changes > 0) {
              insertCount++;
            }
          }
        );
      });
      
      stmt.finalize();
      
      db.run('COMMIT', function(err) {
        if (err) {
          console.error('Error committing country transaction:', err);
          db.run('ROLLBACK');
          db.close();
          reject(err);
        } else {
          console.log(`Successfully inserted ${insertCount} countries`);
          db.close();
          resolve(insertCount);
        }
      });
    });
  });
}

// Function to populate cities table
async function populateCities() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const cities = extractCitiesFromUniversities();
    
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO cities 
        (name, country, cost_of_living_index, quality_of_life_index, student_friendly_score)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      let insertCount = 0;
      
      cities.forEach(city => {
        stmt.run(
          city.name,
          city.country,
          city.cost_of_living_index,
          city.quality_of_life_index,
          city.student_friendly_score,
          function(err) {
            if (err) {
              console.error(`Error inserting city ${city.name}:`, err);
            } else if (this.changes > 0) {
              insertCount++;
            }
          }
        );
      });
      
      stmt.finalize();
      
      db.run('COMMIT', function(err) {
        if (err) {
          console.error('Error committing cities transaction:', err);
          db.run('ROLLBACK');
          db.close();
          reject(err);
        } else {
          console.log(`Successfully inserted ${insertCount} cities`);
          db.close();
          resolve(insertCount);
        }
      });
    });
  });
}

// Add popular cities from country data
async function addPopularCities() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const popularCities = [];
    
    // Extract popular cities from country data
    countryData.forEach(country => {
      if (country.popular_cities && Array.isArray(country.popular_cities)) {
        country.popular_cities.forEach(cityName => {
          popularCities.push({
            name: cityName,
            country: country.id,
            cost_of_living_index: Math.floor(Math.random() * 100) + 50,
            quality_of_life_index: Math.floor(Math.random() * 100) + 50,
            student_friendly_score: Math.floor(Math.random() * 10) + 1
          });
        });
      }
    });
    
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO cities 
        (name, country, cost_of_living_index, quality_of_life_index, student_friendly_score)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      let insertCount = 0;
      
      popularCities.forEach(city => {
        stmt.run(
          city.name,
          city.country,
          city.cost_of_living_index,
          city.quality_of_life_index,
          city.student_friendly_score,
          function(err) {
            if (err) {
              console.error(`Error inserting popular city ${city.name}:`, err);
            } else if (this.changes > 0) {
              insertCount++;
            }
          }
        );
      });
      
      stmt.finalize();
      
      db.run('COMMIT', function(err) {
        if (err) {
          console.error('Error committing popular cities transaction:', err);
          db.run('ROLLBACK');
          db.close();
          reject(err);
        } else {
          console.log(`Successfully inserted ${insertCount} popular cities`);
          db.close();
          resolve(insertCount);
        }
      });
    });
  });
}

// Main function to run the population script
async function populateDatabase() {
  try {
    console.log('Starting database population...');
    
    // Populate countries first
    console.log('Populating countries...');
    const countriesInserted = await populateCountries();
    
    // Populate cities from university data
    console.log('Populating cities from university data...');
    const citiesInserted = await populateCities();
    
    // Add popular cities from country data
    console.log('Adding popular cities from country data...');
    const popularCitiesInserted = await addPopularCities();
    
    console.log('Database population complete!');
    console.log(`Summary: ${countriesInserted} countries, ${citiesInserted + popularCitiesInserted} cities inserted`);
    
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

// Run the script
populateDatabase();
