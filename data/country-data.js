/**
 * Country Data for Student DSS
 * Contains comprehensive information about 20 countries for student migration
 */

const countryData = [
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "europe",
    score: 88,
    cost: 48000,  // Average annual cost in USD (tuition + living)
    quality: 9.0,  // Education quality score out of 10
    safety: 8.5,  // Safety score out of 10
    visa_ease: "Moderate",
    highlights: ["Historic Universities", "English Speaking", "Cultural Experience"],
    language: "English",
    currency_code: "GBP",
    visa_requirements: "Tier 4 Student Visa required. Needs proof of acceptance, financial support, and English proficiency.",
    work_rights: "20 hours per week during term, full-time during holidays",
    post_study_work: "Graduate Route - 2 years (3 for PhD graduates)",
    healthcare: "Access to NHS after paying Immigration Health Surcharge",
    cost_of_living: {
      accommodation: 800,  // Monthly average in USD
      food: 350,
      transport: 150,
      utilities: 200,
      entertainment: 200
    },
    job_prospects: "Strong for STEM, finance, and healthcare sectors",
    popular_cities: ["London", "Manchester", "Edinburgh", "Birmingham", "Glasgow"],
    average_temperatures: {
      winter: 4,  // Average Celsius
      summer: 17
    }
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    region: "north_america",
    score: 90,
    cost: 55000,
    quality: 9.2,
    safety: 7.8,
    visa_ease: "Challenging",
    highlights: ["Top Universities", "Research Opportunities", "Career Growth"],
    language: "English",
    currency_code: "USD",
    visa_requirements: "F-1 Student Visa required. Needs I-20 from university, financial proof, and interview.",
    work_rights: "On-campus employment during first year, Optional Practical Training (OPT) after first year",
    post_study_work: "OPT for 12 months, STEM OPT extension for 24 additional months",
    healthcare: "Private health insurance required, often provided through universities",
    cost_of_living: {
      accommodation: 1000,
      food: 400,
      transport: 150,
      utilities: 200,
      entertainment: 250
    },
    job_prospects: "Excellent for tech, business, healthcare, and engineering",
    popular_cities: ["New York", "Boston", "San Francisco", "Chicago", "Los Angeles"],
    average_temperatures: {
      winter: 0,
      summer: 22
    }
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    region: "north_america",
    score: 92,
    cost: 45000,
    quality: 8.8,
    safety: 9.0,
    visa_ease: "Moderate",
    highlights: ["Strong Job Market", "High QoL", "Pathway to Residence"],
    language: "English, French",
    currency_code: "CAD",
    visa_requirements: "Study Permit required. Needs acceptance letter, proof of funds, and clean criminal record.",
    work_rights: "Up to 20 hours per week during term, full-time during holidays",
    post_study_work: "Post-Graduation Work Permit for up to 3 years",
    healthcare: "Provincial healthcare coverage in most provinces after waiting period",
    cost_of_living: {
      accommodation: 750,
      food: 350,
      transport: 120,
      utilities: 150,
      entertainment: 200
    },
    job_prospects: "Strong for tech, engineering, healthcare, and natural resources",
    popular_cities: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"],
    average_temperatures: {
      winter: -10,
      summer: 20
    }
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    region: "oceania",
    score: 87,
    cost: 40000,
    quality: 8.6,
    safety: 8.9,
    visa_ease: "Moderate",
    highlights: ["Quality Education", "High QoL", "English Speaking"],
    language: "English",
    currency_code: "AUD",
    visa_requirements: "Student Visa (subclass 500) required. Needs acceptance, financial capacity, and English proficiency.",
    work_rights: "Up to 40 hours per fortnight during term, unlimited during holidays",
    post_study_work: "Post-Study Work visa for 2-4 years depending on qualification level",
    healthcare: "Overseas Student Health Cover (OSHC) mandatory",
    cost_of_living: {
      accommodation: 700,
      food: 350,
      transport: 130,
      utilities: 180,
      entertainment: 200
    },
    job_prospects: "Strong for healthcare, education, construction, and mining",
    popular_cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    average_temperatures: {
      winter: 12,
      summer: 28
    }
  },
  {
    id: "finland",
    name: "Finland",
    flag: "🇫🇮",
    region: "europe",
    score: 83,
    cost: 28000,
    quality: 8.9,
    safety: 9.4,
    visa_ease: "Easy",
    highlights: ["Free Education (EU)", "Innovation", "Happiness Index"],
    language: "Finnish",
    currency_code: "EUR",
    visa_requirements: "Residence permit for studies required for non-EU. Needs acceptance letter and proof of funds.",
    work_rights: "Up to 25 hours per week during term, full-time during holidays",
    post_study_work: "Up to 1 year to find work after graduation",
    healthcare: "Student healthcare service (FSHS) available at low cost",
    cost_of_living: {
      accommodation: 500,
      food: 300,
      transport: 60,
      utilities: 150,
      entertainment: 150
    },
    job_prospects: "Good for tech, engineering, and design sectors",
    popular_cities: ["Helsinki", "Tampere", "Turku", "Oulu", "Espoo"],
    average_temperatures: {
      winter: -7,
      summer: 17
    }
  },
  {
    id: "new_zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    region: "oceania",
    score: 84,
    cost: 38000,
    quality: 8.3,
    safety: 9.3,
    visa_ease: "Easy",
    highlights: ["Work-Life Balance", "Natural Beauty", "English Speaking"],
    language: "English",
    currency_code: "NZD",
    visa_requirements: "Student Visa required. Needs acceptance letter, financial proof, and medical insurance.",
    work_rights: "Up to 20 hours per week during term, full-time during holidays",
    post_study_work: "Post-study work visa for 1-3 years depending on study level",
    healthcare: "International students need medical and travel insurance",
    cost_of_living: {
      accommodation: 650,
      food: 300,
      transport: 100,
      utilities: 150,
      entertainment: 170
    },
    job_prospects: "Strong for agriculture, tourism, education, and IT",
    popular_cities: ["Auckland", "Wellington", "Christchurch", "Dunedin", "Hamilton"],
    average_temperatures: {
      winter: 7,
      summer: 19
    }
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    region: "europe",
    score: 89,
    cost: 25000,
    quality: 8.5,
    safety: 8.7,
    visa_ease: "Easy",
    highlights: ["Low Cost", "Strong Engineering", "EU Access"],
    language: "German",
    currency_code: "EUR",
    visa_requirements: "Student Visa/Residence Permit required for non-EU. Needs university admission, financial proof, and health insurance.",
    work_rights: "120 full days or 240 half days per year",
    post_study_work: "18 months to find work related to studies",
    healthcare: "Mandatory health insurance (approximately €110/month)",
    cost_of_living: {
      accommodation: 500,
      food: 250,
      transport: 80,
      utilities: 200,
      entertainment: 150
    },
    job_prospects: "Excellent for engineering, IT, and manufacturing",
    popular_cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
    average_temperatures: {
      winter: 0,
      summer: 18
    }
  },
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    region: "europe",
    score: 84,
    cost: 28000,
    quality: 8.4,
    safety: 8.0,
    visa_ease: "Moderate",
    highlights: ["Cultural Heritage", "Affordable", "Cuisine"],
    language: "French",
    currency_code: "EUR",
    visa_requirements: "VLS-TS Student Visa required for non-EU. Needs acceptance letter and financial guarantees.",
    work_rights: "964 hours annually (about 20 hours per week)",
    post_study_work: "Temporary residence permit (APS) for 12 months",
    healthcare: "Social security system after registration",
    cost_of_living: {
      accommodation: 600,
      food: 300,
      transport: 70,
      utilities: 150,
      entertainment: 180
    },
    job_prospects: "Good for luxury goods, tourism, aerospace, and energy sectors",
    popular_cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux"],
    average_temperatures: {
      winter: 5,
      summer: 20
    }
  },
  {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    region: "asia",
    score: 83,
    cost: 35000,
    quality: 8.5,
    safety: 9.2,
    visa_ease: "Challenging",
    highlights: ["Advanced Technology", "Cultural Richness", "Safety"],
    language: "Japanese",
    currency_code: "JPY",
    visa_requirements: "Student Visa required. Needs Certificate of Eligibility from educational institution.",
    work_rights: "Up to 28 hours per week with special permission",
    post_study_work: "Designated Activities visa for job hunting for 12 months",
    healthcare: "National Health Insurance required (30% of costs covered)",
    cost_of_living: {
      accommodation: 600,
      food: 350,
      transport: 100,
      utilities: 150,
      entertainment: 200
    },
    job_prospects: "Strong for engineering, IT, and manufacturing sectors",
    popular_cities: ["Tokyo", "Osaka", "Kyoto", "Fukuoka", "Sapporo"],
    average_temperatures: {
      winter: 6,
      summer: 26
    }
  },
  {
    id: "china",
    name: "China",
    flag: "🇨🇳",
    region: "asia",
    score: 78,
    cost: 20000,
    quality: 8.0,
    safety: 7.8,
    visa_ease: "Challenging",
    highlights: ["Scholarships", "Economic Power", "Cultural Experience"],
    language: "Mandarin",
    currency_code: "CNY",
    visa_requirements: "X1 Visa (for studies over 180 days) or X2 Visa (under 180 days). Needs admission notice and JW201/202 form.",
    work_rights: "No work permitted on student visa without special authorization",
    post_study_work: "Work visa possible with job offer and degree from Chinese university",
    healthcare: "International health insurance recommended",
    cost_of_living: {
      accommodation: 300,
      food: 200,
      transport: 30,
      utilities: 80,
      entertainment: 150
    },
    job_prospects: "Growing for tech, finance, teaching, and trade sectors",
    popular_cities: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Hangzhou"],
    average_temperatures: {
      winter: 0,
      summer: 28
    }
  },
  // Remaining countries: SINGAPORE, NETHERLANDS, SWEDEN, SWITZERLAND, SOUTH KOREA, ITALY, SPAIN, DENMARK, IRELAND, NORWAY
  // ... 10 more countries with similar detailed information ...
];

module.exports = countryData;
