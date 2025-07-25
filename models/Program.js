const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: true,
    index: true
  },
  universityName: String, // denormalized for performance
  level: {
    type: String,
    enum: ['bachelor', 'master', 'phd', 'diploma'],
    required: true,
    index: true
  },
  field: {
    type: String,
    required: true,
    index: true
  },
  specialization: String,
  description: String,
  duration: {
    years: Number,
    months: Number
  },
  credits: Number,
  teachingLanguage: {
    type: String,
    default: 'English'
  },
  format: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Online', 'Hybrid'],
    default: 'Full-time'
  },
  tuition: {
    domestic: Number,
    international: Number,
    currency: String
  },
  admissionRequirements: {
    gpa: Number,
    languageTest: {
      type: String,
      score: Number
    },
    documents: [String],
    prerequisites: [String]
  },
  applicationProcess: {
    deadlines: {
      fall: Date,
      spring: Date,
      summer: Date
    },
    applicationFee: {
      amount: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    selectionCriteria: [String],
    acceptanceRate: Number // percentage
  },
  curriculum: [String], // key subjects
  opportunities: {
    internships: Boolean,
    studyAbroad: Boolean,
    researchProjects: Boolean,
    industryPartnerships: [String]
  },
  careerOutcomes: {
    jobTitles: [String],
    employmentRate: Number, // percentage
    averageStartingSalary: {
      amount: Number,
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
