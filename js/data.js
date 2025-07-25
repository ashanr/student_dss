/**
 * Mock data for Student DSS application
 * Contains information about countries, cities, and universities
 */

const countriesData = {
    // Country data
    "canada": {
        name: "Canada",
        flag: "🇨🇦",
        region: "North America",
        currency: "CAD",
        language: "English, French",
        averageTuition: 25000,
        averageLiving: 12000,
        visaSuccess: 85,
        cities: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"]
    },
    "germany": {
        name: "Germany",
        flag: "🇩🇪",
        region: "Europe",
        currency: "EUR",
        language: "German",
        averageTuition: 1000, // Many universities are tuition-free
        averageLiving: 10000,
        visaSuccess: 78,
        cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Stuttgart"]
    },
    "australia": {
        name: "Australia",
        flag: "🇦🇺",
        region: "Asia Pacific",
        currency: "AUD",
        language: "English",
        averageTuition: 30000,
        averageLiving: 15000,
        visaSuccess: 80,
        cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"]
    },
    "uk": {
        name: "United Kingdom",
        flag: "🇬🇧",
        region: "Europe",
        currency: "GBP",
        language: "English",
        averageTuition: 20000,
        averageLiving: 14000,
        visaSuccess: 82,
        cities: ["London", "Manchester", "Edinburgh", "Birmingham", "Glasgow"]
    },
    "usa": {
        name: "United States",
        flag: "🇺🇸",
        region: "North America",
        currency: "USD",
        language: "English",
        averageTuition: 35000,
        averageLiving: 15000,
        visaSuccess: 75,
        cities: ["New York", "Boston", "Chicago", "Los Angeles", "San Francisco"]
    }
};

const universitiesData = [
    // Canada
    {
        id: "uoft",
        name: "University of Toronto",
        country: "canada",
        city: "Toronto",
        ranking: 18,
        tuition: 45000,
        living: 20000,
        programs: ["Computer Science", "Engineering", "Business", "Medicine"],
        admissionRate: 43,
        internationalStudents: 25,
        website: "https://www.utoronto.ca",
        strengths: ["Research", "STEM", "Business"]
    },
    {
        id: "ubc",
        name: "University of British Columbia",
        country: "canada",
        city: "Vancouver",
        ranking: 34,
        tuition: 38000,
        living: 18000,
        programs: ["Computer Science", "Engineering", "Arts", "Environmental Studies"],
        admissionRate: 52,
        internationalStudents: 28,
        website: "https://www.ubc.ca",
        strengths: ["Sustainability", "Arts", "Sciences"]
    },
    {
        id: "mcgill",
        name: "McGill University",
        country: "canada",
        city: "Montreal",
        ranking: 31,
        tuition: 40000,
        living: 15000,
        programs: ["Medicine", "Law", "Engineering", "Business"],
        admissionRate: 46,
        internationalStudents: 30,
        website: "https://www.mcgill.ca",
        strengths: ["Medicine", "Law", "Research"]
    },
    
    // Germany
    {
        id: "tuberlin",
        name: "Technical University of Berlin",
        country: "germany",
        city: "Berlin",
        ranking: 148,
        tuition: 300, // Mostly administrative fees
        living: 10500,
        programs: ["Engineering", "Computer Science", "Architecture", "Mathematics"],
        admissionRate: 65,
        internationalStudents: 26,
        website: "https://www.tu.berlin",
        strengths: ["Engineering", "Technical Sciences", "Innovation"]
    },
    {
        id: "lmu",
        name: "Ludwig Maximilian University of Munich",
        country: "germany",
        city: "Munich",
        ranking: 64,
        tuition: 300,
        living: 12000,
        programs: ["Medicine", "Law", "Physics", "Business Administration"],
        admissionRate: 60,
        internationalStudents: 15,
        website: "https://www.lmu.de",
        strengths: ["Research", "Medicine", "Natural Sciences"]
    },
    
    // Australia
    {
        id: "unimelb",
        name: "University of Melbourne",
        country: "australia",
        city: "Melbourne",
        ranking: 37,
        tuition: 38000,
        living: 20000,
        programs: ["Business", "Law", "Medicine", "Engineering"],
        admissionRate: 70,
        internationalStudents: 40,
        website: "https://www.unimelb.edu.au",
        strengths: ["Research", "Business", "Arts"]
    },
    {
        id: "unsw",
        name: "University of New South Wales",
        country: "australia",
        city: "Sydney",
        ranking: 43,
        tuition: 40000,
        living: 22000,
        programs: ["Engineering", "Business", "Medicine", "Arts"],
        admissionRate: 65,
        internationalStudents: 33,
        website: "https://www.unsw.edu.au",
        strengths: ["Engineering", "Research", "Innovation"]
    },
    
    // UK
    {
        id: "oxford",
        name: "University of Oxford",
        country: "uk",
        city: "Oxford",
        ranking: 2,
        tuition: 45000,
        living: 18000,
        programs: ["Humanities", "Sciences", "Medicine", "Business"],
        admissionRate: 17,
        internationalStudents: 45,
        website: "https://www.ox.ac.uk",
        strengths: ["Research", "Humanities", "Sciences"]
    },
    {
        id: "imperial",
        name: "Imperial College London",
        country: "uk",
        city: "London",
        ranking: 7,
        tuition: 42000,
        living: 20000,
        programs: ["Engineering", "Medicine", "Science", "Business"],
        admissionRate: 14,
        internationalStudents: 60,
        website: "https://www.imperial.ac.uk",
        strengths: ["Engineering", "Medicine", "Sciences"]
    },
    
    // USA
    {
        id: "mit",
        name: "Massachusetts Institute of Technology",
        country: "usa",
        city: "Boston",
        ranking: 1,
        tuition: 55000,
        living: 18000,
        programs: ["Engineering", "Computer Science", "Business", "Sciences"],
        admissionRate: 7,
        internationalStudents: 30,
        website: "https://www.mit.edu",
        strengths: ["Engineering", "Technology", "Innovation"]
    },
    {
        id: "stanford",
        name: "Stanford University",
        country: "usa",
        city: "San Francisco",
        ranking: 3,
        tuition: 56000,
        living: 19000,
        programs: ["Computer Science", "Business", "Engineering", "Humanities"],
        admissionRate: 5,
        internationalStudents: 23,
        website: "https://www.stanford.edu",
        strengths: ["Entrepreneurship", "Computer Science", "Business"]
    }
];

// Helper functions to work with data
function getUniversitiesByCountry(countryId) {
    return universitiesData.filter(uni => uni.country === countryId);
}

function getUniversitiesByCity(cityName) {
    return universitiesData.filter(uni => uni.city === cityName);
}

function getUniversityById(id) {
    return universitiesData.find(uni => uni.id === id);
}

function filterUniversitiesByProgram(program) {
    return universitiesData.filter(uni => uni.programs.includes(program));
}

function filterUniversitiesByBudget(maxBudget) {
    return universitiesData.filter(uni => (uni.tuition + uni.living) <= maxBudget);
}
