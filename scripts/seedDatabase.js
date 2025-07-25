require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

// Sample countries data
const countries = [
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'north-america',
    score: 92,
    cost: 45000,
    quality: 8.8,
    safety: 9.0,
    visaEase: 'Moderate',
    highlights: ['Strong Job Market', 'High QoL', 'Moderate Cost'],
    language: 'English',
    currencyCode: 'CAD',
    averageTuition: 25000,
    averageLiving: 15000,
    immigrationPath: true,
    populationMillions: 38,
    gdpPerCapita: 43400,
    topUniversities: 28,
    workRights: 'Allowed up to 20 hours/week during study',
    postStudyWork: true,
    scholarships: ['Canada Graduate Scholarships', 'Vanier Canada Graduate Scholarships'],
    visaProcess: 'Study Permit application required',
    visaSuccessRate: 0.85
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'europe',
    score: 89,
    cost: 25000,
    quality: 8.5,
    safety: 8.7,
    visaEase: 'Easy',
    highlights: ['Low Cost', 'Strong Engineering', 'EU Access'],
    language: 'German',
    currencyCode: 'EUR',
    averageTuition: 10000,
    averageLiving: 12000,
    immigrationPath: true,
    populationMillions: 83,
    gdpPerCapita: 46200,
    topUniversities: 30,
    workRights: 'Allowed up to 120 full days or 240 half days per year',
    postStudyWork: true,
    scholarships: ['DAAD Scholarships', 'Erasmus+'],
    visaProcess: 'National Visa (D) required from non-EU students',
    visaSuccessRate: 0.78
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'asia-pacific',
    score: 87,
    cost: 40000,
    quality: 8.6,
    safety: 8.9,
    visaEase: 'Moderate',
    highlights: ['Quality Education', 'High QoL', 'English Speaking'],
    language: 'English',
    currencyCode: 'AUD',
    averageTuition: 30000,
    averageLiving: 18000,
    immigrationPath: true,
    populationMillions: 25,
    gdpPerCapita: 51800,
    topUniversities: 20,
    workRights: 'Allowed up to 40 hours per fortnight during term',
    postStudyWork: true,
    scholarships: ['Australia Awards', 'Endeavour Leadership Program'],
    visaProcess: 'Student Visa (subclass 500)',
    visaSuccessRate: 0.80
  }
];

// Sample universities data
const universities = [
  {
    name: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto',
    ranking: {
      global: 18,
      national: 1
    },
    tuitionFees: {
      domestic: {
        undergraduate: 6000,
        graduate: 8000
      },
      international: {
        undergraduate: 45000,
        graduate: 50000
      }
    },
    programs: ['Computer Science', 'Engineering', 'Medicine', 'Business'],
    acceptance_rate: 0.43,
    student_faculty_ratio: '20:1',
    website: 'https://www.utoronto.ca/'
  },
  {
    name: 'Technical University of Munich',
    country: 'Germany',
    city: 'Munich',
    ranking: {
      global: 50,
      national: 1
    },
    tuitionFees: {
      domestic: {
        undergraduate: 500,
        graduate: 500
      },
      international: {
        undergraduate: 500,
        graduate: 500
      }
    },
    programs: ['Engineering', 'Computer Science', 'Physics', 'Mathematics'],
    acceptance_rate: 0.70,
    student_faculty_ratio: '28:1',
    website: 'https://www.tum.de/en/'
  },
  {
    name: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne',
    ranking: {
      global: 37,
      national: 1
    },
    tuitionFees: {
      domestic: {
        undergraduate: 9000,
        graduate: 12000
      },
      international: {
        undergraduate: 40000,
        graduate: 45000
      }
    },
    programs: ['Business', 'Law', 'Arts', 'Engineering', 'Medicine'],
    acceptance_rate: 0.60,
    student_faculty_ratio: '18:1',
    website: 'https://www.unimelb.edu.au/'
  }
];

// Function to seed countries
async function seedCountries() {
  try {
    console.log('Seeding countries...');
    // Clear existing data
    await pool.query('DELETE FROM countries');
    
    // Prepare values for insertion
    const values = countries.map(c => `('${c.id}', '${c.name}', '${c.flag}', '${c.region}', ${c.score}, ${c.cost}, ${c.quality}, ${c.safety}, '${c.visaEase}', ARRAY['${c.highlights.join("','")}'], '${c.language}', '${c.currencyCode}')`).join(', ');
    
    // Insert countries
    await pool.query(`INSERT INTO countries (id, name, flag, region, score, cost, quality, safety, visa_ease, highlights, language, currency_code) VALUES ${values}`);
    console.log(`Inserted ${countries.length} countries`);
    
    return countries;
  } catch (err) {
    console.error('Error seeding countries:', err);
    throw err;
  }
}

// Main function
async function seedDatabase() {
  try {
    console.log('Connecting to PostgreSQL...');
    await pool.connect();
    
    console.log('Connected to PostgreSQL');
    
    // Clear existing data
    await pool.query('DELETE FROM employment');
    await pool.query('DELETE FROM programs');
    await pool.query('DELETE FROM universities');
    await pool.query('DELETE FROM cities');
    await pool.query('DELETE FROM countries');
    
    console.log('Cleared existing data');
    
    // Seed countries
    await seedCountries();
    console.log(`Inserted ${countries.length} countries`);
    
    // Seed universities
    await pool.query('INSERT INTO universities (name, country, city, ranking_global, ranking_national, tuition_fees_domestic_undergraduate, tuition_fees_domestic_graduate, tuition_fees_international_undergraduate, tuition_fees_international_graduate, programs, acceptance_rate, student_faculty_ratio, website) VALUES ' +
      universities.map(u => `('${u.name}', '${u.country}', '${u.city}', ${u.ranking.global}, ${u.ranking.national}, ${u.tuitionFees.domestic.undergraduate}, ${u.tuitionFees.domestic.graduate}, ${u.tuitionFees.international.undergraduate}, ${u.tuitionFees.international.graduate}, '{${u.programs.join(',')}}', ${u.acceptance_rate}, '${u.student_faculty_ratio}', '${u.website}')`).join(', '));
    console.log(`Inserted ${universities.length} universities`);
    
    // Read and seed from CSV if file exists
    const csvFilePath = path.join(__dirname, '..', 'data', 'student_migration_data.csv');
    
    if (fs.existsSync(csvFilePath)) {
      console.log(`CSV file found at ${csvFilePath}`);
      const studentData = [];
      
      await new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on('data', (data) => studentData.push(data))
          .on('end', async () => {
            console.log(`Read ${studentData.length} records from CSV`);
            resolve();
          })
          .on('error', (error) => {
            console.error('Error reading CSV:', error);
            reject(error);
          });
      });
      
      if (studentData.length > 0) {
        // Process student data and create additional records as needed
        console.log('Processing student data...');
        
        // Example: Extract and insert employment data
        const employmentData = studentData.map(student => ({
          country: student.final_destination_country || 'Unknown',
          field: student.intended_career_field || 'General',
          jobMarketScore: parseInt(student.job_market_priority) || 5,
          salaryRange: {
            min: 40000,
            max: 80000,
            currency: 'USD'
          },
          employmentRate: Math.random() * 0.3 + 0.7, // Random between 70-100%
          workPermit: student.final_destination_country === 'Canada' || 
                    student.final_destination_country === 'Australia' ? true : false,
          postStudyOptions: student.post_study_work_priority > 5 ? 'Excellent' : 'Good'
        }));
        
        if (employmentData.length > 0) {
          await Employment.insertMany(employmentData);
          console.log(`Inserted ${employmentData.length} employment records`);
        }
      }
    } else {
      console.log(`CSV file not found at ${csvFilePath}`);
    }
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close the PostgreSQL connection
    if (pool) {
      await pool.end();
      console.log('PostgreSQL connection closed');
    }
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
      const countryCities = cityData.filter(city => city.country === country.name);
      
      for (let i = 0; i < universitiesCount; i++) {
        // Choose a random city from this country
        const city = faker.random.arrayElement(countryCities);
        
        universities.push({
          name: `University of ${faker.address.city()}`,
          country: country.name,
          city: city.name,
          ranking: {
            global: faker.datatype.number({min: 1, max: 1000}),
            national: faker.datatype.number({min: 1, max: 100}),
            source: faker.random.arrayElement(['QS', 'THE', 'ARWU', 'US News']),
            year: 2023
          },
          tuitionFees: {
            international: {
              undergraduate: faker.datatype.number({min: 5000, max: 50000}),
              graduate: faker.datatype.number({min: 8000, max: 60000}),
              currency: 'USD'
            },
            domestic: {
              undergraduate: faker.datatype.number({min: 1000, max: 30000}),
              graduate: faker.datatype.number({min: 2000, max: 40000}),
              currency: 'USD'
            }
          },
          admissionRate: {
            undergraduate: faker.datatype.float({min: 0.05, max: 0.9, precision: 0.01}),
            graduate: faker.datatype.float({min: 0.1, max: 0.8, precision: 0.01})
          },
          programs: Array.from({length: faker.datatype.number({min: 5, max: 10})}, () => {
            const field = faker.random.arrayElement(fields);
            return {
              name: `${faker.random.arrayElement(['Bachelor of', 'Master of', 'PhD in'])} ${field}`,
              level: faker.random.arrayElement(['Bachelor', 'Master', 'PhD']),
              field: field,
              duration: faker.datatype.number({min: 1, max: 5}),
              language: faker.random.arrayElement(['English', country.languageData.official[0], 'English']),
              requirements: {
                gpa: faker.datatype.float({min: 2.5, max: 4.0, precision: 0.1}),
                languageScore: {
                  type: faker.random.arrayElement(['IELTS', 'TOEFL', 'Other', 'None']),
                  minimum: faker.datatype.number({min: 6, max: 9})
                }
              }
            };
          }),
          facilities: faker.random.arrayElements(
            ['Library', 'Sports', 'Labs', 'Housing', 'Medical', 'Cafeteria', 'Wifi'],
            faker.datatype.number({min: 3, max: 7})
          ),
          internationalStudents: {
            percentage: faker.datatype.number({min: 5, max: 40}),
            countriesCount: faker.datatype.number({min: 10, max: 100})
          },
          website: faker.internet.url(),
          contactEmail: faker.internet.email(),
          description: faker.lorem.paragraphs(3),
          strengths: faker.random.words(10).split(' '),
          weaknesses: faker.random.words(5).split(' '),
          employmentRate: faker.datatype.number({min: 70, max: 98}),
          averageSalary: {
            afterGraduation: faker.datatype.number({min: 30000, max: 80000}),
            currency: 'USD'
          },
          scholarshipsAvailable: faker.datatype.boolean(),
          applicationDeadlines: {
            fall: faker.date.future(),
            spring: faker.date.future(),
            summer: faker.date.future()
          }
        });
      }
    }
    
    await University.insertMany(universities);
    console.log(`Added ${universities.length} universities`);
    return universities;
  } catch (err) {
    console.error('Error seeding universities:', err);
    throw err;
  }
}

// Generate employment data
async function seedEmployment(countryData, cityData) {
  try {
    await Employment.deleteMany({});
    console.log('Deleted existing employment data');
    
    const employmentData = [];
    
    // For each country, generate employment data for each field
    for (const country of countryData) {
      // Get cities for this country
      const countryCities = cityData.filter(city => city.country === country.name);
      
      for (const field of fields) {
        // For each field, add country-level data
        employmentData.push({
          country: country.name,
          field: field,
          yearData: 2023,
          employmentRate: {
            overall: faker.datatype.number({min: 70, max: 98}),
            foreignGraduates: faker.datatype.number({min: 60, max: 95})
          },
          salaryData: {
            entryLevel: {
              amount: faker.datatype.number({min: 30000, max: 80000}),
              currency: 'USD'
            },
            midCareer: {
              amount: faker.datatype.number({min: 50000, max: 120000}),
              currency: 'USD'
            },
            senior: {
              amount: faker.datatype.number({min: 80000, max: 200000}),
              currency: 'USD'
            }
          },
          jobMarketDemand: faker.datatype.number({min: 50, max: 98}),
          growthRate: faker.datatype.float({min: -5, max: 20, precision: 0.1}),
          skillsInDemand: faker.random.words(5).split(' '),
          workVisa: {
            difficulty: faker.datatype.number({min: 20, max: 80}),
            durationAfterGraduation: faker.datatype.number({min: 6, max: 36}),
            pathToPermanentResidency: faker.datatype.boolean()
          },
          topEmployers: faker.company.companyName().split(' '),
          industrySize: {
            employees: faker.datatype.number({min: 10000, max: 1000000}),
            companies: faker.datatype.number({min: 100, max: 10000})
          }
        });
        
        // For some fields, also add city-level data
        if (faker.datatype.boolean()) {
          const citiesCount = faker.datatype.number({min: 1, max: 3});
          const selectedCities = faker.random.arrayElements(countryCities, citiesCount);
          
          for (const city of selectedCities) {
            employmentData.push({
              country: country.name,
              city: city.name,
              field: field,
              yearData: 2023,
              employmentRate: {
                overall: faker.datatype.number({min: 70, max: 98}),
                foreignGraduates: faker.datatype.number({min: 60, max: 95})
              },
              salaryData: {
                entryLevel: {
                  amount: faker.datatype.number({min: 30000, max: 80000}),
                  currency: 'USD'
                },
                midCareer: {
                  amount: faker.datatype.number({min: 50000, max: 120000}),
                  currency: 'USD'
                },
                senior: {
                  amount: faker.datatype.number({min: 80000, max: 200000}),
                  currency: 'USD'
                }
              },
              jobMarketDemand: faker.datatype.number({min: 50, max: 98}),
              growthRate: faker.datatype.float({min: -5, max: 20, precision: 0.1}),
              skillsInDemand: faker.random.words(5).split(' ')
            });
          }
        }
      }
    }
    
    await Employment.insertMany(employmentData);
    console.log(`Added ${employmentData.length} employment records`);
    return employmentData;
  } catch (err) {
    console.error('Error seeding employment data:', err);
    throw err;
  }
}

// Generate programs
async function seedPrograms(universities) {
  try {
    await Program.deleteMany({});
    console.log('Deleted existing program data');
    
    const programs = [];
    
    // For each university, generate programs
    for (const university of universities) {
      const programsCount = faker.datatype.number({min: 5, max: 15});
      
      for (let i = 0; i < programsCount; i++) {
        const field = faker.random.arrayElement(fields);
        const level = faker.random.arrayElement(['Bachelor', 'Master', 'PhD']);
        
        programs.push({
          name: `${level} of ${field}`,
          university: university._id,
          universityName: university.name,
          level: level,
          field: field,
          specialization: faker.random.words(2),
          description: faker.lorem.paragraph(),
          duration: {
            years: level === 'PhD' ? faker.datatype.number({min: 3, max: 5}) :
                   level === 'Master' ? faker.datatype.number({min: 1, max: 2}) :
                   faker.datatype.number({min: 3, max: 4}),
            semesters: faker.datatype.number({min: 2, max: 8})
          },
          credits: faker.datatype.number({min: 60, max: 240}),
          teachingLanguage: faker.random.arrayElement(['English', 'English', 'English', 'Local']),
          format: faker.random.arrayElement(['Full-time', 'Part-time', 'Online', 'Hybrid']),
          tuition: {
            amount: faker.datatype.number({min: 5000, max: 50000}),
            currency: 'USD',
            perYear: true,
            international: true
          },
          admissionRequirements: {
            gpa: faker.datatype.float({min: 2.5, max: 4.0, precision: 0.1}),
            languageTests: [{
              type: faker.random.arrayElement(['IELTS', 'TOEFL']),
              minimumScore: level === 'PhD' ? '7.0' : level === 'Master' ? '6.5' : '6.0'
            }],
            documents: ['Transcripts', 'CV', 'Statement of Purpose', 'References']
          },
          applicationProcess: {
            deadlines: {
              fall: faker.date.future(),
              spring: faker.date.future()
            },
            applicationFee: {
              amount: faker.datatype.number({min: 50, max: 200}),
              currency: 'USD'
            },
            acceptanceRate: faker.datatype.number({min: 5, max: 90})
          },
          curriculum: faker.random.words(10).split(' '),
          opportunities: {
            internships: faker.datatype.boolean(),
            studyAbroad: faker.datatype.boolean(),
            researchProjects: faker.datatype.boolean(),
            industryPartnerships: faker.company.companyName().split(' ')
          },
          careerOutcomes: {
            jobTitles: faker.random.words(5).split(' '),
            employmentRate: faker.datatype.number({min: 70, max: 98}),
            averageStartingSalary: {
              amount: faker.datatype.number({min: 30000, max: 80000}),
              currency: 'USD'
            }
          },
          studentSatisfaction: faker.datatype.number({min: 70, max: 95}),
          programUrl: faker.internet.url()
        });
      }
    }
    
    await Program.insertMany(programs);
    console.log(`Added ${programs.length} programs`);
    return programs;
  } catch (err) {
    console.error('Error seeding programs:', err);
    throw err;
  }
}

// Main seeding function
async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    const countryData = await seedCountries();
    const cityData = await seedCities(countryData);
    const universityData = await seedUniversities(countryData, cityData);
    const employmentData = await seedEmployment(countryData, cityData);
    const programData = await seedPrograms(universityData);
    
    console.log('Database seeding completed successfully!');
    console.log(`Total records added: ${countryData.length + cityData.length + universityData.length + employmentData.length + programData.length}`);
    
    process.exit(0);
  } catch (err) {
    console.error('Database seeding failed:', err);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
}

// Run the seeding function
seedDatabase();
