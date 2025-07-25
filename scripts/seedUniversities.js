require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

// Import models
const University = require('../models/University');

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/studentDSS';

// List of countries with realistic country data
const countries = [
  { name: 'United States', region: 'north-america', cities: ['New York', 'Boston', 'Chicago', 'Los Angeles', 'San Francisco', 'Austin', 'Seattle', 'Atlanta', 'Philadelphia', 'Miami'] },
  { name: 'Canada', region: 'north-america', cities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Calgary', 'Edmonton', 'Quebec City', 'Winnipeg', 'Halifax'] },
  { name: 'United Kingdom', region: 'europe', cities: ['London', 'Oxford', 'Cambridge', 'Edinburgh', 'Manchester', 'Bristol', 'Glasgow', 'Birmingham', 'Leeds'] },
  { name: 'Germany', region: 'europe', cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Heidelberg', 'Dresden', 'Cologne', 'Stuttgart', 'Aachen'] },
  { name: 'France', region: 'europe', cities: ['Paris', 'Lyon', 'Toulouse', 'Grenoble', 'Marseille', 'Bordeaux', 'Strasbourg', 'Nice', 'Montpellier'] },
  { name: 'Australia', region: 'asia-pacific', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Gold Coast', 'Newcastle', 'Wollongong'] },
  { name: 'Japan', region: 'asia', cities: ['Tokyo', 'Kyoto', 'Osaka', 'Fukuoka', 'Sapporo', 'Nagoya', 'Hiroshima', 'Sendai', 'Yokohama'] },
  { name: 'China', region: 'asia', cities: ['Beijing', 'Shanghai', 'Hong Kong', 'Guangzhou', 'Shenzhen', 'Nanjing', 'Wuhan', 'Xi\'an', 'Hangzhou'] },
  { name: 'Netherlands', region: 'europe', cities: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Leiden', 'Delft', 'Groningen', 'Maastricht', 'Eindhoven', 'Wageningen'] },
  { name: 'Singapore', region: 'asia-pacific', cities: ['Singapore'] },
  { name: 'Switzerland', region: 'europe', cities: ['Zurich', 'Geneva', 'Lausanne', 'Bern', 'Basel', 'Lugano', 'St. Gallen', 'Fribourg'] },
  { name: 'Sweden', region: 'europe', cities: ['Stockholm', 'Uppsala', 'Gothenburg', 'Lund', 'Umeå', 'Linköping', 'Malmö'] },
  { name: 'Italy', region: 'europe', cities: ['Rome', 'Milan', 'Bologna', 'Florence', 'Turin', 'Naples', 'Padua', 'Pisa', 'Venice'] },
  { name: 'Spain', region: 'europe', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Granada', 'Salamanca', 'Bilbao', 'Santiago de Compostela'] },
  { name: 'South Korea', region: 'asia', cities: ['Seoul', 'Busan', 'Daejeon', 'Pohang', 'Ulsan', 'Daegu', 'Gwangju', 'Suwon'] },
  { name: 'India', region: 'asia', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Kanpur', 'Kharagpur'] },
  { name: 'Brazil', region: 'south-america', cities: ['Sao Paulo', 'Rio de Janeiro', 'Brasilia', 'Salvador', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'] },
  { name: 'Mexico', region: 'north-america', cities: ['Mexico City', 'Monterrey', 'Guadalajara', 'Puebla', 'Querétaro', 'Merida'] },
  { name: 'Denmark', region: 'europe', cities: ['Copenhagen', 'Aarhus', 'Aalborg', 'Odense', 'Roskilde'] },
  { name: 'Finland', region: 'europe', cities: ['Helsinki', 'Espoo', 'Tampere', 'Turku', 'Oulu', 'Jyväskylä'] }
];

// Common fields of study
const fields = [
  'Computer Science',
  'Engineering',
  'Business Administration',
  'Medicine',
  'Law',
  'Economics',
  'Architecture',
  'Arts',
  'Physics',
  'Chemistry',
  'Biology',
  'Mathematics',
  'Psychology',
  'Sociology',
  'Political Science',
  'Education',
  'Environmental Science',
  'Public Health',
  'Data Science',
  'Media Studies'
];

// Facilities commonly found at universities
const facilities = [
  'Library',
  'Sports Center',
  'Research Labs',
  'Student Housing',
  'Medical Center',
  'Cafeterias',
  'Wi-Fi',
  'Computer Labs',
  'Career Services',
  'Counseling Services',
  'Study Abroad Office',
  'Language Center',
  'Art Gallery',
  'Theater',
  'Music Rooms',
  'Innovation Hub'
];

// Generate university names
function generateUniversityName(city, country, index) {
  const types = [
    `University of ${city}`,
    `${city} University`,
    `${country} University of ${faker.word.adjective()}`,
    `${city} Institute of Technology`,
    `${city} College`,
    `${faker.word.adjective()} University of ${city}`,
    `${faker.word.adjective()} ${country} University`,
    `${faker.company.name()} University`,
    `${city} ${faker.word.noun()} University`,
    `${faker.person.lastName()} University`,
    `National University of ${country}`
  ];
  
  // Use modulo to cycle through name types
  return types[index % types.length];
}

// Function to generate university data
async function generateUniversities(count) {
  console.log(`Generating ${count} universities...`);
  const universities = [];
  
  // Distribute universities across countries
  for (let i = 0; i < count; i++) {
    // Select a random country, but weight it to make some countries have more universities
    const countryIndex = Math.floor(Math.pow(Math.random(), 1.5) * countries.length);
    const country = countries[countryIndex];
    
    // Select a random city from this country
    const city = faker.helpers.arrayElement(country.cities);
    
    // Generate programs (3-15 programs per university)
    const programCount = faker.number.int({ min: 3, max: 15 });
    const programs = [];
    
    for (let j = 0; j < programCount; j++) {
      programs.push(faker.helpers.arrayElement(fields));
    }
    
    // Create the university object
    const university = {
      name: generateUniversityName(city, country.name, i),
      country: country.name,
      city: city,
      ranking: {
        global: faker.number.int({ min: 1, max: 1000 }),
        national: faker.number.int({ min: 1, max: 100 })
      },
      tuitionFees: {
        domestic: {
          undergraduate: faker.number.int({ min: 1000, max: 30000 }),
          graduate: faker.number.int({ min: 2000, max: 40000 })
        },
        international: {
          undergraduate: faker.number.int({ min: 5000, max: 50000 }),
          graduate: faker.number.int({ min: 8000, max: 60000 })
        }
      },
      programs: programs,
      acceptance_rate: faker.number.float({ min: 0.05, max: 0.9, precision: 0.01 }),
      student_faculty_ratio: `${faker.number.int({ min: 5, max: 30 })}:1`,
      website: faker.internet.url(),
      facilities: faker.helpers.arrayElements(facilities, faker.number.int({ min: 3, max: 10 })),
      accommodation: {
        available: faker.datatype.boolean(),
        cost: faker.number.int({ min: 3000, max: 15000 })
      },
      scholarships: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => 
        `${faker.word.adjective()} ${faker.word.noun()} Scholarship`
      ),
      internationalStudents: faker.number.int({ min: 5, max: 50 }),
      imageUrl: faker.image.urlLoremFlickr({ category: 'university' }),
      description: faker.lorem.paragraphs(2)
    };
    
    universities.push(university);
    
    // Show progress
    if (i % 100 === 0) {
      console.log(`Generated ${i} universities...`);
    }
  }
  
  return universities;
}

// Connect to MongoDB and seed universities
async function seedUniversities() {
  try {
    console.log(`Connecting to MongoDB at: ${MONGO_URI}`);
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing university data
    console.log('Clearing existing university data...');
    await University.deleteMany({});
    
    // Generate universities
    const universities = await generateUniversities(1000);
    
    // Insert universities in batches to avoid overwhelming the database
    const batchSize = 100;
    let insertedCount = 0;
    
    for (let i = 0; i < universities.length; i += batchSize) {
      const batch = universities.slice(i, i + batchSize);
      await University.insertMany(batch);
      insertedCount += batch.length;
      console.log(`Inserted ${insertedCount} universities...`);
    }
    
    console.log(`Successfully inserted ${insertedCount} universities into MongoDB!`);
    
    // Perform a quick check
    const count = await University.countDocuments();
    console.log(`Database now contains ${count} universities.`);
    
    // Sample of countries and their university counts
    const countryCounts = await University.aggregate([
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log("\nUniversity distribution by country:");
    countryCounts.forEach(item => {
      console.log(`${item._id}: ${item.count} universities`);
    });
    
  } catch (error) {
    console.error('Error seeding universities:', error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedUniversities().catch(console.error);
