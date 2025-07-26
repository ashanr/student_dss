/**
 * Script to import university and country data into the database
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const universityData = require('../data/university-data');
const countryData = require('../data/country-data');
const { getDbPath } = require('../db/connection');

async function importData() {
  const db = new sqlite3.Database(getDbPath());
  
  try {
    // Enable foreign keys
    await run(db, 'PRAGMA foreign_keys = ON');

    console.log('Importing country data...');
    // Clear existing country data
    await run(db, 'DELETE FROM countries');
    
    // Insert country data
    for (const country of countryData) {
      await run(db, `
        INSERT INTO countries (id, name, flag, region, score, cost, quality, safety, visa_ease, highlights, language, currency_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
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
        country.currency_code
      ]);
    }
    
    console.log('Importing university data...');
    // Clear existing university data
    await run(db, 'DELETE FROM universities');
    
    // Insert university data
    let count = 0;
    for (const uni of universityData) {
      await run(db, `
        INSERT INTO universities (
          id, name, country, city, ranking_global, ranking_national,
          tuition_fees_domestic_undergraduate, tuition_fees_domestic_graduate,
          tuition_fees_international_undergraduate, tuition_fees_international_graduate,
          acceptance_rate, student_faculty_ratio, website
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        uni.id,
        uni.name,
        uni.country,
        uni.city,
        uni.ranking_global,
        uni.ranking_national,
        uni.tuition_fees_domestic_undergraduate,
        uni.tuition_fees_domestic_graduate,
        uni.tuition_fees_international_undergraduate,
        uni.tuition_fees_international_graduate,
        uni.acceptance_rate,
        uni.student_faculty_ratio,
        uni.website
      ]);
      
      count++;
      if (count % 100 === 0) {
        console.log(`Imported ${count} universities...`);
      }
    }
    
    console.log(`Import complete. Imported ${countryData.length} countries and ${universityData.length} universities.`);
  } catch (err) {
    console.error('Error importing data:', err);
  } finally {
    db.close();
  }
}

// Helper function to promisify db.run
function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

// Run the import
importData().catch(console.error);
