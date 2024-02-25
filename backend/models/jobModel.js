const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobLocation: {
    type: String,
    required: true
  },
  jobNumbers: {
    type: Number,
    required: true
  },
  jobDescription:{
    type:String,
    required:true
  },
  jobLevel:{
    type:String,
    enum:['Internship','Entry-Level','Associate',
    'Mid-Senior Level','Director','Executive','Not-Applicable'
    ]
  },
  jobType:{
    type:String,
    enum:['Full-Time','Part-Time','Contract',
    'Temporary','Volunteer','Internship']
  },
  experience: {
    minYears: {
      type: Number,
      required: true
    },
    maxYears: {
      type: Number,
      required: true
    }
  },
  skills: {
    primary: {
      type: String,
      required: true
    },
    primaryExperience: {
      type: Number,
      required: true
    },
    secondary: {
      type: String,
      required: true
    },
    secondaryExperience: {
      type: Number,
      required: true
    }
  },
  ctc: {
    minCTC: {
      type: Number,
      required: true
    },
    maxCTC: {
      type: Number,
      required: true
    }
  },
  worplaceType:{
      type:String,
      enum:['On-Site','Hybrid','Remote'],
      required:true
  },
  recruiterIncentive: {
    type: {
      type: String,
      enum: ['percent', 'fixed'],
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('Job', jobSchema);
