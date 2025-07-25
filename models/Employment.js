const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employmentSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  jobMarketScore: {
    type: Number,
    min: 1,
    max: 10
  },
  salaryRange: {
    min: Number,
    max: Number,
    currency: String
  },
  employmentRate: {
    type: Number,
    min: 0,
    max: 1
  },
  workPermit: Boolean,
  postStudyOptions: String,
  demandedSkills: [String],
  industries: [String],
  growthRate: Number, // Annual growth rate as percentage
  visaSponsorship: Boolean,
  internshipOpportunities: String
}, { timestamps: true });

module.exports = mongoose.model('Employment', employmentSchema);
        type: String,
        default: 'USD'
      }
    },
    senior: {
      amount: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    }
  },
  jobMarketDemand: Number, // 0-100 scale
  growthRate: Number, // percentage
  skillsInDemand: [String],
  workVisa: {
    difficulty: Number, // 0-100 scale (lower is easier)
    durationAfterGraduation: Number, // in months
    pathToPermanentResidency: Boolean
  },
  topEmployers: [String],
  industrySize: {
    employees: Number,
    companies: Number
  },
  remoteWorkOpportunities: Number, // 0-100 scale
  contractTypes: {
    permanent: Number, // percentage
    contract: Number, // percentage
    internship: Number // percentage
  },
  sourceUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Employment', employmentSchema);
